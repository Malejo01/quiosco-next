import EditProductForm from "@/app/components/products/EditProductForm"
import ProductForm from "@/app/components/products/ProductForm"
import GoBackButton from "@/app/components/ui/GoBackButton"
import Heading from "@/app/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

async function getProductById(id: number) {
    const product = await prisma.product.findUnique({
        where: {
            id
        }
    })
    if(!product) {
        notFound()
    }
    return product 
}


export default async function EditProductsPage({params}:{params: {id:string}}) {

    const product = await getProductById(+params.id)

    console.log(product)

    return (
        <div>
            <Heading>Editar Producto: {product.name}</Heading>
            <GoBackButton/>
            <EditProductForm>
                <ProductForm
                    product={product}
                />
            </EditProductForm>
        </div>
    )
}