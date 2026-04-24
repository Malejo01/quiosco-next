"use server"

import { createOrder as createOrderInDB } from "@/src/lib/db"
import { OrderSchema } from "@/src/schema"

export async function createOrder(data: unknown) {
    const result = OrderSchema.safeParse(data)

    if(!result.success) {
        return {
            errors: result.error.issues
        }
    }

    try {
        await createOrderInDB(
            result.data.name,
            result.data.total,
            result.data.order.map(product => ({
                id: product.id,
                quantity: product.quantity
            }))
        )
    } catch (error) {
        console.log(error)
    }
}
