import { useNavigate } from "react-router"
import { useAdd2BasketMutation, useGetProductByIdItselfQuery } from "../../strore/guessApi";
import { Loader2, X } from "lucide-react";
import { useState } from "react";

function WishedProduct({id}) { 
  const navigate = useNavigate()
  const [add2Basket, {isLoading: isHandling}] = useAdd2BasketMutation()
  const { data, isLoading } = useGetProductByIdItselfQuery(id);
  const [isInWishlist, setIsInWishlist] = useState(true);

  let wishlist = JSON.parse(localStorage.getItem("wishlist"))
  function deleteWishedItem() {
    const updatedWishlist = wishlist.filter(wishlistId => wishlistId !== data?.id);
    wishlist = localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setIsInWishlist(false);
    navigate("/guess/wishlist")
  }

  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  async function handleBasket(val = 1) {
    try {
      await add2Basket({
        id: data.id,
        color: selectedColor,
        size: selectedSize,
        quantity: val,
      }).unwrap();
      const updatedWishlist = wishlist.filter(wishlistId => wishlistId !== data?.id);
      wishlist = localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setIsInWishlist(false)
    } catch (error) {
      console.error(error)
    }
  }

  if (isLoading) return (<div className="w-full flex justify-center items-center min-h-[300px]"><Loader2 size={64} className="animate-spin" /></div>) 
  return isInWishlist ? (
    <div className='flex flex-col w-full justify-between md:items-start mb-4'>
      {isHandling && 
        <div className="fixed inset-0 bg-[#ffffff50] w-screen z-100 h-screen flex justify-center items-center">
            <Loader2 size={100} className="animate-spin" /> 
        </div>
      }
    <div className='relative flex justify-end'>
      <div className="top-3 right-3 absolute flex justify-center items-center rounded-full bg-white/50 w-10 h-10">
        <X onClick={() => deleteWishedItem()} className="cursor-pointer" />
      </div>
      <img 
        onClick={() => navigate(`/guess/${parent?.name?.toLowerCase()}/${child?.name?.split(" ").join("").toLowerCase()}/${data?.slug}?id=${data?.id}`)} 
        className='min-w-full cursor-pointer' 
        src={data?.images?.[0]?.url} 
        alt={data?.name} 
      />
    </div>
    <div className="flex flex-col p-2">
      <span>{data?.name}</span>
      <span>{data?.price}</span>
    </div>
    <div className="w-full px-5 py-4.5 my-2 relative border border-gray-300">
      <span className="absolute top-[-10px] left-[10px] text-[#212121] bg-white text-xs">Color</span>
      <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} className="w-full outline-none">
        <option disabled value="">Select color</option>
        {data?.colors?.map((color, idx) => (
          <option key={idx} value={color}>{color}</option>
        ))}
      </select>
    </div>
    <div className="w-full px-5 py-4.5 my-2 relative border border-gray-300">
      <span className="absolute top-[-10px] left-[10px] text-[#212121] bg-white text-xs">Size</span>
      <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} className="w-full outline-none">
        <option disabled value="">Select size</option>
        {data?.sizes?.map((size, idx) => (
          <option key={idx} value={size}>{size}</option>
        ))}
      </select>
    </div>
    <button onClick={() => handleBasket()} disabled={(selectedColor == '' || selectedSize == '') ? true : false} className={`${(selectedColor != '' && selectedSize != '') && "bg-black text-white"} w-full mt-3.5 mb-12 text-[#999] bg-[#EBEBEB] px-2.5 py-2 transition duration-150`}>
      Add to bag
    </button>
  </div>
  ) : (
    <div className="text-center lg:text-start py-4 text-gray-500">
      Item removed from wishlist
    </div>
  )

}

export default WishedProduct