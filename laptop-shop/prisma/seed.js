import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const existing = await prisma.laptop.count()
  if (existing > 0) {
    console.log(`[seed] Skipped: ${existing} laptops already present`)
    return
  }
  const laptops = [
    { title: 'Apple MacBook Air 13 M1 (2020)', brand: 'Apple', price: 799, ramGB: 8, storageGB: 256, storageType: 'SSD', cpu: 'Apple M1', gpu: 'Integrated', condition: 'Used - Like New', image: 'https://via.placeholder.com/640x480?text=MacBook+Air+M1' },
    { title: 'Apple MacBook Pro 14 M2 (2023)', brand: 'Apple', price: 1699, ramGB: 16, storageGB: 512, storageType: 'SSD', cpu: 'Apple M2 Pro', gpu: 'Integrated', condition: 'New', image: 'https://via.placeholder.com/640x480?text=MBP+14+M2' },
    { title: 'Dell XPS 13 9310', brand: 'Dell', price: 899, ramGB: 16, storageGB: 512, storageType: 'SSD', cpu: 'Intel Core i7-1165G7', gpu: 'Intel Iris Xe', condition: 'Used - Good', image: 'https://via.placeholder.com/640x480?text=XPS+13' },
    { title: 'Dell G15 Gaming', brand: 'Dell', price: 1099, ramGB: 16, storageGB: 1000, storageType: 'SSD', cpu: 'Intel Core i7-12700H', gpu: 'NVIDIA RTX 3060', condition: 'New', image: 'https://via.placeholder.com/640x480?text=Dell+G15' },
    { title: 'HP Spectre x360 14', brand: 'HP', price: 1199, ramGB: 16, storageGB: 512, storageType: 'SSD', cpu: 'Intel Core i7-1255U', gpu: 'Intel Iris Xe', condition: 'New', image: 'https://via.placeholder.com/640x480?text=Spectre+x360' },
    { title: 'HP Omen 16', brand: 'HP', price: 1299, ramGB: 16, storageGB: 1000, storageType: 'SSD', cpu: 'AMD Ryzen 7 6800H', gpu: 'NVIDIA RTX 3070', condition: 'Used - Like New', image: 'https://via.placeholder.com/640x480?text=Omen+16' },
    { title: 'Lenovo ThinkPad X1 Carbon Gen 9', brand: 'Lenovo', price: 1099, ramGB: 16, storageGB: 512, storageType: 'SSD', cpu: 'Intel Core i7-1165G7', gpu: 'Intel Iris Xe', condition: 'Used - Very Good', image: 'https://via.placeholder.com/640x480?text=X1+Carbon' },
    { title: 'Lenovo Legion 5 Pro', brand: 'Lenovo', price: 1399, ramGB: 32, storageGB: 1000, storageType: 'SSD', cpu: 'AMD Ryzen 7 6800H', gpu: 'NVIDIA RTX 3070 Ti', condition: 'New', image: 'https://via.placeholder.com/640x480?text=Legion+5+Pro' },
    { title: 'ASUS ROG Zephyrus G14', brand: 'ASUS', price: 1499, ramGB: 16, storageGB: 1000, storageType: 'SSD', cpu: 'AMD Ryzen 9 5900HS', gpu: 'NVIDIA RTX 3060', condition: 'New', image: 'https://via.placeholder.com/640x480?text=G14' },
    { title: 'ASUS ZenBook 14 OLED', brand: 'ASUS', price: 999, ramGB: 16, storageGB: 512, storageType: 'SSD', cpu: 'Intel Core i7-1260P', gpu: 'Intel Iris Xe', condition: 'New', image: 'https://via.placeholder.com/640x480?text=ZenBook+OLED' },
    { title: 'Acer Swift 3', brand: 'Acer', price: 649, ramGB: 8, storageGB: 512, storageType: 'SSD', cpu: 'AMD Ryzen 5 5500U', gpu: 'Integrated', condition: 'Used - Good', image: 'https://via.placeholder.com/640x480?text=Swift+3' },
    { title: 'Acer Predator Helios 300', brand: 'Acer', price: 1199, ramGB: 16, storageGB: 1000, storageType: 'SSD', cpu: 'Intel Core i7-11800H', gpu: 'NVIDIA RTX 3060', condition: 'Used - Like New', image: 'https://via.placeholder.com/640x480?text=Helios+300' },
    { title: 'MSI GS66 Stealth', brand: 'MSI', price: 1599, ramGB: 32, storageGB: 1000, storageType: 'SSD', cpu: 'Intel Core i7-10870H', gpu: 'NVIDIA RTX 3070', condition: 'Used - Very Good', image: 'https://via.placeholder.com/640x480?text=GS66' },
    { title: 'MSI Prestige 14', brand: 'MSI', price: 999, ramGB: 16, storageGB: 512, storageType: 'SSD', cpu: 'Intel Core i7-1185G7', gpu: 'Intel Iris Xe', condition: 'New', image: 'https://via.placeholder.com/640x480?text=Prestige+14' },
    { title: 'Razer Blade 15', brand: 'Razer', price: 2299, ramGB: 32, storageGB: 1000, storageType: 'SSD', cpu: 'Intel Core i7-12800H', gpu: 'NVIDIA RTX 3080 Ti', condition: 'New', image: 'https://via.placeholder.com/640x480?text=Blade+15' },
    { title: 'Razer Blade 14', brand: 'Razer', price: 1999, ramGB: 16, storageGB: 1000, storageType: 'SSD', cpu: 'AMD Ryzen 9 6900HX', gpu: 'NVIDIA RTX 3070 Ti', condition: 'Used - Like New', image: 'https://via.placeholder.com/640x480?text=Blade+14' },
    { title: 'Microsoft Surface Laptop 5', brand: 'Microsoft', price: 1299, ramGB: 16, storageGB: 512, storageType: 'SSD', cpu: 'Intel Core i7-1255U', gpu: 'Intel Iris Xe', condition: 'New', image: 'https://via.placeholder.com/640x480?text=Surface+Laptop+5' },
    { title: 'Microsoft Surface Book 3', brand: 'Microsoft', price: 1499, ramGB: 32, storageGB: 1000, storageType: 'SSD', cpu: 'Intel Core i7-1065G7', gpu: 'NVIDIA GTX 1660 Ti', condition: 'Used - Good', image: 'https://via.placeholder.com/640x480?text=Surface+Book+3' },
    { title: 'Gigabyte Aero 16', brand: 'Gigabyte', price: 1699, ramGB: 16, storageGB: 1000, storageType: 'SSD', cpu: 'Intel Core i7-12700H', gpu: 'NVIDIA RTX 3070 Ti', condition: 'New', image: 'https://via.placeholder.com/640x480?text=Aero+16' },
    { title: 'Huawei MateBook X Pro', brand: 'Huawei', price: 1299, ramGB: 16, storageGB: 512, storageType: 'SSD', cpu: 'Intel Core i7-1260P', gpu: 'Intel Iris Xe', condition: 'New', image: 'https://via.placeholder.com/640x480?text=MateBook+X+Pro' },
    { title: 'Samsung Galaxy Book2 Pro', brand: 'Samsung', price: 1199, ramGB: 16, storageGB: 512, storageType: 'SSD', cpu: 'Intel Core i7-1260P', gpu: 'Intel Iris Xe', condition: 'New', image: 'https://via.placeholder.com/640x480?text=Galaxy+Book2+Pro' },
    { title: 'Apple MacBook Air 15 M2 (2023)', brand: 'Apple', price: 1299, ramGB: 8, storageGB: 256, storageType: 'SSD', cpu: 'Apple M2', gpu: 'Integrated', condition: 'New', image: 'https://via.placeholder.com/640x480?text=MacBook+Air+15' },
    { title: 'Lenovo IdeaPad 3', brand: 'Lenovo', price: 449, ramGB: 8, storageGB: 256, storageType: 'SSD', cpu: 'Intel Core i3-1115G4', gpu: 'Integrated', condition: 'Used - Fair', image: 'https://via.placeholder.com/640x480?text=IdeaPad+3' },
    { title: 'HP Pavilion 15', brand: 'HP', price: 599, ramGB: 12, storageGB: 512, storageType: 'SSD', cpu: 'Intel Core i5-1240P', gpu: 'Intel Iris Xe', condition: 'Used - Good', image: 'https://via.placeholder.com/640x480?text=Pavilion+15' },
    { title: 'ASUS TUF Gaming F15', brand: 'ASUS', price: 899, ramGB: 16, storageGB: 512, storageType: 'SSD', cpu: 'Intel Core i5-11400H', gpu: 'NVIDIA RTX 3050 Ti', condition: 'Used - Like New', image: 'https://via.placeholder.com/640x480?text=TUF+F15' }
  ]

  for (const l of laptops) {
    await prisma.laptop.create({ data: l })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

