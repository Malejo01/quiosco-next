import OrderSideBar from "../components/order/OrderSidebar";
import OrderSummary from "../components/order/OrderSummary";
import ToastNotification from "../components/ui/ToastNotification";

export default function RootLayout({ children }: { children: React.ReactNode }) 
{
    return (
        <>
            <div className="flex flex-col md:flex-row min-h-screen">
                <OrderSideBar/>
                
                {/* Main content - add top padding on mobile for fixed header */}
                <main className="flex-1 pt-16 md:pt-0 md:h-screen md:overflow-y-scroll p-4 md:p-5">
                    {children}
                </main>
                
                {/* Order Summary - Only visible on desktop */}
                <OrderSummary/>
            </div>
            <ToastNotification/>
        </>
    )
}
