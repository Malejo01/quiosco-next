'use client'

import { useMemo } from "react"
import { useStore } from "@/src/store"
import { formatCurrency } from "@/src/utils"
import { XCircleIcon, MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { toast } from 'react-toastify'
import { createOrder } from "@/actions/create-order-action"
import { OrderSchema } from "@/src/schema"

type CartModalProps = {
    isOpen: boolean
    onClose: () => void
}

const MIN_ITEMS = 1
const MAX_ITEMS = 10

export default function CartModal({ isOpen, onClose }: CartModalProps) {
    const order = useStore((state) => state.order)
    const clearOrder = useStore((state) => state.clearOrder)
    const increaseQuantity = useStore((state) => state.increaseQuantity)
    const decreaseQuantity = useStore((state) => state.decreaseQuantity)
    const removeItem = useStore((state) => state.removeItem)
    
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
        onClose()
    }

    return (
        <>
            {/* Overlay */}
            <div 
                className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={onClose}
            />

            {/* Modal Panel - Slides from left */}
            <div 
                className={`fixed top-0 left-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
                    <h2 className="text-xl font-bold">Mi Carrito</h2>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Cerrar carrito"
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
                
                {/* Content */}
                <div className="overflow-y-auto h-[calc(100%-64px)] pb-32">
                    {order.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mb-4 text-gray-300">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121 0 2.09-.77 2.35-1.853l1.287-5.367A1.125 1.125 0 0 0 18.513 6H4.414l-.001.001M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                            <p className="text-center">Tu carrito esta vacio</p>
                            <button 
                                onClick={onClose}
                                className="mt-4 text-amber-600 font-semibold hover:text-amber-700"
                            >
                                Seguir comprando
                            </button>
                        </div>
                    ) : (
                        <div className="p-4 space-y-4">
                            {order.map(item => (
                                <div key={item.id} className="bg-gray-50 rounded-lg p-4 space-y-3">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <p className="font-bold text-gray-900">{item.name}</p>
                                            <p className="text-amber-500 font-bold text-lg">{formatCurrency(item.price)}</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeItem(item.id)}
                                            className="text-red-500 hover:text-red-700 transition-colors"
                                        >
                                            <XCircleIcon className="h-7 w-7"/>
                                        </button>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3 bg-white rounded-lg px-3 py-2 border border-gray-200">
                                            <button
                                                type="button"
                                                onClick={() => decreaseQuantity(item.id)}
                                                disabled={item.quantity === MIN_ITEMS}
                                                className="disabled:opacity-30 hover:bg-gray-100 rounded p-1 transition-colors"
                                            >
                                                <MinusIcon className="h-5 w-5"/>
                                            </button>
                                            <span className="font-bold text-lg w-8 text-center">{item.quantity}</span>
                                            <button
                                                type="button"
                                                onClick={() => increaseQuantity(item.id)}
                                                disabled={item.quantity === MAX_ITEMS}
                                                className="disabled:opacity-30 hover:bg-gray-100 rounded p-1 transition-colors"
                                            >
                                                <PlusIcon className="h-5 w-5"/>
                                            </button>
                                        </div>
                                        <p className="font-bold text-gray-700">
                                            {formatCurrency(item.subtotal)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer - Fixed at bottom */}
                {order.length > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold">Total:</span>
                            <span className="text-2xl font-bold text-amber-600">{formatCurrency(total)}</span>
                        </div>
                        <form action={handleCreateOrder} className="space-y-3">
                            <input 
                                type="text"
                                placeholder='Tu Nombre'
                                className="bg-white border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none"
                                name="name"
                                required
                            />
                            <button
                                type="submit"
                                className="py-3 rounded-lg uppercase text-white bg-black w-full text-center cursor-pointer font-bold hover:bg-gray-800 transition-colors"
                            >
                                Confirmar Pedido
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </>
    )
}
