import ProductCard from "@/app/components/products/ProductCard"
import Heading from "@/app/components/ui/Heading"
import { getProductsByCategory } from "@/src/lib/db"
import Link from "next/link"

// Enable caching for faster subsequent loads
export const revalidate = 60 // Revalidate every 60 seconds

export default async function OrderPage({params}: {params: Promise<{ category: string }>}) {
    const { category } = await params;
    const products = await getProductsByCategory(category)

    return (
        <div className="pb-20 md:pb-0">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <Heading>
                    Elige y personaliza tu pedido
                </Heading>
                <Link
                    href={'/admin/orders'}
                    target='_blank'
                    className="hidden sm:inline-block bg-amber-300 text-base lg:text-xl px-6 lg:px-10 py-2 text-center font-bold cursor-pointer rounded hover:bg-amber-500 transition-colors"
                > 
                    Admin 
                </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                {products.length > 0 ? (
                    products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-full py-10">
                        No hay productos en esta categoria
                    </p>
                )}
            </div>
        </div>
    )
}
