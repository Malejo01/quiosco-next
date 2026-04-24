import { Product, Order, OrderProduct, OrderWithProducts as DBOrderWithProducts } from "@/src/lib/db";

export type OrderItem = Pick<Product,'id'| 'name' | 'price'> & {
    quantity: number
    subtotal: number
}

export type OrderWithProducts = DBOrderWithProducts

export type { Product, Order, OrderProduct } from "@/src/lib/db"
