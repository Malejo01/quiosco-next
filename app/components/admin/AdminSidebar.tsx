'use client'
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Logo from "../ui/Logo"

const adminNavigation = [
    {url: '/admin/orders', text: 'Ordenes', blank: false},
    {url: '/admin/products', text: 'Productos', blank: false},
    {url: '/order/cafe', text: 'Ver Quiosco', blank: true},
]

export default function AdminSidebar() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    return (
        <>
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200">
                <Link href="/admin/orders" className="text-xl font-bold text-amber-600">
                    Admin Panel
                </Link>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                    aria-label={isOpen ? 'Cerrar menu' : 'Abrir menu'}
                >
                    {isOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} border-b border-gray-200`}>
                <nav className="flex flex-col p-4 space-y-2">
                    {adminNavigation.map(link => {
                        const isActive = pathname === link.url
                        return (
                            <Link
                                key={link.url}
                                href={link.url}
                                target={link.blank ? '_blank' : '_self'}
                                onClick={() => setIsOpen(false)}
                                className={`px-4 py-3 rounded-lg font-semibold transition-colors ${
                                    isActive 
                                        ? 'bg-amber-400 text-black' 
                                        : 'hover:bg-amber-100 text-gray-700'
                                }`}
                            >
                                {link.text}
                            </Link>
                        )
                    })}
                </nav>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:block">
                <Logo/>
                <div className="space-y-3">
                    <p className="mt-10 uppercase font-bold text-sm text-gray-600 text-center">Navegacion</p>
                    <nav className="flex flex-col">
                        {adminNavigation.map(link => {
                            const isActive = pathname === link.url
                            return (
                                <Link
                                    key={link.url}
                                    href={link.url}
                                    target={link.blank ? '_blank' : '_self'}
                                    className={`border-t border-gray-200 p-3 last-of-type:border-b font-bold transition-colors ${
                                        isActive 
                                            ? 'bg-amber-400' 
                                            : 'hover:bg-amber-300'
                                    }`}
                                >
                                    {link.text}
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            </div>
        </>
    )
}
