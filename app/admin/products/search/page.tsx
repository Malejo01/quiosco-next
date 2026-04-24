import ProductSearchForm from "@/app/components/products/ProductSearchForm";
import ProductTable from "@/app/components/products/ProductsTable";
import Heading from "@/app/components/ui/Heading";
import { searchProducts } from "@/src/lib/db";
import Link from "next/link";

export default async function SearchPage({searchParams}: {searchParams: Promise<{search: string}>}) {
    const { search } = await searchParams
    const products = await searchProducts(search)
    
    return (
        <>
        <Heading> Resultados de Búsqueda: {search} </Heading>

        <div className='flex flex-col lg:flex-row lg:justify-between gap-5'>
            <Link
                href={'products/new'}
                className='bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer'
            >
            Crear Producto</Link>

            <ProductSearchForm/>
        </div>

        {products.length ? (
            <ProductTable
                products={products}
            />
        ) : (
            <p className="text-center text-lg">No hay resultados en al busqueda de: {search}</p>
        )}
        </>
    )
}
