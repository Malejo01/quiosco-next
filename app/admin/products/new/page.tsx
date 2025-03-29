import AddProductForm from "@/app/components/products/AddProductForm";
import ProductForm from "@/app/components/products/ProductForm";
import Heading from "@/app/components/ui/Heading";


export default function CreateProductPage() {
    return(
        <>
            <Heading>Nuevo Producto</Heading>
            <AddProductForm>
                <ProductForm/>
            </AddProductForm>
        </>
    )
}