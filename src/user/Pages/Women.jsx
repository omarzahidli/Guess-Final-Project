import Header from "../components/Header"
import Footer from "../components/Footer"
import { useGetAllCategoriesQuery } from "../../strore/guessApi"
import { useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router"

function Women() {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [pathname])
    useEffect(() => {document.title = "GUESS® Women - Shop the new SS25 Collection now"}, [])
    const { data } = useGetAllCategoriesQuery()
    return (
        <>
            <Header>
                <div className="sticky top-0 bg-white lg:flex p-3 overflow-auto flex-nowrap whitespace-nowrap gap-10 px-[15px] lg:px-[24px] hidden">
                    {data?.find(category => category.name === "Women")?.children?.map(child => (
                        <p onClick={() => navigate(`${child.name.toLowerCase().split(' ').join('')}?id=${child.id}`)} className={`${child.name == "Sale" ? "text-red-500 hover:text-red-700 " : "text-gray-500 hover:text-black "} text-sm cursor-pointer transition duration-100`} key={child.id}>{child.name}</p>
                    ))}
                </div>
            </Header>
            <main>
                <div className="lg:relative bg-[#f0f0f0] flex flex-col lg:flex-row items-center justify-center w-full mb-4 pb-4 lg:gap-10">
                    <div className="flex flex-col justify-center items-center lg:mx-[18px]">
                        <span className="mt-[1rem] text-sm text-gray-400">Online Only</span>
                        <h4 className="text-2xl min-sm:text-3xl lg:text-4xl font-light tracking-widest">Sale up to <span className="font-bold">50% off</span></h4>
                        <p className="text-xl text-gray-500 mt-[4px]">Further reductions</p>
                    </div>
                    <div className="max-sm:w-full max-sm:justify-start justify-center items-center flex flex-nowrap overflow-x-auto gap-10 whitespace-nowrap">
                        <Link to="/guess/search-products" className="text-xl after:underline after:flex after:border after:border-gray-400 px-[12px] mx-[8px] mt-[8px] mb-[16px] lg:mb-0 text-gray-950 cursor-pointer hover:text-black transition duration-100">View all</Link>
                        <Link to="/guess/women/clothing?id=16" className="text-xl after:underline after:flex after:border after:border-gray-400 px-[12px] mx-[8px] mt-[8px] mb-[16px] lg:mb-0 text-gray-950 cursor-pointer hover:text-black transition duration-100">Dresses</Link>
                        <Link to="/guess/women/bags?id=18" className="text-xl after:underline after:flex after:border after:border-gray-400 px-[12px] mx-[8px] mt-[8px] mb-[16px] lg:mb-0 text-gray-950 cursor-pointer hover:text-black transition duration-100">Bags</Link>
                        <Link to="/guess/women/shoes?id=19" className="text-xl after:underline after:flex after:border after:border-gray-400 px-[12px] mx-[8px] mt-[8px] mb-[16px] lg:mb-0 text-gray-950 cursor-pointer hover:text-black transition duration-100">Shoes</Link>
                    </div>
                    <span className="lg:absolute lg:bottom-2 lg:right-2 text-sm text-gray-500">info</span>
                </div>
                <div className="flex relative justify-center items-end lg:items-center">
                    <img className="lg:hidden" src="../../../hero_mobile.jpg" alt="hero" />
                    <img className="hidden lg:block" src="../../../hero.jpg" alt="hero" />
                    <div className="flex absolute flex-col items-center justify-center p-5 lg:p-0 gap-y-5">
                        <span className="text-center text-4xl lg:text-8xl text-white font-bold">Feel the summer call</span>
                        <div className='mx-auto flex flex-col lg:flex-row justify-center items-center pb-[25px]'>
                            <Link to="/guess/women/clothing?id=16" className="relative overflow-hidden bg-[#ffffffe6] rounded-[4px] m-[8px] px-[24px] py-[16px] min-w-[190px] text-center group z-10">
                                <span className="absolute inset-0 bg-white w-0 group-hover:w-full transition-all duration-300 ease-in-out z-0"></span>
                                <span className="relative z-10">Clothings</span>
                            </Link>
                            <Link to="/guess/women/bags?id=18" className="relative overflow-hidden bg-[#ffffffe6] rounded-[4px] m-[8px] px-[24px] py-[16px] min-w-[190px] text-center group z-10">
                                <span className="absolute inset-0 bg-white w-0 group-hover:w-full transition-all duration-300 ease-in-out z-0"></span>
                                <span className="relative z-10">Bags</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center lg:px-6 flex-col lg:gap-2 lg:flex-row lg:mt-24 w-full">
                    <div className="flex justify-center items-end lg:flex-1/2">
                        <img className="lg:hidden" src="../../../img_1_mobile.jpg" alt="hero" />
                        <img className="hidden lg:block" src="../../../img_01.jpg" alt="hero" />
                        <div className='absolute mx-auto flex flex-col lg:flex-row justify-center items-center pb-[25px]'>
                            <Link to="/guess/women/newin?id=14" className="relative overflow-hidden bg-[#ffffffe6] rounded-[4px] m-[8px] px-[24px] py-[16px] min-w-[190px] text-center group z-10">
                                <span className="absolute inset-0 bg-white w-0 group-hover:w-full transition-all duration-300 ease-in-out z-0"></span>
                                <span className="relative z-10">New in</span>
                            </Link>
                        </div>
                    </div>
                    <div className="flex justify-center items-end lg:flex-1/2">
                        <img className="lg:hidden" src="../../../img_2_mobile.jpg" alt="hero" />
                        <img className="hidden lg:block" src="../../../img_02.jpg" alt="hero" />
                        <div className='absolute mx-auto flex flex-col lg:flex-row justify-center items-center pb-[25px]'>
                            <Link to="/guess/women/lingerie?id=17" className="relative overflow-hidden bg-[#ffffffe6] rounded-[4px] m-[8px] px-[24px] py-[16px] min-w-[190px] text-center group z-10">
                                <span className="absolute inset-0 bg-white w-0 group-hover:w-full transition-all duration-300 ease-in-out z-0"></span>
                                <span className="relative z-10">Weekend escape</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-5 lg:mt-14 lg:mb-6 flex justify-center items-center">
                    <h3 className="mb-4 text-[1.75rem] lg:text-[3rem] font-semibold p-4">Flawless Match</h3>
                </div>
                <div className="flex items-center lg:px-6 overflow-x-auto lg:gap-2 w-full">
                    <div className="relative flex justify-center items-end max-sm:min-w-[240px] max-md:min-w-[530px] lg:flex-1/3">
                        <img className="lg:hidden" src="../../../img_3_mobile.jpg" alt="hero" />
                        <img className="hidden lg:block" src="../../../img_03.jpg" alt="hero" />
                        <div className='absolute flex justify-center items-center pb-[25px] overflow-hidden'>
                            <Link to="/guess/women/shoes?id=19" className="relative mx-auto flex flex-col justify-center items-center lg:flex-row overflow-hidden bg-[#ffffffe6] rounded-[4px] m-[8px] px-[24px] py-[16px] min-w-[190px] text-center group z-10">
                                <span className="absolute inset-0 bg-white w-0 group-hover:w-full transition-all duration-300 ease-in-out z-0"></span>
                                <span className="relative z-10">Shoes</span>
                            </Link>
                        </div>
                    </div>
                    <div className="relative flex justify-center items-end max-sm:min-w-[240px] max-md:min-w-[530px] lg:flex-1/3">
                        <img className="lg:hidden" src="../../../img_4_mobile.jpg" alt="hero" />
                        <img className="hidden lg:block" src="../../../img_04.jpg" alt="hero" />
                        <div className='absolute mx-auto flex justify-center items-center pb-[25px] overflow-hidden'>
                            <Link to="/guess/women/bags?id=18" className="relative mx-auto flex flex-col justify-center items-center lg:flex-row overflow-hidden bg-[#ffffffe6] rounded-[4px] m-[8px] px-[24px] py-[16px] min-w-[190px] text-center group z-10">
                                <span className="absolute inset-0 bg-white w-0 group-hover:w-full transition-all duration-300 ease-in-out z-0"></span>
                                <span className="relative z-10">Summer bags</span>
                            </Link>
                        </div>
                    </div>
                    <div className="relative flex justify-center items-end max-sm:min-w-[240px] max-md:min-w-[530px] lg:flex-1/3">
                        <img className="lg:hidden" src="../../../img_5_mobile.jpg" alt="hero" />
                        <img className="hidden lg:block" src="../../../img_05.jpg" alt="hero" />
                        <div className='absolute flex justify-center items-center pb-[25px] overflow-hidden'>
                            <Link to="/guess/women/accessories?id=20" className="relative mx-auto flex flex-col justify-center items-center lg:flex-row overflow-hidden bg-[#ffffffe6] rounded-[4px] m-[8px] px-[24px] py-[16px] min-w-[190px] text-center group z-10">
                                <span className="absolute inset-0 bg-white w-0 group-hover:w-full transition-all duration-300 ease-in-out z-0"></span>
                                <span className="relative z-10">Eyewear</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-5 lg:mt-14 lg:mb-6 flex justify-center items-center">
                    <h3 className="mb-4 text-[1.75rem] lg:text-[3rem] font-semibold p-4">Summer Office</h3>
                </div>
                <div className="flex items-center lg:px-6 overflow-x-auto lg:gap-2 w-full">
                    <div className="relative flex justify-center items-end max-sm:min-w-[240px] max-md:min-w-[530px] lg:flex-1/3">
                        <img className="lg:hidden" src="../../../img_06_mobile.jpg" alt="hero" />
                        <img className="hidden lg:block" src="../../../img_06.jpg" alt="hero" />
                        <div className='absolute flex justify-center items-center pb-[25px] overflow-hidden'>
                            <Link to="/guess/women/clothing?id=16" className="relative mx-auto flex flex-col justify-center items-center lg:flex-row overflow-hidden bg-[#ffffffe6] rounded-[4px] m-[8px] px-[24px] py-[16px] min-w-[190px] text-center group z-10">
                                <span className="absolute inset-0 bg-white w-0 group-hover:w-full transition-all duration-300 ease-in-out z-0"></span>
                                <span className="relative z-10">Top & Shirts</span>
                            </Link>
                        </div>
                    </div>
                    <div className="relative flex justify-center items-end max-sm:min-w-[240px] max-md:min-w-[530px] lg:flex-1/3">
                        <img className="lg:hidden" src="../../../img_07_mobile.jpg" alt="hero" />
                        <img className="hidden lg:block" src="../../../img_07.jpg" alt="hero" />
                        <div className='absolute mx-auto flex justify-center items-center pb-[25px] overflow-hidden'>
                            <Link to="/guess/women/sale?id=25" className="relative mx-auto flex flex-col justify-center items-center lg:flex-row overflow-hidden bg-[#ffffffe6] rounded-[4px] m-[8px] px-[24px] py-[16px] min-w-[190px] text-center group z-10">
                                <span className="absolute inset-0 bg-white w-0 group-hover:w-full transition-all duration-300 ease-in-out z-0"></span>
                                <span className="relative z-10">Discover More</span>
                            </Link>
                        </div>
                    </div>
                    <div className="relative flex justify-center items-end max-sm:min-w-[240px] max-md:min-w-[530px] lg:flex-1/3">
                        <img className="lg:hidden" src="../../../img_08_mobile.jpg" alt="hero" />
                        <img className="hidden lg:block" src="../../../img_08.jpg" alt="hero" />
                        <div className='absolute flex justify-center items-center pb-[25px] overflow-hidden'>
                            <Link to="/guess/women/gifts?id=22" className="relative mx-auto flex flex-col justify-center items-center lg:flex-row overflow-hidden bg-[#ffffffe6] rounded-[4px] m-[8px] px-[24px] py-[16px] min-w-[190px] text-center group z-10">
                                <span className="absolute inset-0 bg-white w-0 group-hover:w-full transition-all duration-300 ease-in-out z-0"></span>
                                <span className="relative z-10">Co-ords</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Women