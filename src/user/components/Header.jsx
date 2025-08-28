import { ChevronRight, Heart, Home, Loader2, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { useGetAllCategoriesQuery, useGetBasketQuery } from "../../strore/guessApi";

export default function Header({children}) {
    const location = useLocation()
    const { data } = useGetAllCategoriesQuery()
    let logo =  <svg className="min-w-[110px] lg:w-[140px]" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 337.9 69.8" >
                    <g>
                        <path d="M41.8,35.7l1.1,0.1c4.3,0.3,5.8,1,6.3,1.4c0.4,0.3,1.2,1.5,1.2,6.2v15.5c0,0.7-0.2,1.3-0.5,1.6c-0.2,0.2-1,0.7-3.9,1.7
                            c-1.4,0.5-2.8,0.8-4.3,1c-1.5,0.2-2.9,0.3-4,0.3c-6.6,0-12.2-2.4-16.7-7.2c-4.5-4.8-6.8-11.6-6.8-20.2c0-10.5,2.3-18.1,6.8-22.6
                            c4.5-4.5,9.8-6.8,15.7-6.8c5.9,0,10.5,1.9,14.1,5.7c2,2.2,4,5.7,6,10.2l0.3,0.7h4.2L60.5,0.5h-4.1l-0.3,0.7
                            c-0.3,0.8-0.8,1.5-1.2,1.9c-0.2,0.2-0.8,0.5-2.2,0.5c-0.2,0-1.1-0.1-6-1.5C43.1,1,39.2,0.5,35.3,0.5c-10.7,0-19.5,3.7-26,11.1
                            c-5.9,6.7-8.9,14.8-8.9,24.1c0,10.6,3.8,19.2,11.2,25.6c6.7,5.7,15.1,8.6,24.9,8.6c5.3,0,10.8-1,16.5-2.9c7.6-2.6,9.2-4.2,9.2-5.7
                            V42.1c0-2.7,0.5-4.6,1.6-5.4c0.3-0.3,1.3-0.7,4.2-0.9l1.1-0.1v-4.1H41.8V35.7z"></path>
                        <path d="M122.1,5.7l1.1,0.1c3.2,0.3,5.4,1.1,6.5,2.2c0.6,0.6,1.6,2.7,1.6,9.2v25.4c0,6-0.7,10.5-2.2,13.3c-2.5,5-7.4,7.4-15,7.4
                            c-6.8,0-11.3-2.3-13.8-7.1c-1.3-2.7-2-6.5-2-11.4V13.3c0-4.2,0.8-5.6,1.3-6c0.5-0.5,2-1.3,6.6-1.6l1.1-0.1V1.6h-30v4.1l1.1,0.1
                            c4.5,0.3,6,1.2,6.5,1.6c0.5,0.4,1.3,1.8,1.3,6v30.5c0,6.2,1.1,11.3,3.2,15.1c4,7.2,11.6,10.9,22.5,10.9c11.1,0,18.7-3.7,22.7-11
                            c2.1-3.9,3.2-9.4,3.2-16.3V17.1c0-6.3,0.9-8.4,1.5-9c0.7-0.8,2.3-1.8,6.6-2.3l1-0.1v-4h-24.9V5.7z"></path>
                        <path d="M212.6,50.3c-2.4,5.3-5,8.6-7.9,9.9c-3,1.4-7.7,2.1-14.1,2.1c-7.4,0-9.9-0.3-10.7-0.5c-0.2-0.1-1-0.3-1-2.3v-23h13.9
                            c4.9,0,6.5,0.9,7,1.5c0.7,0.7,1.7,2.5,2.5,6.9l0.2,1h4.4V21h-4.4l-0.2,1c-0.8,4.4-1.8,6.2-2.5,6.9c-0.5,0.6-2.1,1.5-7.1,1.5h-13.9
                            V9.8c0-1.5,0.2-1.9,0.2-1.9c0,0,0.3-0.2,1.7-0.2h13.3c6.8,0,9.3,0.9,10.3,1.7c1,0.7,2.3,2.7,3.3,7.6l0.2,1h4.6l-0.4-16.3h-54.1v4.1
                            l1.1,0.1c4.3,0.3,5.8,1.2,6.2,1.6c0.5,0.5,1.2,1.9,1.2,6v43.4c0,4.5-0.8,5.6-1.2,5.9c-0.5,0.4-2,1.2-6.3,1.6l-1.1,0.1v4h54.8
                            l5.1-18.8h-5L212.6,50.3z"></path>
                        <path d="M261.6,30.6l-8.6-5.3c-3.1-1.9-5.4-3.7-6.8-5.4c-1.3-1.6-2-3.4-2-5.7c0-2.4,0.8-4.3,2.5-5.6c1.8-1.4,3.8-2.1,6.2-2.1
                            c3.2,0,6.4,1.2,9.7,3.5c3.3,2.3,5.7,6.5,7.2,12.4l0.2,0.9h4.5l-2.4-23.1h-4l-0.2,0.9c-0.2,0.9-0.5,1.5-0.8,2
                            c-0.2,0.3-0.8,0.4-1.5,0.4c-0.2,0-1-0.2-5-1.6c-3.2-1.1-6.1-1.7-8.4-1.7c-5.7,0-10.3,1.8-13.8,5.2c-3.5,3.5-5.2,7.9-5.2,13.1
                            c0,4,1.5,7.7,4.5,11c1.6,1.7,3.7,3.4,6.2,5l8.3,5.2c4.7,2.9,7.8,5.1,9.2,6.5c2.1,2.1,3.1,4.6,3.1,7.5c0,3.2-1,5.6-3,7.3
                            c-2.1,1.8-4.4,2.7-7.3,2.7c-5.4,0-9.8-2.1-13.5-6.4c-2.1-2.5-4-5.9-5.6-10.1l-0.3-0.8h-4.4l3.2,23.1h4.2l0.2-1
                            c0.1-0.7,0.3-1.3,0.6-1.8c0.2-0.3,0.6-0.5,1.3-0.5c0.2,0,1,0.2,5.3,1.6c3.4,1.2,6.7,1.8,9.8,1.8c6.3,0,11.5-1.8,15.6-5.4
                            c4.1-3.6,6.2-8.2,6.2-13.7c0-4.1-1.2-7.6-3.5-10.6C271,37.1,267,34,261.6,30.6z"></path>
                    </g>
                    <path d="M334.3,40c-2.3-2.9-6.2-6-11.6-9.4l-8.6-5.3c-3.1-1.9-5.4-3.7-6.8-5.4c-1.3-1.6-2-3.4-2-5.7c0-2.4,0.8-4.3,2.5-5.6
                        c1.8-1.4,3.8-2.1,6.2-2.1c3.2,0,6.4,1.2,9.7,3.5c3.3,2.3,5.7,6.5,7.2,12.4l0.2,0.9h4.5l-2.4-23.1h-4l-0.2,0.9
                        c-0.2,0.9-0.5,1.5-0.8,2c-0.2,0.3-0.8,0.4-1.6,0.4c-0.2,0-1-0.2-5-1.6c-3.2-1.1-6.1-1.7-8.4-1.7c-5.7,0-10.3,1.8-13.8,5.2
                        c-3.5,3.5-5.2,7.9-5.2,13.1c0,4,1.5,7.7,4.5,11c1.6,1.7,3.7,3.4,6.2,5l8.3,5.2c4.7,2.9,7.8,5.1,9.2,6.5c2.1,2.1,3.1,4.6,3.1,7.5
                        c0,3.2-1,5.6-3,7.3c-2.1,1.8-4.4,2.7-7.3,2.7c-5.4,0-9.8-2.1-13.5-6.4c-2.1-2.5-4-5.9-5.6-10.1l-0.3-0.8h-4.4l3.2,23.1h4.2l0.2-1
                        c0.1-0.7,0.3-1.3,0.6-1.8c0.2-0.3,0.6-0.5,1.3-0.5c0.2,0,1,0.2,5.3,1.6c3.4,1.2,6.7,1.8,9.8,1.8c6.3,0,11.5-1.8,15.6-5.4c4.1-3.6,6.2-8.2,6.2-13.7C337.8,46.6,336.6,43,334.3,40z">
                    </path>
                </svg>
    const [modal, setModal] = useState(false)
    const [selected, setSelected] = useState(null)
    const [userOpened, setUserOpened] = useState(false)
    const [mobileSelected, setMobileSelected] = useState(null)
    const [selectedCat, setSelectedCat] = useState(null)
    const [catChildren, setCatChildren] = useState(null)
    const token = localStorage.getItem("token")
    const { data: basket, isLoading, refetch, isError } = useGetBasketQuery(token, {skip: !token})
    useEffect(() => {
        if (token) {
            refetch()
        }
    }, [token, refetch]);


    const navigate = useNavigate()
    useEffect(() => {
        const match = location.pathname.match(/^\/[^/]+\/(.+)/)
        const result = match ? match[1] : null
        setSelected(result)
    }, [])

    function handleClick(name, clickedChildren, idx) {
        setCatChildren(clickedChildren)
        setMobileSelected(idx)
        setSelectedCat(name)
    }

    function handleUser() {
        if (window.innerWidth > 1024) {
            setUserOpened(!userOpened)
        }
        else {
            navigate('/guess/account')
        }
    }
    return (
        <header className="sticky w-full z-99 top-0">
            <Link to="/" className="bg-[#1d1d1d] h-[40px] flex justify-center items-center px-[15px]">
                <span className="text-white text-[10px] lg:text-[.75rem] tracking-wide">Sale | Up to 50%  off</span>
            </Link>
            <nav className="bg-white px-[15px] lg:px-[24px] h-[3.25rem] lg:h-[4.6rem] flex flex-wrap items-center justify-between border-b border-gray-300">
                <div className="flex items-center">
                    <button onClick={() => setModal(true)} className="mr-[15px] lg:hidden">
                        <FaBars className="text-[26px] font-light" />
                    </button>
                    <Link to="/" title="Go to Homepage">{logo}</Link>
                    {location.pathname.includes("kids") && <span className="ps-2 text-sm md:text-xl lg:text-2xl font-serif">kids</span>}
                    <div className="hidden lg:flex">
                        {data?.map((cat, idx) => {
                            return(
                                <p key={idx} onClick={() => navigate(`/guess/${cat.name.toLowerCase()}`)} className={`${selected == cat.name.toLowerCase() && "font-bold"} cursor-pointer px-[16px] py-[16px]`}>{cat.name.toUpperCase()}</p>
                            )
                        })}
                    </div>
                </div>
                <div className="flex gap-[7px]">
                    <div className="relative flex items-center">
                        {token && <span className="text-sm me-4 hidden md:inline-block font-bold">Hi, {localStorage.getItem("firstName")}</span>}
                        <User onClick={() => token ? handleUser() : navigate('/login')} className="cursor-pointer text-[20px] lg:text-[24px] font-light" />
                        {token ? '' : <div className="bg-red-500 rounded-full h-[5px] w-[5px] absolute right-0 top-0"></div>}
                        {
                            token &&
                            <div className={`${userOpened && 'lg:flex'} hidden gap-5 flex-col absolute right-0 top-[200%] border w-max h-max bg-white p-10 z-10`}>
                                <div className="flex items-center">
                                    <div className="rounded-full me-4 bg-[#343a40] flex justify-center items-center w-[2.56rem] h-[2.56rem]">
                                        <span className="text-white">{localStorage.getItem("firstName").charAt(0)}</span>
                                        <span className="text-white">{localStorage.getItem("lastName").charAt(0)}</span>
                                    </div>
                                    <span className="font-semibold text-sm">Hi {localStorage.getItem("firstName")}, welcome back!</span>
                                </div>
                                <Link to="/guess/account" className="flex items-center cursor-pointer">
                                    <img className="w-3.5 h-3.5 ms-2 me-4" src="../../../Guess_Favicon.svg" alt="guess favicon" />
                                    My Guess
                                </Link>
                                <button onClick={() => {localStorage.clear(), navigate('/login')}} className="hover:bg-black hover:text-white transition duration-150 border px-5 py-2.5 text-sm">Logout</button>
                            </div>
                        }
                    </div>
                    <Search onClick={() => navigate('/guess/search-products')} className="cursor-pointer text-[20px] lg:text-[24px] font-light" />
                    <Heart onClick={() => navigate("/guess/wishlist")} className="text-[20px] lg:text-[24px] font-light" />
                    <div onClick={() => navigate('/guess/cart')} className="select-none cursor-pointer relative">
                        {token && basket?.totalItems > 0 && (
                            <span className="absolute left-[50%] bottom-[50%] bg-black w-5 h-5 rounded-full text-white flex justify-center items-center">
                                {basket?.totalItems}
                            </span>
                        )}
                        <ShoppingBag className="text-[20px] lg:text-[24px] font-light" />
                    </div>
                </div>
                <div className={`fixed flex flex-col top-0 left-0 z-99 w-full overflow-hidden h-full bg-white lg:hidden ${modal ? 'translate-x-0' : 'translate-x-[-100%]'} transition duration-300`}>
                    <div className="flex justify-between items-center px-[15px] pt-[15px] pb-[12px]">
                        <div className="w-full max-w-[50px]">
                            <img src="../../../az.svg" alt="Az Flag" />
                        </div>
                        <div>
                            {logo}
                        </div>
                        <button className="lg:hidden cursor-pointer" onClick={() => setModal(false)}>
                            <X />
                        </button>
                    </div>
                    <div className="flex items-center px-[15px] h-[60px]">
                        <Search className="text-gray-300 absolute mx-4" />
                        <input type="search" placeholder="Search" className="w-full border border-gray-300 pl-10 pr-4 py-3 rounded-sm text-sm focus:outline-none"  />
                    </div>
                    <div className="flex border-b border-gray-300 overflow-auto">
                        {data?.map((cat, idx) => (
                            <p key={idx} onClick={() => handleClick(cat.name, cat.children, idx)} className={`${mobileSelected === idx && "border-b font-bold"} cursor-pointer px-[24px] py-[16px]`}>
                                {cat.name}
                            </p>
                        ))}
                    </div>
                    {catChildren &&
                        <div className="flex flex-col gap-5">
                            <div onClick={() => navigate(`/guess/${selectedCat.toLowerCase()}`)} className="flex gap-2 px-6 pt-4">
                                <Home />
                                <p className="cursor-pointer font-bold underline">View {selectedCat} Page</p>
                            </div>
                            {catChildren?.map((subcat, idx) => (
                                <div key={idx} 
                                    onClick={async () => {
                                        await navigate(`/guess/${selectedCat.toLowerCase()}/${subcat.name.toLowerCase().split(" ").join("")}?id=${subcat.id}`)
                                        setModal(false)
                                    }} className="flex justify-between cursor-pointer px-6">
                                    <p>
                                        {subcat.name}
                                    </p>
                                    <ChevronRight /> 
                                </div>
                            ))}
                        </div>
                    }
                </div>
            </nav>
            <nav>
                {children}
            </nav>
        </header>
    )
}