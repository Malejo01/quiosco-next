import { getCategories } from '@/src/lib/db'
import CategoryIcon from '../ui/CategoryIcon'
import Logo from '../ui/Logo'
import MobileMenu from '../ui/MobileMenu'

export default async function OrderSideBar () {
    const categories = await getCategories()

    return (
        <>
            {/* Mobile Menu */}
            <MobileMenu categories={categories} />
            
            {/* Desktop Sidebar - Hidden on mobile */}
            <aside className="hidden md:block md:w-72 md:h-screen bg-white md:sticky md:top-0">
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
        </>
    )
}
