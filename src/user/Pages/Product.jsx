import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router"
import { useAdd2BasketMutation, useGetAllCategoriesQuery, useGetAllProductsQuery, useGetBasketQuery, useGetProductByIdItselfQuery} from "../../strore/guessApi"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Boxes, ChevronDown, Heart, Loader2, Search, Star, Truck, X } from "lucide-react"
import "../../../colors.css"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import ProductCard from "../components/ProductCard"

function Product() {
    const { pathname } = useLocation()
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [pathname])
    const {category, subCategoryName} = useParams()      
    const [selectedColor, setSelectedColor] = useState(0)
    const [warning, setWarning] = useState(false)
    const [showImg, setShowImg] = useState()
    const [showImage, setImage] = useState(false)
    const [search] = useSearchParams()
    const navigate = useNavigate()
    const id = search.get("id")
    const [accordionOpen, setAccordionOpen] = useState(false)
    const {data: categories} = useGetAllCategoriesQuery()
    const { data, isLoading } = useGetProductByIdItselfQuery(id)
    const {data: products, isLoading: isProdLoading} = useGetAllProductsQuery()
    const [selectedSize, setSelectedSize] = useState("")
    const subCategory = categories?.find(cat => cat.name.toLowerCase() == category).children.find(subcat => subcat.name.toLowerCase().split(" ").join("") == subCategoryName)
    const order = [ "XS", "S", "M", "L", "XL", "XXL", "XXXL", "XXS", "XXXS", "EU 36", "EU 37", "EU 38", "EU 39", "EU 40", "EU 41", "EU 42", "EU 43", "EU 44", "EU 45", "EU 46", "EU 47"]
    const sorted = [...data?.sizes || []].sort((a, b) => order.indexOf(a) - order.indexOf(b))
    const token = localStorage.getItem("token")
    const { data: basket } = useGetBasketQuery(token, {skip: !token})
    const [add2Basket, {isLoading: adding2Basket}] = useAdd2BasketMutation()
    useEffect(() => setWarning(false), [selectedSize])
    const [modal, setModal] = useState(false)
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
    
    async function handleAdd2Basket(id) {
        try {
            if (!token) {
                navigate('/login');
                return;
            }

            if (!selectedSize) {
                setWarning(true)
                setTimeout(() => setWarning(false), 3000)
                return;
            }

            const color = data.colors[selectedColor];
            const size = selectedSize;
            await add2Basket({
                id,
                color,
                size,
                quantity: 1,
            }).unwrap();
            setModal(true)
            setTimeout(() => setModal(false), 3000)
        } catch (error) {
            console.error(error)
        }
    }   
    
    let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    
    const [wished, setWished] = useState(false)
    useEffect(() => {
        wishlist.includes(data?.id) ? setWished(true) : setWished(false)
    }, [wishlist])

    function handleWishlist() {
        if (!token) navigate("/login")
        else {    
            wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
            if (wishlist.includes(data.id)) {
                localStorage.setItem("wishlist", JSON.stringify(wishlist.filter(id => id !== data.id)))
                setWished(false)
            } else {
                localStorage.setItem("wishlist", JSON.stringify([...wishlist, data.id]))
                setWished(true)
            }
        }
    }
    

    return (
        <>
            <Header>
                <div className="sticky top-0 bg-white lg:flex p-3 gap-10 px-[15px] lg:px-[24px] hidden flex-nowrap whitespace-nowrap overflow-auto">
                    {categories?.find(cat => cat.name.toLowerCase() === category)?.children?.map((child,idx) => (
                        <p onClick={() => navigate(`/guess/${category}/${child.name.toLowerCase().split(' ').join('')}?id=${child.id}`)} className={`${child.name == "Sale" ? "text-red-500 hover:text-red-700 " : "text-gray-500 hover:text-black "} text-sm cursor-pointer transition duration-100`} key={idx}>{child.name}</p>
                    ))}
                </div>
            </Header>
            <main>
                {isLoading ? 
                    <div className="h-screen flex justify-center items-center">
                        <Loader2 size={100} className=" animate-spin" /> 
                    </div>
                    :
                    (
                        <>  
                            <div className="relative lg:hidden">
                                <div className={`fixed ${modal ? "flex" : "hidden"} inset-0 justify-center items-center z-100`}>
                                    <div className="w-[90%] p-2.5 flex flex-col border-2 bg-white ">
                                        <div className="flex flex-col items-center justify-center">
                                            <span>Item added successfully.</span>
                                            <span className="mb-5">You have {basket?.totalItems} item(s) in your bag.</span>
                                        </div>
                                        <div className="flex flex-col justify-center gap-4">
                                            <button onClick={() => navigate("/guess/cart")} className="border px-5 py-1">Go to shopping bag</button>
                                            <button onClick={() => setModal(false)} className="border px-5 py-1">Continue</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    {data?.images?.map((img, idx) => {
                                        return (
                                            <img key={idx} src={img.url} alt="product image" />
                                        )
                                    })}
                                </div>
                                <div className="flex flex-col justify-center px-[15px]">
                                    <div className="my-5 gap-1 flex text-sm cursor-pointer">
                                        <span onClick={() => navigate("/")} className="text-gray-500">Guess</span>/<span className="text-gray-500 capitalize" onClick={() => navigate(`/guess/${category}`)}>{category}</span>/<span onClick={() => navigate(`/guess/${category}/${subCategoryName}?id=${subCategory?.id}`)} className="text-gray-500 capitalize">{subCategory?.name}</span>
                                    </div>
                                    <span className="mb-2 text-gray-500 text-sm">Color: <span className="uppercase">{data?.colors[selectedColor]}</span></span>
                                    <div className="w-full flex gap-2 mb-5">
                                        {data?.colors?.map((color, idx) => {
                                            return (
                                                <button
                                                    key={idx}
                                                    title={color}
                                                    onClick={() => setSelectedColor(idx)}
                                                    className={`${selectedColor == idx && "!border-black border-3"} cursor-pointer border border-gray-400 min-h-6 min-w-6  rounded-full ${color.toLowerCase()}`}
                                                ></button>
                                            )
                                        })}
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <span className="w-full border-b text-xs font-bold mb-1.5">Size</span>
                                        <div className="flex gap-2 overflow-auto mb-4.5">
                                            {sorted.map((size, idx) => {
                                                return (
                                                    <button 
                                                        onClick={() => setSelectedSize(size)}
                                                        key={idx}
                                                        className={`w-12 rounded h-12 flex items-center justify-center ${selectedSize == size && "!bg-black text-white"} bg-[#f5f5f5]`}>
                                                        {size}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                        <span className={`${warning ? 'block' : 'hidden'} text-red-500 text-sm`}>Please select a Size before adding to bag</span>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center bg-white pt-[11px] px-[15px] pb-[6px] sticky bottom-0">
                                    <p className="text-md font-semibold">{data?.name}</p>
                                    <p className="text-xs">{data?.price} &euro;</p>
                                    <div className="mt-2 flex items-center gap-2">
                                        <button onClick={() => handleWishlist()} className="flex-1/5 border flex items-center justify-center p-2"><Heart fill={wished ? "black" : "none"}/></button>
                                        <button onClick={() => handleAdd2Basket(data?.id)} className="flex-4/5 flex justify-center items-center bg-black text-white p-2">{adding2Basket ? <Loader2 className="animate-spin" /> : "Add to bag"}</button>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 justify-center mt-[15px] px-[15px]">
                                    <div className="flex gap-2">
                                        <Truck />
                                        <p className="underline">Free shipping</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Boxes />
                                        <p className="underline">30-days free returns</p>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                    <Star className="text-[#64b5f6] fill-[#64b5f6]"/>
                                        <p className="text-[#64b5f6]">Exclusive Services</p>
                                    </div>
                                </div>
                                <div className="px-[15px] my-[15px]">
                                    <p className="text-xs text-[#212529] leading-6">
                                        {data?.description}
                                    </p>
                                    <div className="flex flex-col py-4" onClick={() => setAccordionOpen(!accordionOpen)}>
                                        <div className={`flex justify-between ${accordionOpen && 'border-b border-[#e5e5e5] pb-5'}`}>
                                            <div className="flex items-center gap-2">
                                                <Truck />
                                                <p>Shipping & Returns</p>
                                            </div>
                                            <ChevronDown className={`${accordionOpen && 'rotate-180'} transition duration-200`} />
                                        </div>
                                        <div className={`${!accordionOpen && 'relative'} bg-white mt-4`}>
                                            <div className={`${accordionOpen ? 'opacity-100' : 'hidden opacity-0 absolute translate-y-[-10%]'} transition duration-150 flex flex-col justify-center pt-5`}>
                                                <div className="flex flex-col border-b border-[#e5e5e5] pb-5">
                                                    <div className="text-xs">
                                                        <p className="font-bold">HOME DELIVERY</p>
                                                        <p>Business Days: 8-9</p>
                                                        <p>Cost: Free</p>
                                                    </div>
                                                    <div className="pt-5 pb-3 text-xs text-[#757575]">
                                                        *Please note that a 4€ shipping fee for orders including Past Collections is applied.
                                                    </div>
                                                    <div className="underline text-sm text-[#757575]">
                                                        Click here for more info
                                                    </div>
                                                </div>
                                                <div className="flex flex-col border-b border-[#e5e5e5] py-5">
                                                    <div className="text-xs">
                                                        <p className="font-bold">RETURN</p>
                                                        <p>30 days to refund your order</p>
                                                    </div>
                                                    <div className="underline text-sm text-[#757575] pt-5">
                                                        Click here for more info
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden lg:flex lg:flex-col">
                                <div className={`fixed ${modal ? "flex" : "hidden"} max-w-[250px] right-0 p-5 top-28 flex flex-col border gap-2 bg-white justify-center items-center pe-5 z-100`}>
                                    <span className="mb-2">Item added successfully.</span>
                                    <img src={data?.images[0]?.url} alt={data?.name} />
                                    <button onClick={() => navigate("/guess/cart")} className="border px-5 py-1 hover:bg-black hover:text-white transition duration-150">Go to shopping bag</button>
                                </div>
                                <div className="my-5 gap-1 flex text-sm cursor-pointer px-6">
                                    <span onClick={() => navigate("/")} className="text-gray-500">Guess</span>/<span className="text-gray-500 capitalize" onClick={() => navigate(`/guess/${category}`)}>{category}</span>/<span onClick={() => navigate(`/guess/${category}/${subCategoryName}?id=${subCategory?.id}`)} className="text-gray-500 capitalize">{subCategory?.name}</span>
                                </div>  
                                <div className="relative flex">
                                    <div className="grid grid-cols-2 gap-4 pe-4 flex-4/6 px-4">
                                        {data?.images?.map((img, idx) => {
                                            return (
                                                <div onClick={() => {
                                                    setShowImg(img.url)
                                                    setImage(true)
                                                }} className="flex relative group" key={idx}>
                                                    <span className="hidden group-hover:flex justify-center items-center absolute inset-0 bg-[#ffffff80]">
                                                        <Search size={32} />
                                                    </span>
                                                    <img src={img.url} alt="product image" />
                                                </div>
                                            )
                                        })}
                                        <div className={`${showImage ? 'flex' : 'hidden'} justify-center overflow-auto bg-[#000000c1] inset-0 fixed z-100`}>
                                            <img
                                                src={showImg}
                                                className="h-max w-max object-center"
                                            />
                                            <X onClick={() => setImage(false)} size={32} className="fixed top-10 right-10 z-99" /> 
                                        </div>
                                    </div>
                                    <div className="lg:sticky lg:top-45 self-start px-4 flex-2/6">
                                        <div className="mb-10">
                                            <h1 className="mb-2 text-2xl">{data?.name}</h1>
                                            <p className="text-lg">{data?.price} &euro;</p>
                                        </div>
                                        <div className="flewx flex-col justify-center">
                                            <p className="text-lg font-semibold mb-3">Color: <span className="uppercase">{data?.colors[selectedColor]}</span></p>
                                            <div className="flex overflow-auto items-center gap-2">
                                                {data?.colors?.map((color, idx) => {
                                                    return (
                                                        <button
                                                            key={idx}
                                                            title={color}
                                                            onClick={() => setSelectedColor(idx)}
                                                            className={`${selectedColor == idx && "!border-black border-3"} cursor-pointer border border-gray-400 min-h-6 min-w-6  rounded-full ${color.toLowerCase()}`}
                                                        ></button>
                                                    )
                                                })}
                                            </div>
                                            <p className="text-lg font-bold my-2.5">Size</p>
                                            <div className="flex  flex-col">
                                                <div className="flex gap-2 flex-wrap mb-4.5">
                                                    {sorted.map((size, idx) => {
                                                        return (
                                                            <button 
                                                                onClick={() => setSelectedSize(size)}
                                                                key={idx}
                                                                className={`w-12 rounded h-12 flex items-center justify-center ${selectedSize == size && "!bg-black text-white"} bg-[#f5f5f5]`}>
                                                                {size}
                                                            </button>
                                                        )
                                                    })}
                                                </div>
                                                <span className={`${warning ? 'block' : 'hidden'} text-red-500 text-sm`}>Please select a Size before adding to bag</span>
                                            </div>
                                            <div className="mt-2 flex items-center gap-2">
                                                <button onClick={() => handleAdd2Basket(data.id)} className="flex-4/5 flex justify-center items-center bg-black text-white p-2">{adding2Basket ? <Loader2 className="animate-spin" /> : "Add to bag"}</button>
                                                <button onClick={() => handleWishlist()} className="flex-1/5 border flex items-center justify-center p-2"><Heart fill={wished ? "black" : "none"} /></button>
                                            </div>
                                            <div className="flex flex-col gap-2 justify-center mt-[20px]">
                                                <div className="flex gap-2">
                                                    <Truck />
                                                    <p className="underline">Free shipping</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Boxes />
                                                    <p className="underline">30-days free returns</p>
                                                </div>
                                                <div className="flex gap-2 mt-2">
                                                <Star className="text-[#64b5f6] fill-[#64b5f6]"/>
                                                    <p className="text-[#64b5f6]">Exclusive Services</p>
                                                </div>
                                            </div>
                                            <p className="text-xs text-[#212529] leading-6 my-5">
                                                {data?.description}
                                            </p>
                                            <div className="flex flex-col justify-center p-4 mt-4 bg-[#f5f5f5]" onClick={() => setAccordionOpen(!accordionOpen)}>
                                                <div className={`flex justify-between ${accordionOpen && 'border-b border-[#e5e5e5] pb-5'}`}>
                                                    <div className="flex items-center gap-2">
                                                        <Truck />
                                                        <p>Shipping & Returns</p>
                                                    </div>
                                                    <ChevronDown className={`${accordionOpen && 'rotate-180'} transition duration-200`} />
                                                </div>
                                                <div className={`${!accordionOpen && 'relative'} cursor-pointe mt-4`}>
                                                    <div className={`${accordionOpen ? 'opacity-100' : 'hidden opacity-0 absolute translate-y-[-10%]'} transition duration-150 flex flex-col justify-center pt-5`}>
                                                        <div className="flex flex-col border-b border-[#e5e5e5] pb-5">
                                                            <div className="text-xs">
                                                                <p className="font-bold">HOME DELIVERY</p>
                                                                <p>Business Days: 8-9</p>
                                                                <p>Cost: Free</p>
                                                            </div>
                                                            <div className="pt-5 pb-3 text-xs text-[#757575]">
                                                                *Please note that a 4€ shipping fee for orders including Past Collections is applied.
                                                            </div>
                                                            <div className="underline text-sm text-[#757575]">
                                                                Click here for more info
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col border-b border-[#e5e5e5] py-5">
                                                            <div className="text-xs">
                                                                <p className="font-bold">RETURN</p>
                                                                <p>30 days to refund your order</p>
                                                            </div>
                                                            <div className="underline text-sm text-[#757575] pt-5">
                                                                Click here for more info
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
                    )
                }
            </main>
            <Footer />
        </>
    )
}

export default Product