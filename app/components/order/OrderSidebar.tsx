import { getCategories } from '@/src/lib/db'
import CategoryIcon from '../ui/CategoryIcon'
import Logo from '../ui/Logo'

export default async function OrderSideBar () {
    const categories = await getCategories()

    return (
        <aside className="md:w-72 md:h-screen bg-white">
            <Logo/>
            <nav className='mt-10'>
                {categories.map(category => (
                    <CategoryIcon 
                        key={category.id}
                        category={category}    
                    />
                ))}
            </nav>
        </aside>
    )
}
