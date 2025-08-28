import Swal from "sweetalert2";
import { useDeleteProductMutation, useGetAllProductsQuery } from "../../../strore/guessApi";
import { Pencil, Trash2 } from "lucide-react";
import "../../../../colors.css"
import EditProduct from "./EditProduct";
import { useState } from "react";

function ProductCard() {
    const { data: clothingItem, isLoading, error } = useGetAllProductsQuery();
    const [deleteProduct] = useDeleteProductMutation()
    const [item, setItem] = useState()
    const [isProductEditOpen, setIsProductEditOpen] = useState(false)
    async function handleDelete(id) {
        try {
            Swal.fire({
                title: "Delete Product",
                text: "Once a product is deleted, it cannot be restored!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await deleteProduct(id).unwrap()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Product Deleted Successfully!",
                        icon: "success"
                    });
                }
            });
        } catch (error) {
            const msg = Array.isArray(error.data.message)
                ? error.data.message[0]
                : error.data.message || "An unexpected error occurred"
            toast.error(msg)
        }
    }


    function handleEdit(prod) {
        setItem(prod)
        setIsProductEditOpen(true)
    }

    return (
        clothingItem?.map((product, idx) => {
            return (
                <div key={idx}>
                    <EditProduct setIsProductEditOpen={setIsProductEditOpen} isProductEditOpen={isProductEditOpen} item={item} />
                    <div className="flex flex-col md:flex-row gap-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 flex-1 items-center">
                        {product?.images?.map((img) => (
                            <img
                                key={img.id}
                                src={img.url}
                                alt={product.name}
                                className="rounded-lg object-center object-contain md:object-cover md:h-60 w-full shadow-md"
                            />
                        ))}
                    </div>

                    <div className="flex-1 bg-white rounded-xl shadow-md p-6">
                        <div className="flex flex-wrap gap-2 justify-between items-start">
                            <div className="flex flex-col gap-1">
                                <p className="text-xl font-bold text-gray-900">Category: {product.category.name}</p>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {product.name}
                                </h2>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-1 hover:bg-gray-100 rounded">
                                <Pencil onClick={() => handleEdit(product)} className="w-5 h-5 text-blue-600" />
                                </button>
                                <button onClick={() => handleDelete(product.id)} className="p-1 hover:bg-red-100 rounded">
                                <Trash2 className="w-5 h-5 text-red-600" />
                                </button>
                            </div>
                        </div>

                        <p className="text-gray-700 mt-2">{product.description}</p>

                        <div className="mt-4">
                        <p className="text-lg font-semibold text-gray-800">
                            ${product.price}
                        </p>
                        <p
                            className={`mt-1 text-sm ${
                            product.stock ? "text-green-600" : "text-red-500"
                            }`}
                        >
                            {product.stock ? "In stock" : "Out of stock"}
                        </p>
                        </div>

                        <div className="mt-4">
                        <h4 className="font-medium text-gray-800">Available Colors:</h4>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                            {product.colors?.map((color, idx) => (
                                <div key={idx} className="flex flex-col items-center">
                                    <span className={`${color.toLowerCase()} p-3 border-2 max-w-[30px] rounded-full`}>
                                    </span>
                                    <p>{color}</p>
                                </div>

                            ))}
                        </div>
                        </div>

                        <div className="mt-4">
                        <h4 className="font-medium text-gray-800">Available Sizes:</h4>
                        <div className="flex gap-2 mt-1 flex-wrap">
                            {product.sizes?.map((size) => (
                            <span
                                key={size}
                                className="px-3 py-1 text-sm bg-gray-100 rounded border"
                            >
                                {size}
                            </span>
                            ))}
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            )
        })
    )
}
export default ProductCard