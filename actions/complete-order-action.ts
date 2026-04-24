"use server"

import { revalidatePath } from 'next/cache'
import { updateOrderStatus } from "@/src/lib/db"
import { OrderIdSchema } from "@/src/schema"

export async function completeOrder(formData: FormData) {
    const data = {
        orderId: formData.get('order_id')
    }

    const result = OrderIdSchema.safeParse(data)

    if (result.success) {
        try {
            await updateOrderStatus(result.data.orderId, true)
            revalidatePath('/admin/orders')
        } catch (error) {
            console.log(error)
        }
    }
}
