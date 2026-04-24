'use client'

import { useMemo } from "react"
import { useStore } from "@/src/store"
import ProductDetails from "./ProductDetails"
import { toast } from 'react-toastify'
import { formatCurrency } from "@/src/utils"
import { createOrder } from "@/actions/create-order-action"
import { OrderSchema } from "@/src/schema"
import Link from "next/link"

export default function OrderSummary() {
    const order = useStore((state) => state.order)
    const clearOrder = useStore((state) => state.clearOrder)  
    const total = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])
    
    const handleCreateOrder = async (formData: FormData) => {
        const data = {
            name: formData.get('name'),
            total,
            order,
        }

        const result = OrderSchema.safeParse(data)
        if (!result.success) {
            result.error.issues.forEach((issue) => {
                toast.error(issue.message)
            })
            return
        }

        const response = await createOrder(data)
        if (response?.errors) {
            response.errors.forEach((issue) => {
                toast.error(issue.message)
            })
            return
        }
        toast.success('Pedido realizado con exito')
        clearOrder()
    }

    // Only show on desktop - mobile uses CartModal via header button
    return (
        <aside className="hidden md:block lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5 bg-white md:sticky md:top-0">
            <h1 className="text-3xl lg:text-4xl text-center font-black">Mi pedido</h1>

            {order.length === 0 ? (
                <div className="grid grid-cols-1">
                    <p className="text-center my-10 text-gray-500">El pedido esta vacio</p> 
                    <Link
                        href={'/orders'}
                        target='_blank'
                        className="bg-amber-300 my-8 text-lg lg:text-xl px-6 lg:px-10 py-2 text-center font-bold cursor-pointer rounded hover:bg-amber-500 transition-colors"
                    > 
                        Ver Ordenes listas
                    </Link>
                </div>
            ) : (
                <div className="mt-5">
                    {order.map(item => (
                        <ProductDetails
                            key={item.id}
                            item={item}
                        />
                    ))}
                    <p className="text-xl lg:text-2xl mt-10 lg:mt-20 text-center">
                        Total a pagar: {''}
                        <span className="font-bold">
                            {formatCurrency(total)}
                        </span>
                    </p>
                    <form 
                        className="w-full mt-6 lg:mt-10 space-y-4 lg:space-y-5"
                        action={handleCreateOrder}
                    >
                        <input 
                            type="text"
                            placeholder='Tu Nombre'
                            className="bg-white border border-gray-300 p-2 lg:p-3 w-full rounded-lg"
                            name="name"
                            required
                        />
                        <input
                            type="submit"
                            className="py-2 lg:py-3 rounded-lg uppercase text-white bg-black w-full text-center cursor-pointer font-bold hover:bg-gray-800 transition-colors"
                            value='Confirmar Pedido'
                        />
                    </form>
                </div>
            )}
        </aside>
    )
}
