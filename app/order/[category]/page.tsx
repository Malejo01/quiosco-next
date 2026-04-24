import ProductCard from "@/app/components/products/ProductCard"
import Heading from "@/app/components/ui/Heading"
import { getProductsByCategory } from "@/src/lib/db"
import Link from "next/link"

export default async function OrderPage({params}: {params: Promise<{ category: string }>}) {
    const { category } = await params;
    const products = await getProductsByCategory(category)

    return (
        <>
            <div className="flex justify-between">
                <Heading>
                    Elige y personaliza tu pedido a continuacion
                </Heading>
                <Link
                    href={'/admin/orders'}
                    target='_blank'
                    className="bg-amber-300 my-8 lg:w-auto max-h-12 text-xl px-10 pt-2 text-center font-bold cursor-pointer rounded border-black hover:bg-amber-500"
                > Admin </Link>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 items-start">
                {products.length > 0 ? (
                    products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))
                ) : (
                    <h1>No hay productos con esa categoria</h1>
                )}
            </div>
        </>
    )
}
