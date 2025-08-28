import { Outlet, useLocation } from "react-router"
import Nav from "./adminUI/Nav"
import FooterAdmin from "./FooterAdmin"
import { useEffect } from "react";

function Admin() {
    const location = useLocation();
    useEffect(() => {document.title = "Admin Dashboard | GUESS®";}, []);
    return (
        <>
            <Nav />
                {location.pathname == "/admin" || location.pathname == "/admin/" ? (
                    <main className="container mx-auto p-4">
                        <h1 className="text-3xl font-bold text-gray-900 mb-3 text-center">Welcome back, Admin!</h1>
                        <p className="text-gray-700 text-sm md:text-base text-center">
                            Manage categories, add new fashion items, and keep your GUESS collection up to date.
                        </p>
                    </main>
                ) : ''}
                <Outlet />
            <FooterAdmin />
        </>
    )
}

export default Admin