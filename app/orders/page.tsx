"use client"
import Logo from "../components/ui/Logo";
import Heading from '../components/ui/Heading';
import useSWR from 'swr';
import { OrderWithProducts } from "@/src/types";
import LatestOrderItem from "../components/order/LatestOrderItem";


export default function OrdersPage() {

    const url = '/orders/api'
    const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
    const {data, error, isLoading} = useSWR<OrderWithProducts[]>(url, fetcher, {
        refreshInterval:5000,
        revalidateOnFocus: false
    })

    if(error) return (
        <h1>Hay Errores: {error}</h1>
    )

    if (isLoading) return (
        <Heading>Cargando...</Heading>
    )

   if (data)  return (
        <div>
        <h1 className="text-center mt-20 text-6xl font-black"> Ordenes Listas</h1>

        <Logo/>
        {data.length ? (
            <div className="grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-10 ">
                {data.map(order => (
                    <LatestOrderItem
                        key={order.id}
                        order={order}
                    />
                ))}
            </div>
        ): <p className= 'text-center my-10'>No hay ordenes listas </p>}
        </div>
    )
}