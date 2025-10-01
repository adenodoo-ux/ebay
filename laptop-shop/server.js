import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT || 5174

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

// Utilities
const toInt = (v, fallback = null) => {
  if (v === undefined || v === null || v === '') return fallback
  const n = Number(v)
  return Number.isFinite(n) ? n : fallback
}

// GET /api/filters - return distinct filter options
app.get('/api/filters', async (req, res) => {
  const [brands, rams, storages, cpus, gpus] = await Promise.all([
    prisma.laptop.findMany({ distinct: ['brand'], select: { brand: true }, orderBy: { brand: 'asc' } }),
    prisma.laptop.findMany({ distinct: ['ramGB'], select: { ramGB: true }, orderBy: { ramGB: 'asc' } }),
    prisma.laptop.findMany({ distinct: ['storageGB'], select: { storageGB: true }, orderBy: { storageGB: 'asc' } }),
    prisma.laptop.findMany({ distinct: ['cpu'], select: { cpu: true }, orderBy: { cpu: 'asc' } }),
    prisma.laptop.findMany({ distinct: ['gpu'], select: { gpu: true }, orderBy: { gpu: 'asc' } })
  ])

  res.json({
    brands: brands.map(b => b.brand),
    rams: rams.map(r => r.ramGB),
    storages: storages.map(s => s.storageGB),
    cpus: cpus.map(c => c.cpu),
    gpus: gpus.map(g => g.gpu)
  })
})

// GET /api/laptops - list with filters/sort/search/pagination
app.get('/api/laptops', async (req, res) => {
  const {
    q = '',
    sort = 'best',
    page = '1',
    pageSize = '12',
    brand,
    ram,
    storage,
    cpu,
    gpu,
    priceMin,
    priceMax
  } = req.query

  const pageNum = Math.max(1, toInt(page, 1))
  const sizeNum = Math.min(60, Math.max(1, toInt(pageSize, 12)))

  // parse lists
  const list = (val) => !val ? [] : String(val).split(',').filter(Boolean)
  const brands = list(brand)
  const rams = list(ram).map(Number).filter(Number.isFinite)
  const storages = list(storage).map(Number).filter(Number.isFinite)
  const cpus = list(cpu)
  const gpus = list(gpu)

  const where = {
    AND: [
      brands.length ? { brand: { in: brands } } : {},
      rams.length ? { ramGB: { in: rams } } : {},
      storages.length ? { storageGB: { in: storages } } : {},
      cpus.length ? { cpu: { in: cpus } } : {},
      gpus.length ? { gpu: { in: gpus } } : {},
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
        // fallback to price asc for deterministic order
        return { price: 'asc' }
    }
  })()

  const [total, items] = await Promise.all([
    prisma.laptop.count({ where }),
    prisma.laptop.findMany({
      where,
      orderBy,
      skip: (pageNum - 1) * sizeNum,
      take: sizeNum
    })
  ])

  res.json({ total, page: pageNum, pageSize: sizeNum, items })
})

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`)
})

