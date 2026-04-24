import { getOrders } from "@/src/lib/db"

export async function GET() {
    const orders = await getOrders(false)
    return Response.json(orders)
}

export async function POST() {
    
}

export async function PATCH() {
    
}
