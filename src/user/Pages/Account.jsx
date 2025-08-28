import { useEffect } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { Link, Navigate, useLocation, useNavigate } from "react-router"
import { Heart, LogOutIcon } from "lucide-react"

function Account() {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const isLogged = localStorage.getItem("token")
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [pathname])
    useEffect(() => {document.title = "My Guess | GUESS®"}, [])
    return (
        <>
            {isLogged ? 
                <>
                    <Header />
                    <main>
                        <div className="flex mx-auto flex-col lg:justify-center lg:flex-row lg:pt-[3rem] lg:mt-[1.5rem] lg:max-w-[84%] lg:px-[15px]">
                            <div className="flex-1/3 flex flex-col gap-4">
                                <div className="flex items-center justify-center my-4 lg:justify-start lg:items-start lg:my-0">
                                    <div className="rounded-full me-4 bg-[#343a40] flex justify-center items-center w-[56px] h-[56px]">
                                        <span className="text-white">{localStorage.getItem("firstName").charAt(0)}</span>
                                        <span className="text-white">{localStorage.getItem("lastName").charAt(0)}</span>
                                    </div>
                                    <div className="text-xl font-bold">Hi {localStorage.getItem("firstName")}</div>
                                </div>
                                <div className="flex flex-col justify-center px-2 gap-2">
                                    <Link to="/guess/account" className="border-l-3 p-2 flex bg-[#f9f9f9] items-center cursor-pointer gap-2">
                                        <img className="w-3.5 h-3.5" src="../../../Guess_Favicon.svg" alt="guess favicon" />
                                        My Guess
                                    </Link>
                                    <Link to="/guess/wishlist" className="p-2 flex items-center cursor-pointer gap-2">
                                        <Heart size={16} />
                                        Wishlist
                                    </Link>
                                    <button 
                                        onClick={() => {
                                            localStorage.clear()
                                            navigate("/login")
                                        }} 
                                        className="p-2 flex items-center cursor-pointer gap-2">
                                        <LogOutIcon size={16} />
                                        Logout
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col text-center justify-center items-center flex-2/3">
                                <h1 className="text-4xl hidden lg:block text-center">My Guess</h1>
                                <h2 className="text-3xl my-5 border-b-4 rounded py-2.5">Enjoy your benefits</h2>
                                <div className="overflow-auto flex lg:justify-center w-full gap-4 px-2">
                                    <div className="shadow-xl justify-between bg-[rgba(176,190,197,.25)] rounded-2xl flex flex-col min-w-[100%] lg:min-w-auto lg:flex-1/4 mb-12">
                                        <img className="p-6 self-center flex-1/2" src="../../myguess_FreeShipping.svg" alt="free shipping" />
                                        <div className="rounded-b-2xl flex-1/2 bg-white p-5 flex justify-center items-center">
                                            <h3 className="py-6">Free shipping</h3>
                                        </div>
                                    </div>
                                    <div className="shadow-xl justify-between bg-[rgba(176,190,197,.25)] rounded-2xl flex flex-col min-w-[100%] lg:min-w-auto lg:flex-1/4 mb-12">
                                        <img className="p-6 self-center flex-1/2" src="../../myguess_FreeReturns.svg" alt="free shipping" />
                                        <div className="rounded-b-2xl flex-1/2 bg-white p-5 flex justify-center items-center">
                                            <h3 className="py-6">Free returns</h3>
                                        </div>
                                    </div>
                                    <div className="shadow-xl justify-between bg-[rgba(176,190,197,.25)] rounded-2xl flex flex-col min-w-[100%] lg:min-w-auto lg:flex-1/4 mb-12">
                                        <img className="p-5 self-center flex-1/2" src="../../myguess_BirthdayPromo.svg" alt="free shipping" />
                                        <div className="rounded-b-2xl flex-1/2 bg-white p-5 flex justify-center items-center">
                                            <h3 className="py-6">Birthday Promo</h3>
                                        </div>
                                    </div>
                                    <div className="shadow-xl justify-between bg-[rgba(176,190,197,.25)] rounded-2xl flex flex-col min-w-[100%] lg:min-w-auto lg:flex-1/4 mb-12">
                                        <img className="p-5.5 flex-1/2 self-center" src="../../myguess_PromotionEarlyAccess.svg" alt="free shipping" />
                                        <div className="rounded-b-2xl flex-1/2 bg-white p-5 flex justify-center items-center">
                                            <h3 className="py-6">Promotion Early Access</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col mx-4 my-4 p-4 bg-[#ebeff1] rounded lg:w-full lg:justify-center lg:items-center">
                                    <h5 className="mt-4 mb-2 text-3xl font-semibold text-center">Welcome Promo 10% OFF</h5>
                                    <p className="text-[#7db4bf] mb-2">on New Collection</p>
                                    <p className="mb-2">using the promocode</p>
                                    <button className="px-6 py-4 mb-2 border rounded-xl border-dashed">GUESSWELCOMESYOU</button>
                                    <button onClick={() => navigate("/")} className="mt-4 px-6 py-4 bg-black text-white hover:shadow hover:translate-[-5px] transition duration-150">Start Shopping Now</button>
                                </div>
                                <div className="mb-2 p-4 text-start text-xs text-[#1d1d1d]">
                                    *The discount is activated and automatically calculated in the cart by entering the promotional code provided at the end of the registration process. The promotion is valid on the guess.eu website on selected Guess, Marciano by Guess, Guess Originals and Guess Kids products.The promotion is valid for 15 days from the activation date. The offer is linked to this email address and is not transferable to third parties. It cannot be combined with any other discount, sale, coupon, promotion, previous purchases or other offer.The discount cannot be used for the purchase of gift cards, and is valid for one use only. Past collections and Special Capsules are excluded.
                                </div>
                            </div>
                        </div>
                    </main>
                    <Footer />
                </>
                :
                <Navigate to="/login" />
            }
        </>
    )
}

export default Account