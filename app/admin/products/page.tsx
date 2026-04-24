import { redirect } from 'next/navigation'
import ProductsPagination from "@/app/components/products/ProductsPagination";
import ProductTable from "@/app/components/products/ProductsTable";
import Heading from "@/app/components/ui/Heading";
import { getProductsPaginated, getProductCount, type ProductWithCategory } from "@/src/lib/db";
import Link from 'next/link';
import ProductSearchForm from '@/app/components/products/ProductSearchForm';

export type ProductsWithCategory = ProductWithCategory[]

export default async function ProductsPage ({searchParams} : {searchParams: Promise<{page: string}>}) {
    const { page: pageParam } = await searchParams
    const page = +pageParam || 1
    const pageSize = 10

    if (page < 0) {
        redirect('/admin/products')
    }

    const [products, totalProducts] = await Promise.all([
        getProductsPaginated(page, pageSize),
        getProductCount()
    ])
    
    const totalPages = Math.ceil(totalProducts / pageSize)
     
    if (page > totalPages && totalPages > 0) {
        redirect('/admin/products')
    }
    
    return (
        <>
        <Heading>Administrar Productos</Heading>

        <div className='flex flex-col lg:flex-row lg:justify-between gap-5'>
            <Link
                href={'products/new'}
                className='bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer'
            >
            Crear Producto</Link>

            <ProductSearchForm />
        </div>

        <ProductTable
        products={products}
        />
 
        <ProductsPagination
            page={page}
            totalPages={totalPages}
        />
        </>
    )
}
