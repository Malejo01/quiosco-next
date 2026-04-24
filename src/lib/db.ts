import { neon } from "@neondatabase/serverless"

// Database connection using Neon serverless driver
const sql = neon(process.env.DATABASE_URL!)

// Types
export type Category = {
  id: number
  name: string
  slug: string
}

export type Product = {
  id: number
  name: string
  price: number
  image: string
  categoryId: number
  category?: Category
}

export type Order = {
  id: number
  name: string
  total: number
  status: boolean
  orderReadyAt: Date | null
  date: Date
}

export type OrderProduct = {
  id: number
  orderId: number
  productId: number
  quantity: number
  product?: Product
}

export type OrderWithProducts = Order & {
  orderProducts: (OrderProduct & { product: Product })[]
}

// Category queries
export async function getCategories(): Promise<Category[]> {
  const categories = await sql`SELECT * FROM "Category" ORDER BY id`
  return categories as Category[]
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await sql`SELECT * FROM "Category" WHERE slug = ${slug} LIMIT 1`
  return (categories[0] as Category) || null
}

// Product queries
export async function getProducts(): Promise<Product[]> {
  const products = await sql`SELECT * FROM "Product"`
  return products as Product[]
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const products = await sql`
    SELECT p.* FROM "Product" p
    JOIN "Category" c ON p."categoryId" = c.id
    WHERE c.slug = ${categorySlug}
  `
  return products as Product[]
}

export async function getProductById(id: number): Promise<Product | null> {
  const products = await sql`SELECT * FROM "Product" WHERE id = ${id} LIMIT 1`
  return (products[0] as Product) || null
}

// Order queries
export async function createOrder(name: string, total: number, orderProducts: { id: number; quantity: number }[]): Promise<Order> {
  const orders = await sql`
    INSERT INTO "Order" (name, total, status, date)
    VALUES (${name}, ${total}, false, NOW())
    RETURNING *
  `
  const order = orders[0] as Order

  for (const item of orderProducts) {
    await sql`
      INSERT INTO "OrderProducts" ("orderId", "productId", quantity)
      VALUES (${order.id}, ${item.id}, ${item.quantity})
    `
  }

  return order
}

export async function getOrders(status?: boolean): Promise<OrderWithProducts[]> {
  let orders: Order[]
  
  if (status !== undefined) {
    orders = await sql`
      SELECT * FROM "Order"
      WHERE status = ${status}
      ORDER BY date DESC
    ` as Order[]
  } else {
    orders = await sql`
      SELECT * FROM "Order"
      ORDER BY date DESC
    ` as Order[]
  }

  const ordersWithProducts: OrderWithProducts[] = []

  for (const order of orders) {
    const orderProducts = await sql`
      SELECT op.*, p.name, p.price, p.image, p."categoryId"
      FROM "OrderProducts" op
      JOIN "Product" p ON op."productId" = p.id
      WHERE op."orderId" = ${order.id}
    `
    
    ordersWithProducts.push({
      ...order,
      orderProducts: orderProducts.map((op: any) => ({
        id: op.id,
        orderId: op.orderId,
        productId: op.productId,
        quantity: op.quantity,
        product: {
          id: op.productId,
          name: op.name,
          price: op.price,
          image: op.image,
          categoryId: op.categoryId
        }
      }))
    })
  }

  return ordersWithProducts
}

export async function updateOrderStatus(id: number, status: boolean): Promise<Order> {
  const orders = await sql`
    UPDATE "Order"
    SET status = ${status}, "orderReadyAt" = ${status ? new Date() : null}
    WHERE id = ${id}
    RETURNING *
  `
  return orders[0] as Order
}

export async function getCompletedOrders(limit: number = 10): Promise<OrderWithProducts[]> {
  const orders = await sql`
    SELECT * FROM "Order"
    WHERE "orderReadyAt" IS NOT NULL
    ORDER BY "orderReadyAt" DESC
    LIMIT ${limit}
  ` as Order[]

  const ordersWithProducts: OrderWithProducts[] = []

  for (const order of orders) {
    const orderProducts = await sql`
      SELECT op.*, p.name, p.price, p.image, p."categoryId"
      FROM "OrderProducts" op
      JOIN "Product" p ON op."productId" = p.id
      WHERE op."orderId" = ${order.id}
    `
    
    ordersWithProducts.push({
      ...order,
      orderProducts: orderProducts.map((op: any) => ({
        id: op.id,
        orderId: op.orderId,
        productId: op.productId,
        quantity: op.quantity,
        product: {
          id: op.productId,
          name: op.name,
          price: op.price,
          image: op.image,
          categoryId: op.categoryId
        }
      }))
    })
  }

  return ordersWithProducts
}

// Product management
export type ProductWithCategory = Product & { category: Category }

export async function getProductsWithCategory(): Promise<ProductWithCategory[]> {
  const products = await sql`
    SELECT p.*, c.name as "categoryName", c.slug as "categorySlug"
    FROM "Product" p
    JOIN "Category" c ON p."categoryId" = c.id
    ORDER BY p.id
  `
  return products.map((p: any) => ({
    id: p.id,
    name: p.name,
    price: Number(p.price),
    image: p.image,
    categoryId: p.categoryId,
    category: {
      id: p.categoryId,
      name: p.categoryName,
      slug: p.categorySlug
    }
  }))
}

export async function getProductsPaginated(page: number, pageSize: number): Promise<ProductWithCategory[]> {
  const offset = (page - 1) * pageSize
  const products = await sql`
    SELECT p.*, c.name as "categoryName", c.slug as "categorySlug"
    FROM "Product" p
    JOIN "Category" c ON p."categoryId" = c.id
    ORDER BY p.id
    LIMIT ${pageSize} OFFSET ${offset}
  `
  return products.map((p: any) => ({
    id: p.id,
    name: p.name,
    price: Number(p.price),
    image: p.image,
    categoryId: p.categoryId,
    category: {
      id: p.categoryId,
      name: p.categoryName,
      slug: p.categorySlug
    }
  }))
}

export async function getProductCount(): Promise<number> {
  const result = await sql`SELECT COUNT(*) as count FROM "Product"`
  return Number(result[0].count)
}

export async function searchProducts(searchTerm: string): Promise<ProductWithCategory[]> {
  const products = await sql`
    SELECT p.*, c.name as "categoryName", c.slug as "categorySlug"
    FROM "Product" p
    JOIN "Category" c ON p."categoryId" = c.id
    WHERE p.name ILIKE ${'%' + searchTerm + '%'}
    ORDER BY p.id
  `
  return products.map((p: any) => ({
    id: p.id,
    name: p.name,
    price: Number(p.price),
    image: p.image,
    categoryId: p.categoryId,
    category: {
      id: p.categoryId,
      name: p.categoryName,
      slug: p.categorySlug
    }
  }))
}

export async function createProduct(data: { name: string; price: number; image: string; categoryId: number }): Promise<Product> {
  const products = await sql`
    INSERT INTO "Product" (name, price, image, "categoryId")
    VALUES (${data.name}, ${data.price}, ${data.image}, ${data.categoryId})
    RETURNING *
  `
  return products[0] as Product
}

export async function updateProduct(id: number, data: { name: string; price: number; image: string; categoryId: number }): Promise<Product> {
  const products = await sql`
    UPDATE "Product"
    SET name = ${data.name}, price = ${data.price}, image = ${data.image}, "categoryId" = ${data.categoryId}
    WHERE id = ${id}
    RETURNING *
  `
  return products[0] as Product
}
