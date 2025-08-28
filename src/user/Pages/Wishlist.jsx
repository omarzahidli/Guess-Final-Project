import Header from "../components/Header"
import Footer from "../components/Footer"
import { useLocation, useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { Heart } from "lucide-react"
import WishedProduct from "../components/WishedProduct"

function Wishlist() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
  }, [pathname])
  useEffect(() => {document.title = "Wishlist | GUESS®"}, [])
  const token = localStorage.getItem("token")

  const [wishlistItems, setWishlistItems] = useState([]);
  useEffect(() => {
      const wishlist = localStorage.getItem("wishlist");
      if (wishlist) {
          try {
            const parsedWishlist = JSON.parse(wishlist);
            setWishlistItems(parsedWishlist);
          } catch (error) {
            console.error("Error parsing wishlist from localStorage:", error);
            setWishlistItems([]);
          }
      } else {
        setWishlistItems([]);
      }
  }, []) 

  return ( 
    <> 
      <Header />
      <main>
        {wishlistItems.length ? 
        (<>
          <div className="py-6 px-4 flex flex-col lg:mt-11 lg:max-w-[84%] lg:mx-auto">
            <h1 className="uppercase font-semibold mb-7.5 lg:text-2xl">Wishlist</h1>
            <div className="flex flex-col lg:grid lg:grid-cols-4 lg:gap-5">
              {wishlistItems?.map((item, idx) => <WishedProduct key={idx} id={item} />)}
            </div>
          </div>
          </>) : (
          <div className="px-3.5 py-12 flex justify-center h-[60vh] items-center flex-col text-center">
              <Heart size={48} />
              <h2 className="text-3xl lg:text-4xl mb-2 font-semibold">Your wishlist is empty</h2>
              <p className="text-lg text-gray-500 mb-4">You currently don't have any items in your wishlist</p>
              {token ? (
                  <button onClick={() => navigate('/')} className="bg-black text-white px-4 py-2 lg:px-6 lg:py-4 lg:text-xl hover:bg-white border-2 hover:text-black transition duration-150">
                      Go to Homepage
                  </button>
              ) : (
                  <>
                      <p className="mb-4 text-lg text-gray-500">Can't see your wished items?</p>
                      <button onClick={() => navigate('/login')} className="bg-black text-white px-4 py-2 lg:px-6 lg:py-4 lg:text-xl hover:bg-white border-2 hover:text-black transition duration-150">
                          Sign in or create an account
                      </button>
                  </>
              )}
          </div>)
        }
      </main>
      <Footer /> 
    </>
  )
}

export default Wishlist