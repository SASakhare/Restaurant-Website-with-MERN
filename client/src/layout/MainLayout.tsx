import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { Outlet } from "react-router-dom"



const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen ml-1 mr-1 md:m-0 ">
            {/* Navbar */}
            <header>
                <Navbar />
            </header>

            {/* Main Content */}
            <main className="flex-1 ">
                <Outlet />
            </main>

            {/* Footer  */}
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default MainLayout