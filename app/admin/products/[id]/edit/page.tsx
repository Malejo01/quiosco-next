import EditProductForm from "@/app/components/products/EditProductForm"
import ProductForm from "@/app/components/products/ProductForm"
import GoBackButton from "@/app/components/ui/GoBackButton"
import Heading from "@/app/components/ui/Heading"
import { getProductById } from "@/src/lib/db"
import { notFound } from "next/navigation"

export default async function EditProductsPage({params}: {params: Promise<{id: string}>}) {
    const { id } = await params;
    const product = await getProductById(+id)

    if (!product) {
        notFound()
    }

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
