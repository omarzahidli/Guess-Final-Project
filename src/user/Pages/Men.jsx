import Header from "../components/Header"
import Footer from "../components/Footer"
import { useGetAllCategoriesQuery } from "../../strore/guessApi"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router"

function Men() {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [pathname])
    useEffect(() => {document.title = "GUESS® Men - Shop the new SS25 Collection now"}, [])
    const { data } = useGetAllCategoriesQuery()
    return (
        <>
            <Header>
                <div className="sticky top-0 bg-white lg:flex p-3 overflow-auto flex-nowrap whitespace-nowrap gap-10 px-[15px] lg:px-[24px] hidden">
                    {data?.find(category => category.name === "Men")?.children?.map(child => (
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
                    <div className="max-sm:w-full justify-center items-center flex flex-nowrap overflow-x-auto gap-10 whitespace-nowrap">
                        <p className="text-xl after:underline after:flex after:border after:border-gray-400 px-[12px] mx-[8px] mt-[8px] mb-[16px] lg:mb-0 text-gray-950 cursor-pointer hover:text-black transition duration-100">Clothing</p>
                        <p className="text-xl after:underline after:flex after:border after:border-gray-400 px-[12px] mx-[8px] mt-[8px] mb-[16px] lg:mb-0 text-gray-950 cursor-pointer hover:text-black transition duration-100">Bags</p>
                    </div>
                    <span className="lg:absolute lg:bottom-2 lg:right-2 text-sm text-gray-500">info</span>
                </div>
                <div className="flex relative justify-center items-end lg:items-center">
                    <img className="lg:hidden" src="../../../hero_men_mobile.jpg" alt="hero" />
                    <img className="hidden lg:block" src="../../../hero_men.jpg" alt="hero" />
                    <div className="flex absolute flex-col items-center justify-center p-5 lg:p-0 gap-y-5">
                        <span className="text-center text-4xl lg:text-7xl text-white font-bold">Tailored to perform</span>
                        <div className='mx-auto flex flex-col lg:flex-row justify-center items-center pb-[25px]'>
                            <a href='#' className="relative overflow-hidden bg-[#ffffffe6] rounded-[4px] m-[8px] px-[24px] py-[16px] min-w-[190px] text-center group z-10">
                                <span className="absolute inset-0 bg-white w-0 group-hover:w-full transition-all duration-300 ease-in-out z-0"></span>
                                <span className="relative z-10">New in</span>
                            </a>
                            <a href='#' className="relative overflow-hidden bg-[#ffffffe6] rounded-[4px] m-[8px] px-[24px] py-[16px] min-w-[190px] text-center group z-10">
                                <span className="absolute inset-0 bg-white w-0 group-hover:w-full transition-all duration-300 ease-in-out z-0"></span>
                                <span className="relative z-10">Clothing</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex lg:flex-row flex-col justify-center items-center container mx-auto my-6 lg:my-16">
                    <div className="relative flex lg:justify-center justify-end items-center lg:items-end flex-col lg:flex-row w-full">
                        <img className="lg:hidden" src="../../../img-02-mobile.jpg" alt="hero" />
                        <img className="hidden lg:block" src="../../../img-02.jpg" alt="hero" />
                        <div className='absolute mx-auto flex flex-col justify-center items-center pb-[25px]'>
                            <span className="text-3xl font-semibold tracking-wider text-white mb-6">Vacation ready</span>
                            <a href='#' className="relative overflow-hidden bg-[#ffffffe6] rounded-[4px] m-[8px] px-[24px] py-[16px] min-w-[190px] text-center group z-10">
                                <span className="absolute inset-0 bg-white w-0 group-hover:w-full transition-all duration-300 ease-in-out z-0"></span>
                                <span className="relative z-10">Weekend escape</span>
                            </a>
                        </div>
                    </div>
                    <div className="relative flex md:justify-center overflow-auto md:items-center lg:flex-col w-full">
                        <div className="flex justify-center items-end flex-1/2">
                            <img className="lg:hidden min-w-[300px] min-h-[300px]" src="../../../img-03-mobile.jpg" alt="hero" />
                            <img className="hidden lg:block" src="../../../img-03.jpg" alt="hero" />
                            <div className='absolute mx-auto flex flex-col lg:flex-row justify-center items-center pb-[25px]'>
                                <a href='#' className="relative overflow-hidden bg-[#ffffffe6] rounded-[4px] m-[8px] px-[24px] py-[16px] min-w-[190px] text-center group z-10">
                                    <span className="absolute inset-0 bg-white w-0 group-hover:w-full transition-all duration-300 ease-in-out z-0"></span>
                                    <span className="relative z-10">Travel bags</span>
                                </a>
                            </div>
                        </div>
                        <div className="relative flex justify-center items-end flex-1/2">
                            <img className="lg:hidden min-w-[300px] min-h-[300px]" src="../../../img-04-mobile.jpg" alt="hero" />
                            <img className="hidden lg:block" src="../../../img-04.jpg" alt="hero" />
                            <div className='absolute mx-auto flex flex-col lg:flex-row justify-center items-center pb-[25px]'>
                                <a href='#' className="relative overflow-hidden bg-[#ffffffe6] rounded-[4px] m-[8px] px-[24px] py-[16px] min-w-[190px] text-center group z-10">
                                    <span className="absolute inset-0 bg-white w-0 group-hover:w-full transition-all duration-300 ease-in-out z-0"></span>
                                    <span className="relative z-10">Discover shoes</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex relative justify-center items-end lg:items-center">
                    <img className="lg:hidden" src="../../../img-05-mobile.jpg" alt="hero" />
                    <img className="hidden lg:block" src="../../../img-05.jpg" alt="hero" />
                    <div className="flex absolute flex-col items-center justify-center p-5 lg:p-0 gap-y-5">
                        <span className="text-center text-4xl lg:text-7xl text-white font-bold">All-day comfort</span>
                        <div className='mx-auto flex flex-col lg:flex-row justify-center items-center pb-[25px]'>
                            <a href='#' className="relative overflow-hidden bg-[#ffffffe6] rounded-[4px] m-[8px] px-[24px] py-[16px] min-w-[190px] text-center group z-10">
                                <span className="absolute inset-0 bg-white w-0 group-hover:w-full transition-all duration-300 ease-in-out z-0"></span>
                                <span className="relative z-10">Shirt Selection</span>
                            </a>
                            <a href='#' className="relative overflow-hidden bg-[#ffffffe6] rounded-[4px] m-[8px] px-[24px] py-[16px] min-w-[190px] text-center group z-10">
                                <span className="absolute inset-0 bg-white w-0 group-hover:w-full transition-all duration-300 ease-in-out z-0"></span>
                                <span className="relative z-10">Shop Pants</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex items-center p-4 lg:p-0 flex-col lg:flex-row w-full">
                    <div className="relative flex justify-center items-end max-sm:min-w-[240px] max-md:min-w-[530px] lg:flex-1/3">
                        <img className="lg:hidden" src="../../../img-06-mobile.jpg" alt="hero" />
                        <img className="hidden lg:block" src="../../../img-06.jpg" alt="hero" />
                        <div className='absolute mx-auto flex justify-center items-center pb-[25px] overflow-hidden'>
                            <a href='#' className="relative mx-auto flex flex-col justify-center items-center lg:flex-row overflow-hidden bg-[#ffffffe6] rounded-[4px] m-[8px] px-[24px] py-[16px] min-w-[190px] text-center group z-10">
                                <span className="absolute inset-0 bg-white w-0 group-hover:w-full transition-all duration-300 ease-in-out z-0"></span>
                                <span className="relative z-10">Denim beyond jeans</span>
                            </a>
                        </div>
                    </div>
                    <div className="relative flex justify-center items-end max-sm:min-w-[240px] max-md:min-w-[530px] pt-4 lg:pt-0 lg:flex-1/3">
                        <img className="lg:hidden" src="../../../img-07-mobile.jpg" alt="hero" />
                        <img className="hidden lg:block" src="../../../img-07.jpg" alt="hero" />
                        <div className='absolute flex justify-center items-center pb-[25px] overflow-hidden'>
                            <a href='#' className="relative mx-auto flex flex-col justify-center items-center lg:flex-row overflow-hidden bg-[#ffffffe6] rounded-[4px] m-[8px] px-[24px] py-[16px] min-w-[190px] text-center group z-10">
                                <span className="absolute inset-0 bg-white w-0 group-hover:w-full transition-all duration-300 ease-in-out z-0"></span>
                                <span className="relative z-10">Denim pants</span>
                            </a>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Men