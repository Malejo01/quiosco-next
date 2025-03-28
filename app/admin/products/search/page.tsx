import ProductSearchForm from "@/app/components/products/ProductSearchForm";
import ProductTable from "@/app/components/products/ProductsTable";
import Heading from "@/app/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";

async function searchProducts(searchTerm:string){
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: searchTerm,
                mode:'insensitive'
            }
        },
        include:{
            category: true
        }
    })
    return products
}

export default async function SearchPage({searchParams}: {searchParams: {search: string }}) {

   const products = await searchProducts(searchParams.search)
    return (
        <>
    <Heading> Resultados de Búsqueda: {searchParams.search} </Heading>

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
    ): <p className="text-center text-lg">No hay resultados en al busqueda de: {searchParams.search}</p>}

    

    </>
    )
}