import { Plus} from "lucide-react";
import { ToastContainer } from "react-toastify";
import ProductCard from "./ProductCard";
import AddProduct from "./AddProduct";
import { useState } from "react";


const Products = () => {
  const [isProductOpen, setIsProductOpen] = useState(false)  
  return (
    <>
      <ToastContainer position="top-right" style={{zIndex: 999}} autoClose={2000} />
      <main className="container py-4 mx-auto">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-2 px-2">
            <h2 className="text-2xl font-bold">Products</h2>
            <button onClick={() => setIsProductOpen(true)} className="z-1 fixed bottom-[50px] right-[20px] flex font-bold items-center gap-2 hover:text-white hover:bg-black transition duration-200 rounded-3xl bg-amber-500 px-4 py-2 group">
                <span className="text-sm md:text-2xl flex justify-center items-center group-hover:animate-bounce">
                  Add Product
                  <Plus />
                </span>
            </button>
            <AddProduct setIsProductOpen={setIsProductOpen} isProductOpen={isProductOpen} />
          </div>
          <div className="flex flex-col gap-5 justify-center items-between py-2 px-2">
            <ProductCard />
          </div>
      </main>
    </>
  );
};

export default Products
