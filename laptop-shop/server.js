import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT || 5174
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(cors())
app.use(express.json())
// Serve frontend static assets from project root (where index.html and assets/ reside)
app.use(express.static(__dirname))

// Utilities
const toInt = (v, fallback = null) => {
  if (v === undefined || v === null || v === '') return fallback
  const n = Number(v)
  return Number.isFinite(n) ? n : fallback
}

// Parse query into structured filters and Prisma where/orderBy
function parseFilters(qs) {
  const {
    q = '',
    sort = 'best',
    brand,
    ram,
    storage,
    cpu,
    gpu,
    condition,
    priceMin,
    priceMax
  } = qs

  const list = (val) => !val ? [] : String(val).split(',').filter(Boolean)
  const brands = list(brand)
  const rams = list(ram).map(Number).filter(Number.isFinite)
  const storages = list(storage).map(Number).filter(Number.isFinite)
  const cpus = list(cpu)
  const gpus = list(gpu)
  const conditions = list(condition)

  const where = {
    AND: [
      brands.length ? { brand: { in: brands } } : {},
      rams.length ? { ramGB: { in: rams } } : {},
      storages.length ? { storageGB: { in: storages } } : {},
      cpus.length ? { cpu: { in: cpus } } : {},
      gpus.length ? { gpu: { in: gpus } } : {},
      conditions.length ? { condition: { in: conditions } } : {},
      toInt(priceMin) != null ? { price: { gte: toInt(priceMin) } } : {},
      toInt(priceMax) != null ? { price: { lte: toInt(priceMax) } } : {},
      q ? {
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { brand: { contains: q, mode: 'insensitive' } },
          { cpu: { contains: q, mode: 'insensitive' } },
          { gpu: { contains: q, mode: 'insensitive' } }
        ]
      } : {}
    ]
  }

  const orderBy = (() => {
    switch (sort) {
      case 'price-asc': return { price: 'asc' }
      case 'price-desc': return { price: 'desc' }
      case 'ram-desc': return { ramGB: 'desc' }
      case 'storage-desc': return { storageGB: 'desc' }
      case 'newest': return { id: 'desc' }
      case 'best':
      default:
        return { price: 'asc' }
    }
  })()

  return { where, orderBy, selections: { brands, rams, storages, cpus, gpus, conditions }, q }
}

// GET /api/filters - return distinct filter options
app.get('/api/filters', async (req, res) => {
  const [brands, rams, storages, cpus, gpus, conditions] = await Promise.all([
    prisma.laptop.findMany({ distinct: ['brand'], select: { brand: true }, orderBy: { brand: 'asc' } }),
    prisma.laptop.findMany({ distinct: ['ramGB'], select: { ramGB: true }, orderBy: { ramGB: 'asc' } }),
    prisma.laptop.findMany({ distinct: ['storageGB'], select: { storageGB: true }, orderBy: { storageGB: 'asc' } }),
    prisma.laptop.findMany({ distinct: ['cpu'], select: { cpu: true }, orderBy: { cpu: 'asc' } }),
    prisma.laptop.findMany({ distinct: ['gpu'], select: { gpu: true }, orderBy: { gpu: 'asc' } }),
    prisma.laptop.findMany({ distinct: ['condition'], select: { condition: true }, orderBy: { condition: 'asc' } })
  ])

  res.json({
    brands: brands.map(b => b.brand),
    rams: rams.map(r => r.ramGB),
    storages: storages.map(s => s.storageGB),
    cpus: cpus.map(c => c.cpu),
    gpus: gpus.map(g => g.gpu),
    conditions: conditions.map(c => c.condition)
  })
})

// Facets with counts under current selection context (excluding the facet itself)
app.get('/api/facets', async (req, res) => {
  const parsed = parseFilters(req.query)
  const baseWhere = parsed.where
  // helpers to clone AND array excluding a predicate for a field
  const without = (field) => ({ AND: (baseWhere.AND || []).filter(p => !(p && (p[field] || (p[field === 'ramGB' ? 'ramGB' : field])))) })

  const [brandCounts, ramCounts, storageCounts, cpuCounts, gpuCounts, conditionCounts] = await Promise.all([
    prisma.laptop.groupBy({ by: ['brand'], _count: { _all: true }, where: without('brand') }),
    prisma.laptop.groupBy({ by: ['ramGB'], _count: { _all: true }, where: without('ramGB') }),
    prisma.laptop.groupBy({ by: ['storageGB'], _count: { _all: true }, where: without('storageGB') }),
    prisma.laptop.groupBy({ by: ['cpu'], _count: { _all: true }, where: without('cpu') }),
    prisma.laptop.groupBy({ by: ['gpu'], _count: { _all: true }, where: without('gpu') }),
    prisma.laptop.groupBy({ by: ['condition'], _count: { _all: true }, where: without('condition') })
  ])

  res.json({
    brand: Object.fromEntries(brandCounts.map(r => [r.brand, r._count._all])),
    ramGB: Object.fromEntries(ramCounts.map(r => [String(r.ramGB), r._count._all])),
    storageGB: Object.fromEntries(storageCounts.map(r => [String(r.storageGB), r._count._all])),
    cpu: Object.fromEntries(cpuCounts.map(r => [r.cpu, r._count._all])),
    gpu: Object.fromEntries(gpuCounts.map(r => [r.gpu, r._count._all])),
    condition: Object.fromEntries(conditionCounts.map(r => [r.condition, r._count._all]))
  })
})

// GET /api/laptops - list with filters/sort/search/pagination
app.get('/api/laptops', async (req, res) => {
  const { where, orderBy } = parseFilters(req.query)
  const pageNum = Math.max(1, toInt(req.query.page, 1))
  const sizeNum = Math.min(60, Math.max(1, toInt(req.query.pageSize, 12)))

  const [total, items] = await Promise.all([
    prisma.laptop.count({ where }),
    prisma.laptop.findMany({ where, orderBy, skip: (pageNum - 1) * sizeNum, take: sizeNum })
  ])

  res.json({ total, page: pageNum, pageSize: sizeNum, items })
})

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`)
})


