'use client'

import { useMemo } from "react"
import { useStore } from "@/src/store"
import ProductCard from "../products/ProductCard"
import ProductDetails from "./ProductDetails"
import {toast} from 'react-toastify'
import { formatCurrency } from "@/src/utils"
import { createOrder } from "@/actions/create-order-action"
import { OrderSchema } from "@/src/schema"
import Link from "next/link"

export default function OrderSummary () {
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
        console.log(result)
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
        }
        toast.success('Pedido realizado con exito')
        clearOrder()
    }

    return (
        <aside className="lg: h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
            <h1 className="text-4xl text-center font-black">Mi pedido</h1>

            {order.length === 0 ? (
            <div className="grid grid-cols-1">
                <p className="text-center my-10">El pedido esta vacio</p> 
                <Link
                    href={'/orders'}
                    target='_blank'
                    className="bg-amber-300 my-8 lg:w-auto  text-xl px-10 py-2 text-center font-bold cursor-pointer rounded border-black hover:bg-amber-500"
                    > Ver Ordenes listas</Link>
            </div>
            ): (
                <div className="mt-5">
                    {order.map(item =>(
                        <ProductDetails
                            key={item.id}
                            item={item}
                        />
                    ))}
                    <p className="text-2xl mt-20 text-center">
                        Total a pagar: {''}
                        <span className="font-bold">
                            {formatCurrency(total)}
                        </span>
                    </p>
                    <form 
                        className="w-full mt-10 space-y-5"
                        action={handleCreateOrder}
                    >
                        <input 
                            type="text"
                            placeholder='Tu Nombre'
                            className="bg-white border border-gray-100 p-2 w-full"
                            name="name"
                        >
                        
                        </input>
                        <input
                            type="submit"
                            className="py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold"
                            value='Confirmar Pedido'
                        />
                    </form>
                </div>
            )}
        </aside>
    )
}