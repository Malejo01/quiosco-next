"use client"
import Link from "next/link";
import Logo from "../components/ui/Logo";
import Heading from '../components/ui/Heading';
import useSWR from 'swr';
import { OrderWithProducts } from "@/src/types";
import LatestOrderItem from "../components/order/LatestOrderItem";

export default function OrdersPage() {
    const url = '/orders/api'
    const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
    const {data, error, isLoading} = useSWR<OrderWithProducts[]>(url, fetcher, {
        refreshInterval: 5000,
        revalidateOnFocus: false
    })

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header with back button */}
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
                    <Link 
                        href="/order/cafe"
                        className="flex items-center gap-2 text-amber-500 hover:text-amber-600 font-semibold transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        <span className="hidden sm:inline">Volver al Menu</span>
                        <span className="sm:hidden">Menu</span>
                    </Link>
                    
                    <h1 className="text-lg sm:text-xl lg:text-2xl font-black text-slate-800">
                        Ordenes Listas
                    </h1>
                    
                    <div className="w-20 sm:w-28">
                        {/* Spacer for centering */}
                    </div>
                </div>
            </header>

            {/* Logo */}
            <div className="py-4 sm:py-6">
                <Logo />
            </div>

            {/* Content */}
            <div className="px-4 pb-8">
                {error && (
                    <div className="max-w-5xl mx-auto bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                        <p className="text-red-600 font-medium">Error al cargar las ordenes</p>
                    </div>
                )}

                {isLoading && (
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                            <p className="mt-4 text-slate-600 font-medium">Cargando ordenes...</p>
                        </div>
                    </div>
                )}

                {data && (
                    data.length ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-5xl mx-auto">
                            {data.map(order => (
                                <LatestOrderItem
                                    key={order.id}
                                    order={order}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-8 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-slate-300">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                            </svg>
                            <p className="mt-4 text-slate-500 text-lg">No hay ordenes listas</p>
                            <Link 
                                href="/order/cafe"
                                className="inline-block mt-6 bg-amber-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
                            >
                                Ir al Menu
                            </Link>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}
