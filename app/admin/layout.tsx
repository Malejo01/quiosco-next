import AdminSidebar from "../components/admin/AdminSidebar";
import ToastNotification from "../components/ui/ToastNotification";

export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="flex flex-col md:flex-row min-h-screen">
                <aside className="md:w-72 md:h-screen bg-white md:sticky md:top-0">
                    <AdminSidebar/>
                </aside>

                <main className="flex-1 md:h-screen md:overflow-y-scroll bg-gray-100 p-4 md:p-5">
                    {children}
                </main>
            </div>

            <ToastNotification/>
        </>
    )
}
