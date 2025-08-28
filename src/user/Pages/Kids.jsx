import Header from '../components/Header'
import Footer from '../components/Footer'
import { useGetAllCategoriesQuery } from '../../strore/guessApi'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

function Kids() {
  const { pathname } = useLocation()
  useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
  }, [pathname])
  const navigate = useNavigate()
  useEffect(() => {document.title = "GUESS® Kids Sale | Enjoy up to 50% off selected items"}, [])
  const { data } = useGetAllCategoriesQuery()
  return (
    <>
      <Header>
          <div className="sticky top-0 bg-white lg:flex p-3 overflow-auto flex-nowrap whitespace-nowrap gap-10 px-[15px] lg:px-[24px] hidden">
              {data?.find(category => category.name === "Kids")?.children?.map(child => (
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
              <p className="text-xl after:underline after:flex after:border after:border-gray-400 px-[12px] mx-[8px] mt-[8px] mb-[16px] lg:mb-0 text-gray-950 cursor-pointer hover:text-black transition duration-100">Girl</p>
              <p className="text-xl after:underline after:flex after:border after:border-gray-400 px-[12px] mx-[8px] mt-[8px] mb-[16px] lg:mb-0 text-gray-950 cursor-pointer hover:text-black transition duration-100">Boy</p>
          </div>
          <span className="lg:absolute lg:bottom-2 lg:right-2 text-sm text-gray-500">info</span>
        </div>
        <div className="flex relative justify-center items-end lg:items-center">
          <video autoPlay={true} loop={true} playsInline={true} muted={true} className='hidden lg:block' src="../../../video_hero_desktop.mp4"></video>
          <video autoPlay={true} loop={true} playsInline={true} muted={true} className='lg:hidden' src="../../../video_hero_mobile.mp4"></video>
          <div className="flex absolute flex-col items-center justify-center p-5 lg:p-0 gap-y-5">
              <span className="text-center text-4xl lg:text-7xl text-white font-bold">VACATION ON</span>
              <div className='mx-auto flex flex-col lg:flex-row justify-center items-center pb-[25px]'>
                  <a href='#' className="relative overflow-hidden border-2 border-[#ffffffe6] text-[#ffffffe6] rounded-[4px] m-[8px] px-[24px] py-[16px] min-w-[190px] text-center group z-10">
                      <span className="absolute inset-0 bg-white w-0 group-hover:w-full transition-all duration-300 ease-in-out z-0"></span>
                      <span className="relative z-10 group-hover:text-black">New in</span>
                  </a>
                  <a href='#' className="relative overflow-hidden border-2 border-[#ffffffe6] text-[#ffffffe6] rounded-[4px] m-[8px] px-[24px] py-[16px] min-w-[190px] text-center group z-10">
                      <span className="absolute inset-0 bg-white w-0 group-hover:w-full transition-all duration-300 ease-in-out z-0"></span>
                      <span className="relative z-10 group-hover:text-black">Clothing</span>
                  </a>
              </div>
          </div>
        </div>
        <div className="flex relative lg:flex-row flex-col justify-center items-end lg:items-start my-4 lg:my-6">
          <div className='flex flex-col justify-center items-center lg:items-end mb-4 lg:m-0'>
            <img className="lg:hidden" src="../../../img_01_kids_mobile.jpg" alt="hero" />
            <img className="hidden lg:block" src="../../../img_01_kids.jpg" alt="hero" />
            <a href="#" className='mx-2 mt-2 mb-4 px-3 pt-4 after:flex after:border after:underline lg:absolute bottom-0 right-30'>Junior Girl</a>
          </div>
          <div className='flex flex-col justify-center items-center lg:items-end px-4 lg:px-0 lg:m-0 mb-4'>
            <img className="lg:hidden" src="../../../img_02_kids_mobile.jpg" alt="hero" />
            <img className="hidden lg:block" src="../../../img_02_kids.jpg" alt="hero" />
            <a href="#" className='mx-2 mt-2 mb-4 px-3 pt-4 after:flex after:border after:underline'>New Born Girl</a>
          </div>
        </div>
        <div className="flex relative lg:flex-row flex-col justify-center items-start lg:items-start mb-4 lg:mb-6">
          <div className='flex flex-col justify-center items-center lg:items-start mb-4 lg:m-0'>
            <img className="lg:hidden" src="../../../img_03_kids_mobile.jpg" alt="hero" />
            <img className="hidden lg:block" src="../../../img_03_kids.jpg" alt="hero" />
            <a href="#" className='mx-2 mt-2 mb-4 px-3 pt-4 after:flex after:border after:underline'>New Born Boy</a>
          </div>
          <div className='flex flex-col justify-center items-center lg:items-start px-4 lg:px-0 lg:m-0 mb-4'>
            <img className="lg:hidden" src="../../../img_04_kids_mobile.jpg" alt="hero" />
            <img className="hidden lg:block" src="../../../img_04_kids.jpg" alt="hero" />
            <a href="#" className='mx-2 mt-2 mb-4 px-3 pt-4 after:flex after:border after:underline lg:absolute lg:left-30 lg:bottom-0'>Junior Boy</a>
          </div>
        </div>
        <div className="mt-5 lg:mt-14 lg:mb-6 flex justify-center items-center">
            <h3 className="mb-4 text-[1.75rem] lg:text-[3rem] font-semibold p-4 text-[#ff0090]">Let's play in the water!</h3>
        </div>
        <div className="flex items-center lg:px-6 overflow-x-auto gap-2 px-4 w-full">
          <div className="flex flex-col justify-center max-sm:min-w-[240px] max-md:min-w-[530px] lg:flex-1/3">
            <img className="lg:hidden" src="../../../img_05_kids_mobile.jpg" alt="hero" />
            <img className="hidden lg:block" src="../../../img_05_kids.jpg" alt="hero" />
            <a href="#" className='border-b border-gray-500 hover:border-black transition duration-100 mx-4 mt-2 mb-4 pt-4 w-max'>Beachwear for Her</a>
          </div>
          <div className="flex flex-col justify-center max-sm:min-w-[240px] max-md:min-w-[530px] lg:flex-1/3">
            <img className="lg:hidden" src="../../../img_06_kids_mobile.jpg" alt="hero" />
            <img className="hidden lg:block" src="../../../img_06_kids.jpg" alt="hero" />
            <a href="#" className='border-b border-gray-500 hover:border-black transition duration-100 mx-4 mt-2 mb-4 pt-4 w-max'>Shop Now</a>
          </div>
          <div className="flex flex-col justify-center max-sm:min-w-[240px] max-md:min-w-[530px] lg:flex-1/3">
            <img className="lg:hidden" src="../../../img_07_kids_mobile.jpg" alt="hero" />
            <img className="hidden lg:block" src="../../../img_07_kids.jpg" alt="hero" />
            <a href="#" className='border-b border-gray-500 hover:border-black transition duration-100 mx-4 mt-2 mb-4 pt-4 w-max'>Beachwear for Him</a>
          </div>
          <div className="flex flex-col justify-center max-sm:min-w-[240px] max-md:min-w-[530px] lg:flex-1/3">
            <img className="lg:hidden" src="../../../img_08_kids_mobile.jpg" alt="hero" />
            <img className="hidden lg:block" src="../../../img_08_kids.jpg" alt="hero" />
            <a href="#" className='border-b border-gray-500 hover:border-black transition duration-100 mx-4 mt-2 mb-4 pt-4 w-max'>Shop Now</a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Kids