import { ChevronLeft, ChevronRight, Heart, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import "../../../index.css"
import { useNavigate } from "react-router"
import { useGetAllCategoriesQuery } from "../../strore/guessApi"

function ProductCard({data, cat, parent}) {  
  const navigate = useNavigate()
  const [image, setImage] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [selectedColor, setSelectedColor] = useState(0)
  const {data: categories} = parent ? useGetAllCategoriesQuery() : ''
  const parentCat = parent && categories?.find(cat => cat.id == parent)?.name
  const token  = localStorage.getItem("token")
  const handleTouchEnd = (e) => {
    const diff = touchStart - touchEnd
    if (diff > 0) {
      setImage(image + 1 >= data.images.length ? 0 : image + 1)
    } else if (diff < 0) {
      setImage(image - 1 < 0 ? data.images.length - 1 : image - 1)
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
    <div className="flex flex-col group mb-10">
      <div onClick={() => navigate(`/guess/${parent ? parentCat.toLowerCase() : cat?.toLowerCase()}/${data?.category?.name?.split(" ").join("").toLowerCase()}/${data?.slug}?id=${data?.id}`)} className="flex flex-col">
        <div className="relative flex flex-col justify-center">
          {!data.images[0].url && <Loader2 className="animate spin" />}
          <img onTouchStart={(e) => {e.stopPropagation(), setTouchStart(e.changedTouches[0].clientX)}} onTouchMove={(e) => {e.stopPropagation(), setTouchEnd(e.changedTouches[0].clientX)}} onTouchEnd={(e) => {e.stopPropagation(), handleTouchEnd(e)}} src={data?.images[image]?.url} alt={data?.name} />
          <span onClick={(e) => {e.stopPropagation(), handleWishlist()}} className="group-hover:opacity-100 opacity-0 transition-all duration-150 absolute p-4 self-end top-0">
            <Heart 
              className={`w-5 h-5 transition-colors duration-200 ${wished ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'}`}
            />
          </span>
          <div className="opacity-0 transition-all duration-150 absolute flex items-center self-center w-full p-2 group-hover:opacity-100">
            <span className={`${image - 1 < 0 && "hidden"} left-0 absolute`} onClick={(e) => {e.stopPropagation(), setImage(image - 1)}}><ChevronLeft size={32} /></span>
            <span className={`${image + 1 >= data?.images?.length && "hidden"} right-0 absolute`} onClick={(e) => {e.stopPropagation(), setImage(image + 1)}}><ChevronRight size={32} /></span>
          </div>
          <div className="opacity-0 transition-all duration-150 group-hover:opacity-100 absolute flex w-full gap-2 justify-center items-center p-4 bg-white bottom-0">
            {data.colors.map((color, idx) => {
              return(
                <span key={idx} onClick={(e) => {e.stopPropagation(), setSelectedColor(idx)}} className={`${color.toLowerCase()} ${selectedColor == idx && "border-2 !border-black"} cursor-pointer border border-gray-300 min-h-[1.25rem] min-w-[1.25rem]`}></span>
              )
            })}
          </div>
        </div>
        <div className="mt-2 ms-1">
          <p className="text-sm cursor-pointer">{data?.name}</p>
          <p className="text-sm">{data?.price} &euro;</p>
          {data?.colors?.length > 1 && <p className="hover:underline decoration-[#939090] text-[#939090] text-sm cursor-pointer">More colors +</p>}
        </div>
      </div>
    </div>
  )
}

export default ProductCard