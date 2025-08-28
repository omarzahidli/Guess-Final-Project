import Header from "../components/Header"
import Footer from "../components/Footer"
import { useGetAllCategoriesQuery } from "../../strore/guessApi"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router"

function Home() {
  const { pathname } = useLocation()
  useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
  }, [pathname])
  useEffect(() => {document.title = "Home | GUESS Official Online Store"}, [])
  const { data } = useGetAllCategoriesQuery()
  const navigate = useNavigate()
  return (
    <>
      <Header>
        <div className="sticky top-0 bg-white lg:flex p-3 overflow-auto flex-nowrap whitespace-nowrap gap-10 px-[15px] lg:px-[24px] hidden">
            {data?.find(category => category.name === "Home")?.children?.map(child => (
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
            <p className="text-xl after:underline after:flex after:border after:border-gray-400 px-[12px] mx-[8px] mt-[8px] mb-[16px] lg:mb-0 text-gray-950 cursor-pointer hover:text-black transition duration-100">Shop all</p>
          </div>
          <span className="lg:absolute lg:bottom-2 lg:right-2 text-sm text-gray-500">info</span>
        </div>
        <div className="flex relative justify-center items-end">
          <img className="lg:hidden" src="../../../hero_home_mobile.jpg" alt="hero" />
          <img className="hidden lg:block" src="../../../hero_home.jpg" alt="hero" />
          <div className="flex absolute flex-col items-center justify-center p-5 lg:p-0 gap-y-5">
            <span className="text-center text-4xl lg:text-5xl tracking-wide text-white">A balance of harmony and elegance</span>
            <div className='mx-auto flex flex-col lg:flex-row justify-center items-center pb-[25px]'>
              <a href='#' className="relative overflow-hidden border-2 border-[#ffffffe6] text-[#ffffffe6] rounded-[4px] m-[8px] px-[24px] py-[16px] min-w-[190px] text-center group z-10">
                <span className="absolute inset-0 bg-white w-0 group-hover:w-full transition-all duration-300 ease-in-out z-0"></span>
                <span className="relative z-10 group-hover:text-black">BLANKETS</span>
              </a>
              <a href='#' className="relative overflow-hidden border-2 border-[#ffffffe6] text-[#ffffffe6] rounded-[4px] m-[8px] px-[24px] py-[16px] min-w-[190px] text-center group z-10">
                <span className="absolute inset-0 bg-white w-0 group-hover:w-full transition-all duration-300 ease-in-out z-0"></span>
                <span className="relative z-10 group-hover:text-black">FURNISHING</span>
              </a>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-5 lg:mt-12 lg:mb-4">
          <div className="w-60 flex items-center justify-center h-60">
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  viewBox="0 0 185.8 66.4" xmlSpace="preserve">
              <g>
                <path className="st0" d="M22.8,20.8l0.6,0c2.4,0.1,3.2,0.6,3.5,0.8c0.2,0.2,0.7,0.8,0.7,3.4v8.6c0,0.4-0.1,0.7-0.3,0.9
                c-0.1,0.1-0.5,0.4-2.1,0.9c-0.7,0.2-1.5,0.4-2.4,0.5c-0.8,0.1-1.6,0.2-2.2,0.2c-3.6,0-6.7-1.3-9.2-4C8.9,29.5,7.6,25.8,7.6,21
                c0-5.8,1.3-10,3.7-12.5c2.5-2.5,5.4-3.7,8.6-3.7c3.2,0,5.8,1,7.8,3.1c1.1,1.2,2.2,3.1,3.3,5.6l0.2,0.4h2.3L33.1,1.4h-2.2l-0.2,0.4
                c-0.2,0.5-0.4,0.8-0.7,1.1c-0.1,0.1-0.4,0.3-1.2,0.3c-0.1,0-0.6-0.1-3.3-0.8c-2.1-0.6-4.2-0.9-6.3-0.9c-5.9,0-10.7,2.1-14.3,6.1
                C1.7,11.2,0,15.7,0,20.8c0,5.9,2.1,10.6,6.2,14.1c3.7,3.1,8.3,4.7,13.7,4.7c2.9,0,6-0.5,9.1-1.6c4.2-1.4,5.1-2.3,5.1-3.1V24.3
                c0-1.5,0.3-2.5,0.9-3c0.2-0.1,0.7-0.4,2.3-0.5l0.6,0v-2.2h-15V20.8z"/>
                <path className="st0" d="M67,4.3l0.6,0.1c1.8,0.2,3,0.6,3.6,1.2c0.3,0.3,0.9,1.5,0.9,5v14c0,3.3-0.4,5.8-1.2,7.3
                c-1.4,2.7-4.1,4.1-8.3,4.1c-3.8,0-6.2-1.3-7.6-3.9c-0.7-1.5-1.1-3.6-1.1-6.3V8.5c0-2.3,0.4-3.1,0.7-3.3c0.3-0.3,1.1-0.7,3.6-0.9
                l0.6,0V2H42.3v2.2l0.6,0c2.5,0.2,3.3,0.6,3.6,0.9c0.3,0.2,0.7,1,0.7,3.3v16.8c0,3.4,0.6,6.2,1.8,8.3c2.2,4,6.4,6,12.4,6
                c6.1,0,10.3-2,12.5-6.1c1.2-2.2,1.8-5.2,1.8-9v-14c0-3.5,0.5-4.6,0.8-5c0.4-0.4,1.3-1,3.6-1.3l0.6-0.1V2H67V4.3z"/>
                <path className="st0" d="M116.8,28.9c-1.3,2.9-2.8,4.7-4.4,5.5c-1.6,0.8-4.3,1.1-7.8,1.1c-4.1,0-5.5-0.1-5.9-0.3
                c-0.1,0-0.5-0.2-0.5-1.3V21.3h7.6c2.7,0,3.6,0.5,3.9,0.8c0.4,0.4,0.9,1.4,1.4,3.8l0.1,0.5h2.4V12.7h-2.4l-0.1,0.5
                c-0.4,2.4-1,3.4-1.4,3.8c-0.3,0.3-1.2,0.8-3.9,0.8h-7.6V6.5c0-0.8,0.1-1,0.1-1c0,0,0.2-0.1,1-0.1h7.3c3.7,0,5.1,0.5,5.7,0.9
                c0.5,0.4,1.3,1.5,1.8,4.2l0.1,0.5h2.6l-0.2-9H86.8v2.2l0.6,0c2.4,0.2,3.2,0.6,3.4,0.9c0.3,0.3,0.7,1,0.7,3.3v23.9
                c0,2.5-0.5,3.1-0.6,3.3c-0.3,0.2-1.1,0.7-3.5,0.9l-0.6,0.1v2.2H117l2.8-10.4H117L116.8,28.9z"/>
                <path className="st0" d="M143.8,18l-4.7-2.9c-1.7-1-3-2-3.7-3c-0.7-0.9-1.1-1.9-1.1-3.1c0-1.3,0.5-2.4,1.4-3.1c1-0.8,2.1-1.2,3.4-1.2
                c1.7,0,3.5,0.6,5.4,1.9c1.8,1.3,3.1,3.6,4,6.8l0.1,0.5h2.5l-1.3-12.7h-2.2l-0.1,0.5c-0.1,0.5-0.3,0.8-0.5,1.1
                c-0.1,0.1-0.4,0.2-0.9,0.2c-0.1,0-0.5-0.1-2.8-0.9c-1.8-0.6-3.3-0.9-4.6-0.9c-3.1,0-5.7,1-7.6,2.9c-1.9,1.9-2.9,4.3-2.9,7.2
                c0,2.2,0.8,4.2,2.5,6c0.9,0.9,2,1.9,3.4,2.8l4.6,2.9c2.6,1.6,4.3,2.8,5.1,3.6c1.1,1.2,1.7,2.5,1.7,4.1c0,1.8-0.5,3.1-1.6,4
                c-1.1,1-2.5,1.5-4,1.5c-3,0-5.4-1.2-7.4-3.5c-1.2-1.4-2.2-3.2-3.1-5.6l-0.2-0.4h-2.4l1.8,12.7h2.3l0.1-0.5c0.1-0.4,0.2-0.7,0.4-1
                c0.1-0.2,0.3-0.2,0.7-0.3c0.1,0,0.6,0.1,2.9,0.9c1.9,0.7,3.7,1,5.4,1c3.4,0,6.3-1,8.6-3c2.3-2,3.4-4.5,3.4-7.5
                c0-2.2-0.6-4.2-1.9-5.9C149,21.6,146.8,19.9,143.8,18"/>
                <path className="st0" d="M183.8,23.2c-1.3-1.6-3.4-3.3-6.4-5.2l-4.7-2.9c-1.7-1-3-2-3.7-3c-0.7-0.9-1.1-1.9-1.1-3.1
                c0-1.3,0.5-2.4,1.4-3.1c1-0.8,2.1-1.2,3.4-1.2c1.7,0,3.5,0.6,5.4,1.9c1.8,1.3,3.1,3.6,4,6.8l0.1,0.5h2.5l-1.3-12.7h-2.2L181,1.8
                c-0.1,0.5-0.3,0.8-0.5,1.1c-0.1,0.1-0.4,0.2-0.9,0.2c-0.1,0-0.5-0.1-2.8-0.9c-1.8-0.6-3.3-0.9-4.6-0.9c-3.1,0-5.7,1-7.6,2.9
                c-1.9,1.9-2.9,4.3-2.9,7.2c0,2.2,0.8,4.2,2.5,6c0.9,0.9,2,1.9,3.4,2.8l4.6,2.9c2.6,1.6,4.3,2.8,5.1,3.6c1.1,1.2,1.7,2.5,1.7,4.1
                c0,1.8-0.5,3.1-1.7,4c-1.1,1-2.4,1.5-4,1.5c-3,0-5.4-1.2-7.4-3.5c-1.2-1.4-2.2-3.2-3.1-5.6l-0.2-0.4h-2.4l1.8,12.7h2.3l0.1-0.5
                c0.1-0.4,0.2-0.7,0.4-1c0.1-0.2,0.3-0.2,0.7-0.3c0.1,0,0.6,0.1,2.9,0.9c1.9,0.7,3.7,1,5.4,1c3.5,0,6.3-1,8.6-3
                c2.3-2,3.4-4.5,3.4-7.5C185.8,26.8,185.1,24.8,183.8,23.2"/>
                <path className="st0" d="M127.5,56.6c-0.6,1.1-1.4,2.1-2.3,3.1s-1.9,1.9-2.8,2.7c-1,0.8-2,1.4-2.9,1.9c-1,0.5-1.8,0.7-2.5,0.7
                c-0.3,0-0.6-0.1-0.8-0.2s-0.4-0.3-0.5-0.5c-0.1-0.2-0.2-0.4-0.3-0.7c-0.1-0.2-0.1-0.5-0.1-0.8c0-0.5,0.1-1.1,0.2-1.6
                c0.2-0.5,0.3-1,0.6-1.5c0.7-0.2,1.5-0.4,2.5-0.7c0.9-0.3,1.8-0.7,2.6-1.1c0.8-0.4,1.5-0.8,2.1-1.3c0.6-0.5,0.8-1,0.8-1.5
                c0-0.4-0.2-0.8-0.5-1c-0.3-0.2-0.7-0.3-1.3-0.3c-1,0-2,0.3-3,0.9c-1,0.5-1.9,1.2-2.7,2l0,0c0,0,0,0,0,0c0,0-0.1,0.1-0.1,0.1
                c-0.8,0.8-1.5,1.7-2,2.6c-0.2,0.2-0.3,0.4-0.5,0.6c-0.9,1-1.7,1.9-2.5,2.6c-0.8,0.7-1.6,1.3-2.3,1.7c-0.7,0.4-1.3,0.6-1.8,0.6
                c-0.2,0-0.4-0.1-0.6-0.2c-0.2-0.2-0.2-0.4-0.2-0.6c0-0.3,0.1-0.7,0.4-1.1c0.2-0.4,0.6-0.9,0.9-1.4c0.4-0.5,0.8-1.1,1.2-1.6
                c0.4-0.6,0.8-1.1,1.2-1.7c0.4-0.6,0.7-1.1,0.9-1.6c0.2-0.5,0.4-0.9,0.4-1.3c0-0.5-0.2-1-0.5-1.3c-0.3-0.3-0.8-0.5-1.4-0.5
                c-0.7,0-1.5,0.2-2.2,0.6c-0.8,0.4-1.5,1-2.2,1.6c-0.7,0.6-1.4,1.3-2,2.1c-0.6,0.7-1.2,1.4-1.6,2.1l-0.1-0.1c0.2-0.3,0.4-0.6,0.7-1
                c0.3-0.4,0.6-0.8,0.9-1.3c0.3-0.4,0.5-0.9,0.8-1.3c0.2-0.4,0.3-0.8,0.3-1.1c0-0.5-0.2-0.9-0.5-1.2c-0.3-0.3-0.8-0.4-1.3-0.4
                c-0.8,0-1.7,0.2-2.5,0.7c-0.8,0.5-1.5,1-2.2,1.7c-0.7,0.7-1.3,1.4-1.9,2.1c-0.6,0.7-1.1,1.3-1.5,1.8L94.1,60l4.3-6h-2
                c-0.5,0.8-1.1,1.7-1.7,2.7c-0.2,0.3-0.3,0.5-0.5,0.8c-0.3,0.2-0.5,0.4-0.8,0.5c-0.6,0.3-1.2,0.5-1.8,0.5c-0.7,0-1.3-0.2-1.7-0.6
                c-0.4-0.4-0.7-0.9-0.7-1.4c0-0.8-0.3-1.5-0.8-2c-0.5-0.5-1.2-0.8-2.1-0.8c-0.8,0-1.5,0.1-2.2,0.4c-0.7,0.3-1.5,0.7-2.1,1.2
                c-0.7,0.5-1.3,1-1.9,1.7c-0.6,0.6-1.1,1.2-1.5,1.9c-0.4,0.6-0.7,1.1-0.9,1.7c-0.3,0.3-0.6,0.7-1,1c-0.6,0.6-1.3,1.2-1.9,1.7
                c-0.6,0.5-1.3,0.9-1.8,1.2c-0.6,0.3-1.1,0.5-1.6,0.5c-0.2,0-0.4-0.1-0.6-0.2c-0.1-0.2-0.2-0.4-0.2-0.6c0-0.3,0.1-0.7,0.4-1.1
                c0.2-0.4,0.6-0.9,0.9-1.4c0.4-0.5,0.8-1,1.2-1.6c0.4-0.5,0.8-1.1,1.2-1.6c0.4-0.5,0.7-1,0.9-1.5c0.2-0.5,0.4-0.9,0.4-1.2
                c0-1.3-0.7-2-2-2c-0.8,0-1.5,0.2-2.3,0.6c-0.8,0.4-1.5,1-2.2,1.6c-0.7,0.6-1.3,1.3-1.9,2c-0.6,0.7-1.1,1.3-1.5,1.9l-0.1-0.1
                l11.5-17L75,42.8c-1.1,1.7-2.2,3.4-3.4,5.3c-1.2,1.8-2.4,3.7-3.6,5.6c-1.2,1.9-2.5,3.8-3.7,5.7c-1.3,1.9-2.5,3.8-3.7,5.7h2.1
                c0.3-0.5,0.6-1.1,1.1-1.9c0.5-0.7,1-1.5,1.6-2.3c0.6-0.8,1.3-1.6,2-2.4c0.7-0.8,1.4-1.5,2.1-2.2c0.7-0.6,1.4-1.2,2-1.6
                c0.7-0.4,1.3-0.6,1.8-0.6c0.3,0,0.5,0.1,0.7,0.2c0.2,0.1,0.3,0.4,0.3,0.7c0,0.3-0.1,0.6-0.4,1c-0.2,0.4-0.6,0.8-0.9,1.3
                c-0.4,0.5-0.8,1-1.2,1.5c-0.4,0.5-0.8,1.1-1.2,1.6c-0.4,0.5-0.7,1.1-0.9,1.6c-0.2,0.5-0.4,1-0.4,1.4c0,0.6,0.2,1.1,0.5,1.4
                c0.4,0.3,0.8,0.5,1.4,0.5c0.5,0,1.1-0.2,1.7-0.5c0.6-0.3,1.3-0.7,1.9-1.2c0.6-0.5,1.3-1.1,1.9-1.7c0.3-0.3,0.5-0.5,0.8-0.8
                c-0.1,0.4-0.2,0.9-0.2,1.2c0,0.9,0.2,1.6,0.7,2.2c0.5,0.5,1.2,0.8,2.1,0.8c1,0,2-0.3,3-0.8c1-0.5,1.9-1.2,2.7-1.9
                c0.8-0.8,1.5-1.6,2.1-2.6c0.6-0.9,1-1.8,1.2-2.6h0.1c0.2,0.4,0.6,0.7,1,1c0.4,0.3,0.9,0.4,1.6,0.4c0.6,0,1.3-0.2,1.9-0.5
                c0.1-0.1,0.2-0.1,0.3-0.2c-0.3,0.5-0.6,1-0.9,1.5c-0.6,1-1.3,1.9-1.9,2.9c-0.6,1-1.2,1.8-1.6,2.6h2.1c0.3-0.5,0.6-1.2,1.1-1.9
                c0.5-0.7,1-1.5,1.6-2.3c0.6-0.8,1.2-1.6,1.9-2.4c0.7-0.8,1.3-1.5,2-2.2c0.7-0.6,1.4-1.2,2-1.6c0.7-0.4,1.3-0.6,1.8-0.6
                c0.6,0,0.9,0.3,0.9,0.9c0,0.3-0.2,0.8-0.6,1.5c-0.4,0.7-0.9,1.5-1.5,2.4c-0.6,0.9-1.3,1.9-2,3c-0.7,1.1-1.4,2.2-2,3.2h2.1
                c0.4-0.9,0.9-1.8,1.5-2.7c0.6-0.9,1.2-1.7,1.8-2.6c0.6-0.8,1.3-1.6,2-2.3c0.7-0.7,1.3-1.3,2-1.8c0.6-0.5,1.2-0.9,1.8-1.2
                c0.6-0.3,1.1-0.4,1.5-0.4c0.2,0,0.4,0.1,0.6,0.2c0.2,0.1,0.2,0.3,0.2,0.6c0,0.3-0.1,0.6-0.4,1c-0.2,0.4-0.6,0.9-0.9,1.4
                c-0.4,0.5-0.8,1-1.2,1.6c-0.4,0.5-0.8,1.1-1.2,1.6c-0.4,0.5-0.7,1.1-0.9,1.6c-0.2,0.5-0.4,1-0.4,1.4c0,0.6,0.2,1,0.5,1.4
                c0.3,0.4,0.8,0.6,1.5,0.6c0.6,0,1.4-0.2,2.1-0.7c0.8-0.4,1.6-1.1,2.4-1.8c0.7-0.7,1.5-1.5,2.2-2.3c-0.3,0.7-0.5,1.5-0.5,2.1
                c0,0.9,0.2,1.5,0.7,2c0.5,0.5,1.2,0.7,2.1,0.7c0.7,0,1.5-0.1,2.2-0.4c0.8-0.3,1.5-0.6,2.3-1.1c0.8-0.5,1.5-1,2.2-1.6
                c0.7-0.6,1.4-1.2,2-1.8c0.6-0.6,1.2-1.3,1.7-1.9c0.5-0.6,0.9-1.2,1.2-1.8L127.5,56.6z M87.1,57.5c-0.2,0.7-0.5,1.3-0.8,2
                c-0.3,0.7-0.7,1.4-1.2,2c-0.5,0.6-0.9,1.2-1.5,1.7c-0.5,0.5-1.1,0.9-1.7,1.2c-0.6,0.3-1.2,0.5-1.7,0.5c-0.4,0-0.8-0.2-1-0.5
                c-0.2-0.3-0.3-0.8-0.3-1.3c0-0.6,0.1-1.2,0.3-1.9c0.2-0.7,0.5-1.3,0.9-2c0.4-0.7,0.8-1.3,1.3-1.9c0.5-0.6,1-1.2,1.5-1.7
                c0.5-0.5,1.1-0.9,1.6-1.2c0.5-0.3,1-0.4,1.5-0.4c0.5,0,0.8,0.2,1.1,0.5c0.2,0.3,0.3,0.7,0.3,1.1C87.4,56.3,87.3,56.9,87.1,57.5z
                  M118.7,56c0.5-0.5,1-1,1.6-1.3c0.5-0.4,1-0.5,1.5-0.5c0.2,0,0.4,0.1,0.6,0.2c0.2,0.2,0.2,0.4,0.2,0.7c0,0.6-0.2,1.1-0.7,1.6
                c-0.5,0.5-1,0.9-1.7,1.3c-0.7,0.4-1.3,0.7-2.1,0.9c-0.7,0.2-1.3,0.4-1.8,0.5c0.2-0.5,0.5-1,1-1.6C117.7,57.1,118.1,56.5,118.7,56z"
                />
              </g>
            </svg>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center px-4 lg:px-40 w-full">
          <div className="relative flex flex-col justify-center items-center group">
            <img className="lg:hidden" src="../../../img_03_home_mobile.jpg" alt="hero" />
            <img className="hidden lg:block" src="../../../img_03_home.jpg" alt="hero" />
            <span className="absolute inset-0 bg-[#ad947e80] w-0 group-hover:w-full transition-all duration-500 ease-in-out z-0"></span>
            <div className='absolute mx-auto flex flex-col lg:flex-row justify-center items-center pb-[25px]'>
              <a href='#' className="relative opacity-0 group-hover:opacity-100 overflow-hidden border-2 border-[#ffffffe6] text-[#ffffffe6] rounded-[4px] m-[8px] px-[24px] py-[16px] min-w-[190px] text-center group/button z-10">
                <span className="absolute inset-0 bg-white w-0 group-hover/button:w-full transition-all duration-300 ease-in-out z-0"></span>
                <span className="relative z-10 group-hover/button:text-black">SHOP NOW</span>
              </a>
            </div>
            <div className="flex lg:hidden justify-center items-center relative bg-[#e2d8c2] w-full p-4">
              <a href='#' className="border-2 rounded-[4px] m-[8px] px-[24px] py-[16px] min-w-[190px] text-center">
                <span className="relative z-10">SHOP NOW</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mb-5 mt-15 p-4 flex justify-center items-center text-center">
          <h3 className="mb-2 mt-4 text-3xl lg:text-4xl tracking-wide">The most popular</h3>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center px-4 lg:px-40 w-full">
          <div className="relative flex flex-col lg:flex-row justify-end items-center group overflow-hidden">
            <img className="lg:hidden" src="../../../img_07_home_mobile.jpg" alt="hero" />
            <img className="hidden lg:block group-hover:scale-[1.05] transition duration-500" src="../../../img_07_home.jpg" alt="hero" />
            <div className='absolute hidden lg:flex flex-col flex-wrap justify-center items-center ms-100 mx-10 max-w-120 text-center'>
              <h4 className="text-3xl mt-4 mb-2">A Fourth Decade of Guess? Images Book</h4>
              <p className="mb-2 text-sm leading-7 font-semibold">A work brimming with insider shots and commentary: the perfect addition to any fashion photography collectors' coffee table</p>
              <a href='#' className="relative border-2 rounded-[4px] m-[8px] px-[24px] py-[16px] max-w-[150px] text-center group/button">
                <span className="absolute inset-0 bg-black w-0 group-hover/button:w-full transition-all duration-300 ease-in-out z-0"></span>
                <span className="relative transition duration-300 group-hover/button:text-white z-10">SHOP NOW</span>
              </a>
            </div>
            <div className="flex flex-col lg:hidden justify-center items-center relative bg-[#ebd9d0] w-full p-4">
              <div className="text-center">
                <h4 className="text-2xl mt-4 mb-2">A Fourth Decade of Guess? Images Book</h4>
                <p className="mb-2 text-sm leading-7 font-semibold">A work brimming with insider shots and commentary: the perfect addition to any fashion photography collectors' coffee table</p>
              </div>
              <a href='#' className="border-2 rounded-[4px] m-[8px] px-[24px] py-[16px] min-w-[190px] text-center">
                <span>SHOP NOW</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mb-5 mt-15 p-4 flex justify-center items-center text-center">
          <h3 className="mb-2 mt-4 text-3xl lg:text-4xl tracking-wide">The best for your best friend</h3>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center lg:px-40 w-full">
          <div className="relative flex flex-col justify-center items-center group">
            <img className="lg:hidden" src="../../../img_12_home_mobile.jpg" alt="hero" />
            <img className="hidden lg:block" src="../../../img_12_home.jpg" alt="hero" />
            <span className="absolute inset-0 bg-[#ad947e80] w-0 group-hover:w-full transition-all duration-500 ease-in-out z-0"></span>
            <div className='absolute mx-auto flex flex-col lg:flex-row justify-center items-center pb-[25px]'>
              <a href='#' className="relative opacity-0 group-hover:opacity-100 overflow-hidden border-2 border-[#ffffffe6] text-[#ffffffe6] rounded-[4px] m-[8px] px-[24px] py-[16px] min-w-[190px] text-center group/button z-10">
                <span className="absolute inset-0 bg-white w-0 group-hover/button:w-full transition-all duration-300 ease-in-out z-0"></span>
                <span className="relative z-10 group-hover/button:text-black">PET ACCESSORIES</span>
              </a>
            </div>
            <div className="flex lg:hidden justify-center items-center relative bg-[#C65044] w-full p-4">
              <a href='#' className="border-2 border-white rounded-[4px] m-[8px] px-[24px] py-[16px] min-w-[190px] text-center">
                <span className="relative z-10 text-white">PET ACCESSORIES</span>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Home