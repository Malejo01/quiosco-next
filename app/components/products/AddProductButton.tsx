"use client"
import { useState } from "react"
import { Product } from "@/src/lib/db"
import { useStore } from "@/src/store"
import CartModal from "../order/CartModal"

type AddProductButtonProps = {
    product: Product
}

function AddProductButton({ product }: AddProductButtonProps) {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const addToOrder = useStore((state) => state.addToOrder)

    const handleAddToCart = () => {
        addToOrder(product)
        setIsCartOpen(true)
    }

    return (
        <>
            <button 
                type="button"
                className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded-lg transition-colors" 
                onClick={handleAddToCart}
            >
                Agregar
            </button>
            
            <CartModal 
                isOpen={isCartOpen} 
                onClose={() => setIsCartOpen(false)} 
            />
        </>
    )
}

export default AddProductButton
