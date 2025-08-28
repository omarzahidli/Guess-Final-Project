import Header from '../components/Header'
import Footer from '../components/Footer'
import { useEffect } from 'react'
import { Link, useLocation } from 'react-router'

function Home() {
    const { pathname } = useLocation()
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [pathname])
    useEffect(() => {document.title = "GUESS® Sale | Up to 50% off selected items"}, [])
    return (
        <>
            <Header />
            <div className='mb-[16px] lg:mb-[48px] flex flex-col justify-end lg:justify-center items-center w-full'>
                <img className='w-full hidden lg:block' src="../../hero_Guess.avif" alt="hero" />
                <img className='w-full lg:hidden' src="../../hero_Guess_mobile.avif" alt="hero" />
                <div className='absolute mx-auto flex flex-col justify-center items-center pb-[25px]'>
                    <img src="../../Guess-LOGO-WHT.png" className='max-w-[180px] lg:max-w-[260px] mb-[1.5rem]' />
                    <div className='flex flex-wrap justify-center my-[1rem]'>
                        <Link to="/guess/women" className="relative overflow-hidden bg-[#ffffffe6] rounded-[4px] m-[8px] px-[24px] py-[16px] min-w-[190px] text-center group z-10">
                            <span className="absolute inset-0 bg-white w-0 group-hover:w-full transition-all duration-300 ease-in-out z-0"></span>
                            <span className="relative z-10">For Her</span>
                        </Link>
                        <Link to="/guess/men" className="relative overflow-hidden bg-[#ffffffe6] rounded-[4px] m-[8px] px-[24px] py-[16px] min-w-[190px] text-center group z-10">
                            <span className="absolute inset-0 bg-white w-0 group-hover:w-full transition-all duration-300 ease-in-out z-0"></span>
                            <span className="relative z-10">For Him</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='mb-[16px] lg:mb-[48px] flex flex-col lg:flex-row lg:px-[24px]'>
                <div className='mb-[16px] lg:mb-[48px] lg:mx-[24px] flex flex-col justify-end items-center w-full group/image'>
                <div className='overflow-hidden'>
                    <img className='hidden lg:block group-hover/image:scale-[1.05] transition duration-700' src="../../img_Marciano.avif" alt="hero2" />
                    <img className='w-full lg:hidden group-hover/image:scale-[1.05] transition duration-700' src="../../img_Marciano_mobile.avif" alt="hero2" />
                </div>
                     <div className='absolute mx-auto flex flex-col justify-center items-center pb-[25px]'>
                        <img src="../../MarcianoByGuess-LOGO-WHT.png" className='max-w-[180px] lg:max-w-[260px] mb-[1.5rem] group-hover/image:scale-[1.05] transition duration-700' />
                        <Link to="/guess/women" className="relative overflow-hidden bg-[#ffffffe6] rounded-[4px] m-[8px] px-[24px] py-[16px] min-w-[190px] text-center group z-10">
                            <span className="absolute inset-0 bg-white w-0 group-hover:w-full transition-all duration-300 ease-in-out z-0"></span>
                            <span className="relative z-10">Discover More</span>
                        </Link>
                     </div>
                </div>
                <div className='lg:mb-[48px] lg:mx-[24px] flex flex-col justify-end items-center w-full group/image'>
                    <div className='overflow-hidden'>
                        <img className='hidden lg:block group-hover/image:scale-[1.05] transition duration-700' src="../../img_Kids.avif" alt="hero3" />
                        <img className='w-full lg:hidden group-hover/image:scale-[1.05] transition duration-700' src="../../img_Kids_mobile.avif" alt="hero3" />
                    </div>
                     <div className='absolute mx-auto flex flex-col justify-center items-center pb-[25px]'>
                        <img src="../../GuessKids-LOGO-WHT.png" className='max-w-[180px] lg:max-w-[260px] mb-[1.5rem] group-hover/image:scale-[1.05] transition duration-700' />
                        <Link to="/guess/kids" className="relative overflow-hidden bg-[#ffffffe6] rounded-[4px] m-[8px] px-[24px] py-[16px] min-w-[190px] text-center group z-10">
                            <span className="absolute inset-0 bg-white w-0 group-hover:w-full transition-all duration-300 ease-in-out z-0"></span>
                            <span className="relative z-10">Discover More</span>
                        </Link>
                     </div>
                </div>
            </div>
            <div className='mb-[16px] lg:mb-[48px] flex flex-col lg:flex-row lg:px-[24px]'>
                <div className='mb-[16px] lg:mb-[48px] lg:mx-[24px] flex flex-col justify-end items-center w-full group/image'>
                <div className='overflow-hidden'>
                    <img className='hidden lg:block group-hover/image:scale-[1.05] transition duration-700' src="../../img_GuessJeans.avif" alt="hero2" />
                    <img className='w-full lg:hidden group-hover/image:scale-[1.05] transition duration-700' src="../../img_GuessJeans_mobile.avif" alt="hero2" />
                </div>
                     <div className='absolute mx-auto flex flex-col justify-center items-center pb-[25px]'>
                        <img src="../../GuessJeans-LOGO-WHT.png" className='max-w-[180px] lg:max-w-[260px] mb-[1.5rem] group-hover/image:scale-[1.05] transition duration-700' />
                        <Link to="/guess/women/jeans?id=15" className="relative overflow-hidden bg-[#ffffffe6] rounded-[4px] m-[8px] px-[24px] py-[16px] min-w-[190px] text-center group z-10">
                            <span className="absolute inset-0 bg-white w-0 group-hover:w-full transition-all duration-300 ease-in-out z-0"></span>
                            <span className="relative z-10">Discover More</span>
                        </Link>
                     </div>
                </div>
                <div className='mb-[16px] lg:mb-[48px] lg:mx-[24px] flex flex-col justify-end items-center w-full group/image'>
                    <div className='overflow-hidden'>
                        <img className='hidden lg:block group-hover/image:scale-[1.05] transition duration-700' src="../../img_GuessOriginals.avif" alt="hero3" />
                        <img className='w-full lg:hidden group-hover/image:scale-[1.05] transition duration-700' src="../../img_GuessOriginals_mobile.avif" alt="hero3" />
                    </div>
                     <div className='absolute mx-auto flex flex-col justify-center items-center pb-[25px]'>
                        <img src="../../GuessOriginals-LOGO-WHT.png" className='max-w-[180px] lg:max-w-[260px] group-hover/image:scale-[1.05] transition duration-700' />
                        <a href='#' className="relative overflow-hidden bg-[#ffffffe6] rounded-[4px] m-[8px] px-[24px] py-[16px] min-w-[190px] text-center group z-10">
                            <span className="absolute inset-0 bg-white w-0 group-hover:w-full transition-all duration-300 ease-in-out z-0"></span>
                            <span className="relative z-10">Discover More</span>
                        </a>
                     </div>
                </div>
                <div className='lg:mb-[48px] lg:mx-[24px] flex flex-col justify-end items-center w-full group/image'>
                    <div className='overflow-hidden'>
                        <img className='hidden lg:block group-hover/image:scale-[1.05] transition duration-700' src="../../img_GuessUSA.jpeg" alt="hero3" />
                        <img className='w-full lg:hidden group-hover/image:scale-[1.05] transition duration-700' src="../../img_GuessUSA_mobile.avif" alt="hero3" />
                    </div>
                     <div className='absolute mx-auto flex flex-col justify-center items-center pb-[25px]'>
                        <img src="../../GuessUsa-LOGO-WHT.png" className='max-w-[180px] lg:max-w-[260px] mb-[1.5rem] group-hover/image:scale-[1.05] transition duration-700' />
                        <Link to="/guess/women/newin?id=14" className="relative overflow-hidden bg-[#ffffffe6] rounded-[4px] m-[8px] px-[24px] py-[16px] min-w-[190px] text-center group z-10">
                            <span className="absolute inset-0 bg-white w-0 group-hover:w-full transition-all duration-300 ease-in-out z-0"></span>
                            <span className="relative z-10">Discover More</span>
                        </Link>
                     </div>
                </div>
            </div>
            <div className='flex flex-col lg:flex-row lg:px-[24px]'>
                <div className='mb-[16px] lg:mb-[48px] lg:mx-[24px] flex flex-col lg:flex-row justify-end lg:justify-center items-center w-full group/image'>
                    <div className='overflow-hidden'>
                        <img className='w-full hidden lg:block group-hover/image:scale-[1.05] transition duration-700' src="../../img_GuessHome.avif" alt="hero" />
                        <img className='w-full lg:hidden group-hover/image:scale-[1.05] transition duration-700' src="../../img_GuessHome_mobile.avif" alt="hero" />
                    </div>
                    <div className='absolute mx-auto flex flex-col lg:flex-row justify-center items-center pb-[25px] lg:pb-0 text-center gap-5'>
                        <h3 className="text-4xl font-bold lg:text-7xl text-white">Home collection</h3>
                        <Link to="/guess/home" className="relative overflow-hidden bg-[#ffffffe6] rounded-[4px] m-[8px] px-[24px] py-[16px] min-w-[190px] text-center group z-10">
                            <span className="absolute inset-0 bg-white w-0 group-hover:w-full transition-all duration-300 ease-in-out z-0"></span>
                            <span className="relative z-10">Discover More</span>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home