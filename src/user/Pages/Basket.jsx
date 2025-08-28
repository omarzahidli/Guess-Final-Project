import { useEffect, useState } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { useLocation, useNavigate } from "react-router"
import { FaShoppingBag } from "react-icons/fa"
import { useGetBasketQuery, useGetAllProductsQuery } from "../../strore/guessApi"
import { Loader2, Plus } from "lucide-react"
import BasketProduct from "../components/BasketProduct"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import ProductCard from "../components/ProductCard"

function Basket() {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [pathname])
    useEffect(() => {document.title = "Cart | GUESS®"}, [])
    const token = localStorage.getItem("token")
    const { data: basket, isLoading, refetch, isError } = useGetBasketQuery(token, {skip: !token})
    useEffect(() => {
        if (token) {
            refetch()
        }
    }, [token, refetch, basket]);
    const {data: products, isLoading: isProdLoading} = useGetAllProductsQuery()
    const [randomProducts, setRandomProducts] = useState([]);
    useEffect(() => {
        if (products && products.length > 0) {
            const shuffled = [...products].sort(() => 0.5 - Math.random());
            setRandomProducts(shuffled.slice(0, 8));
        }
    }, [products]);
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
        ]
    };
    return (
        <>
            <Header />
            <main>
                {isLoading ? 
                    <div className="h-screen flex justify-center items-center">
                        <Loader2 size={100} className="animate-spin" /> 
                    </div>
                    : basket?.items?.length ?
                    <>
                        <div className="py-6 px-4 flex flex-col lg:flex-row lg:max-w-[84%] lg:mx-auto lg:mt-11">
                            <div className="lg:px-7.5 lg:flex-4/7">
                                <h1 className="uppercase text-xl font-semibold mb-7.5">Shopping bag</h1>
                                <div className="py-2.5 lg:flex justify-between hidden ">
                                    <span className="ps-2.5 uppercase font-semibold">product</span>
                                    <span className="ps-2.5 uppercase font-semibold">description</span>
                                    <span className="ps-2.5 uppercase font-semibold">size</span>
                                    <span className="ps-2.5 uppercase font-semibold">qty</span>
                                    <span className="ps-2.5 uppercase font-semibold">price</span>
                                </div>    
                                <div className="py-4 flex overflow-auto max-h-[500px] flex-col gap-5 mx-auto items-center border-t border-gray-300">
                                    {basket.items.map((prod, idx) => (
                                        <BasketProduct key={idx} data={prod} />
                                    ))}
                                </div>
                                <div className="mt-8.5 mb-3.5 border border-[#0cad58] px-3.5 py-4.5">
                                    <div className="flex items-center gap-2">
                                        <div className="max-w-[90px] border-r border-gray-300">
                                            <img src="../../guesseco.png" alt="Guess Eco" />
                                        </div>
                                        <div className="flex flex-col text-sm">
                                            <span className="text-[#0cad58]">
                                                Reimagining packaging, leveraging for conscious actions
                                            </span>
                                            <div className="hidden md:inline-block">
                                                You’ll receive your items in a box or bag made of <span className="font-semibold">FSC certified recyclable materials</span>, in line with our commitment to environmental sustainability. The FSC certification label guarantees that the paper used for the packaging comes from reliable sources and recycled materials.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:px-2.5 lg:flex-3/7">
                                <div className="relative flex items-center mb-[2.5rem]">
                                    <input type="text" className="border ps-3 pe-7 py-1.5 w-full border-gray-300" placeholder="Insert here your promo code" />
                                    <Plus className="absolute right-1" />
                                </div>
                                <div className="flex flex-col md:items-end border pt-6 px-3.5 pb-5 font-semibold mb-5">
                                    <h5 className="text-xl uppercase mb-5 md:self-start">summary</h5>
                                    <div className="text-sm flex justify-between items-center border-b md:w-[52%] border-gray-300">
                                        <span className="uppercase mb-2.5">sub total</span>
                                        <span className="mb-2.5">{basket.totalPrice}&euro;</span>
                                    </div>
                                    <h6 className="pt-2.5 text-md uppercase mb-5 md:ps-12 md:self-center">shipping</h6>
                                    <div className="text-sm flex justify-between items-center md:w-[52%] mb-4">
                                        <div className="uppercase mb-2.5 border-b">Express home delivery <span className="hidden md:inline">(1-2 days)</span></div>
                                        <span className="mb-2.5">0.00&euro;</span>
                                    </div>
                                    <div className="text-md flex justify-between md:w-[52%] items-center">
                                        <div className="uppercase mb-2.5">total</div>
                                        <span className="mb-2.5">{basket.totalPrice}&euro;</span>
                                    </div>
                                </div>
                                <div>
                                    <button className="text-white border-2 hover:bg-white transition duration-150 hover:text-black bg-black px-4 py-3.5 mb-5 w-full">
                                        Proceed to checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                        {isProdLoading ?
                            <div className="flex justify-center items-center">
                                <Loader2 size={100} className="animate-spin" /> 
                            </div>
                            :
                            <div className="py-6 mt-4 overflow-hidden px-4">
                                <h2 className="text-2xl font-semibold mb-4">You Might Also Like</h2>
                                <Slider {...sliderSettings}>
                                    {randomProducts?.map((prod, idx) => (
                                        <div key={idx} className="pe-1">
                                            <ProductCard data={prod} cat={prod.category.name.toLowerCase()} parent={prod.category.parentId} />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        }
                    </>
                    :
                    <div className="px-3.5 py-12 flex justify-center h-[60vh] items-center flex-col text-center">
                        <FaShoppingBag size={48} />
                        <h2 className="text-3xl lg:text-4xl mb-2 font-semibold">Your Shopping bag is empty</h2>
                        <p className="text-lg text-gray-500 mb-4">You currently don't have any items in your shopping bag</p>
                        {token ? (
                            <button onClick={() => navigate('/')} className="bg-black text-white px-4 py-2 lg:px-6 lg:py-4 lg:text-xl hover:bg-white border-2 hover:text-black transition duration-150">
                                Go to Homepage
                            </button>
                        ) : (
                            <>
                                <p className="mb-4 text-lg text-gray-500">Can't see your items?</p>
                                <button onClick={() => navigate('/login')} className="bg-black text-white px-4 py-2 lg:px-6 lg:py-4 lg:text-xl hover:bg-white border-2 hover:text-black transition duration-150">
                                    Sign in or create an account
                                </button>
                            </>
                        )}
                    </div>
                }
            </main>
            <Footer /> 
        </>
    )
}

export default Basket