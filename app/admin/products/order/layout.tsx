import OrderSideBar from "@/app/components/order/OrderSidebar";
import OrderSummary from "@/app/components/order/OrderSummary";

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>)

{
    return (
        <>
        <div className="md:flex">
            <OrderSideBar/>
            <main>
                {children}
            </main>
            <OrderSummary/>
        </div>
        </>
    )

  }