import { useEffect, useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import SignIn from "../components/SignIn"
import SignUp from "../components/SignUp"
import { Navigate, useLocation } from "react-router"


function Login() {
const { pathname } = useLocation()
useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
}, [pathname])
    useEffect(() => {document.title = activeTab == "login" ? "Login | GUESS®" : "Register | GUESS®"}, )
    const [activeTab, setActiveTab] = useState("login")
    const isLogged = localStorage.getItem('token')
    return (
        <>
            <Header />
            <main className="flex flex-col items-center justify-center bg-white">
                {
                    isLogged ?
                        <Navigate to="/" />
                        :
                        <>
                            <div className="my-[4rem] lg:m-[5rem] w-full max-w-md text-center">
                                <h1 className="text-2xl font-bold text-black mb-8">Welcome to GUESS WORLD</h1>
                                <div className="flex justify-center  mb-6">
                                <button onClick={() => setActiveTab("login")} className={`px-6 py-2 text-sm font-semibold border-r border-r-gray-300 ${activeTab === "login" ? "border-b-2 border-black text-black" : "text-gray-400"}`}>
                                    Login
                                </button>
                                <button onClick={() => setActiveTab("register")} className={`px-6 py-2 text-sm font-semibold ${activeTab === "register" ? "border-b-2 border-black text-black" : "text-gray-400"}`}>
                                    Register
                                </button>
                                </div>
                                {activeTab == "login" ? <SignIn /> : <SignUp setActiveTab={setActiveTab} />}
                            </div>
                            <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start bg-[#1D1D1F] lg:bg-transparent w-full"> 
                                <div className="lg:absolute text-white text-center p-[1rem] max-w-[640px] ">
                                    <h4 className="mb-[.5rem] mt-[1rem] text-[2rem]">Download the GUESS<sup>®</sup> App</h4>
                                    <p className="mb-[.5rem] text-[1.2rem]">Shop your faves everytime you want and get instant updates on new collections, exclusive styles and promotions</p>
                                    <p className="mb-[.5rem] text-[1.2rem] font-bold">Click the icons below</p>
                                    <div className="flex flex-col lg:flex-row justify-center items-center my-[1.5rem] ">
                                        <img className="mx-[12px] h-[50px] mb-[8px]" src="/App_Store_Badge_en.svg" alt="Apple Store" />
                                        <img className="mx-[12px] h-[50px] mb-[8px]" src="/GetItOnGooglePlay_en.png" alt="Google Play" />
                                    </div>
                                </div>
                                <img className="hidden lg:block w-full" src="/PWA_download_banner_W_desktop.avif" alt="banner" />
                                <img className="lg:hidden w-full" src="/PWA_download_banner_W_mobile.avif" alt="banner" />
                            </div>
                        </>
                }
            </main>
            <Footer />
        </>
        
    )
}
export default Login
