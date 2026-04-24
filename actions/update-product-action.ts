"use server"

import { updateProduct as updateProductInDB } from "@/src/lib/db"
import { ProductSchema } from "@/src/schema"
import { revalidatePath } from "next/cache"

export async function updateProduct(data: unknown, id: number) {
    const result = ProductSchema.safeParse(data)
    if (!result.success) {
        return {
            errors: result.error.issues
        }
    }

    await updateProductInDB(id, result.data)
    revalidatePath('/admin/products')
}
