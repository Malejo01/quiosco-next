import { getCompletedOrders } from "@/src/lib/db";

export async function GET() {
    const orders = await getCompletedOrders(10)
    return Response.json(orders)
}
