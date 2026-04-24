'use client'

import { useMemo, useState } from "react"
import { useStore } from "@/src/store"
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
    const [isExpanded, setIsExpanded] = useState(false)
    
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
        }
        toast.success('Pedido realizado con exito')
        clearOrder()
        setIsExpanded(false)
    }

    const itemCount = order.reduce((acc, item) => acc + item.quantity, 0)

    return (
        <>
            {/* Mobile Cart Button - Fixed at bottom */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 p-3 shadow-lg">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full bg-amber-400 hover:bg-amber-500 text-black font-bold py-3 px-4 rounded-lg flex items-center justify-between transition-colors"
                >
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121 0 2.09-.77 2.35-1.853l1.287-5.367A1.125 1.125 0 0 0 18.513 6H4.414l-.001.001M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                        <span>Mi Pedido ({itemCount})</span>
                    </div>
                    <span>{formatCurrency(total)}</span>
                </button>
            </div>

            {/* Mobile Cart Panel */}
            {isExpanded && (
                <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setIsExpanded(false)}>
                    <div 
                        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold">Mi Pedido</h2>
                            <button 
                                onClick={() => setIsExpanded(false)}
                                className="p-2 hover:bg-gray-100 rounded-full"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <div className="p-4 pb-24">
                            {order.length === 0 ? (
                                <p className="text-center text-gray-500 py-8">El pedido esta vacio</p>
                            ) : (
                                <>
                                    {order.map(item => (
                                        <ProductDetails key={item.id} item={item} />
                                    ))}
                                    <p className="text-xl mt-6 text-center font-bold">
                                        Total: {formatCurrency(total)}
                                    </p>
                                    <form className="mt-4 space-y-3" action={handleCreateOrder}>
                                        <input 
                                            type="text"
                                            placeholder='Tu Nombre'
                                            className="bg-white border border-gray-300 p-3 w-full rounded-lg"
                                            name="name"
                                        />
                                        <input
                                            type="submit"
                                            className="py-3 rounded-lg uppercase text-white bg-black w-full text-center cursor-pointer font-bold"
                                            value='Confirmar Pedido'
                                        />
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Desktop Sidebar */}
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
                ): (
                    <div className="mt-5">
                        {order.map(item =>(
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
        </>
    )
}
