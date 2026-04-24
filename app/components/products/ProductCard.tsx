import { formatCurrency, getImagePath } from "@/src/utils"
import { Product } from "@/src/lib/db"
import AddProductButton from "./AddProductButton"

type ProductCardProps = {
    product: Product
}

export default function ProductCard({product}: ProductCardProps) {
    const imagePath = getImagePath(product.image)
    
    return (
        <div className="border bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="relative w-full aspect-[4/3] sm:aspect-video lg:aspect-[4/3]">
                <img 
                    src={imagePath} 
                    alt={`Imagen Platillo ${product.name}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </div>

            <div className="p-4 sm:p-5">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold line-clamp-2">{product.name}</h3>
                <p className="mt-3 sm:mt-5 font-black text-2xl sm:text-3xl lg:text-4xl text-amber-500">
                    {formatCurrency(product.price)}
                </p>
                <AddProductButton product={product} />
            </div>
        </div>
    )
}
