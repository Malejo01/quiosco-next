import { OrderWithProducts } from "@/src/types"

type LatestOrderItemProps = {
    order: OrderWithProducts,
}

export default function LatestOrderItem({order}: LatestOrderItemProps) {
    return (
        <div className="bg-white shadow-md p-4 sm:p-5 rounded-lg border-l-4 border-amber-500">
            <div className="flex items-center justify-between mb-3">
                <p className="text-lg sm:text-2xl font-bold text-slate-700">
                    {order.name}
                </p>
                <span className="bg-green-100 text-green-700 text-xs sm:text-sm font-semibold px-2 py-1 rounded-full">
                    Listo
                </span>
            </div>
            
            <ul 
                role="list"
                className="divide-y divide-gray-100 text-sm sm:text-base font-medium text-gray-600"
            >
                {order.orderProducts.map(product => (
                    <li 
                        key={product.id}
                        className="flex items-center justify-between py-2 sm:py-3"
                    >   
                        <p className="flex-1">
                            {product.product.name}
                        </p>
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold text-sm">
                            x{product.quantity}
                        </span>
                    </li>
                ))}
            </ul>
            
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs sm:text-sm text-slate-500">
                <span>Orden #{order.id}</span>
                <span>{order.orderProducts.length} producto{order.orderProducts.length !== 1 ? 's' : ''}</span>
            </div>
        </div>
    )
}
