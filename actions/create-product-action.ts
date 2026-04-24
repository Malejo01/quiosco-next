"use server"

import { createProduct as createProductInDB } from "@/src/lib/db"
import { ProductSchema } from "@/src/schema"

export async function createProduct(data: unknown) {
    const result = ProductSchema.safeParse(data)
    if (!result.success) {
        return {
            errors: result.error.issues
        }
    }

    await createProductInDB(result.data)
}
