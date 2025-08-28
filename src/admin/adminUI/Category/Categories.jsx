import { Pencil, Plus, Trash2} from "lucide-react";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import Swal from "sweetalert2";
import { useDeleteCategoryMutation, useGetAllCategoriesQuery } from "../../../strore/guessApi";

function Categories () {
    const { data } = useGetAllCategoriesQuery()
    const [isCategoryOpen, setIsCategoryOpen] = useState(false)
    const [item, setItem] = useState()
    const [isCategoryEditOpen, setIsCategoryEditOpen] = useState(false)
    const [deleteCategory] = useDeleteCategoryMutation()
    function handleEditCategory(cat) {
        setItem(cat)
        setIsCategoryEditOpen(true)
    }
    async function handleDelete(id) {
        try {
            Swal.fire({
                title: "Delete Category",
                text: "Once a category is deleted, it cannot be restored!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await deleteCategory(id).unwrap()
                    
                    Swal.fire({
                        title: "Deleted!",
                        text: "Category Deleted Successfully!",
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
    function renderChildren(category) {
        return category?.map((cat, idx) => {
            return (
                <div key={idx} className={`${cat.children ? "bg-blue-200" : 'bg-blue-100'} border-3  rounded-lg shadow-md hover:shadow-2xl transition-shadow`}>
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex flex-col">
                                <h2 className="text-xl font-semibold text-gray-800">{cat.name}</h2>
                                <h4>Slug: {cat.slug}</h4>
                                <h6>Id: {cat.id}</h6>
                                <h6>ParentId: {cat.parentId || "null"}</h6>
                            </div>
                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">
                                {cat.children ? cat.children.length + " Children" : "No children" } 
                            </span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <button onClick={() => handleEditCategory(cat)} className="p-1 rounded hover:bg-gray-100">
                                <Pencil className="w-4 h-4 text-gray-600" />
                            </button>
                            <button onClick={() => handleDelete(cat.id)} className="p-1 rounded hover:bg-red-300">
                                <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                        </div>
                    </div>
                    {cat.children && (
                        <div className="ml-6 mt-2 space-y-2 p-3">
                            {renderChildren(cat.children)}
                        </div>
                    )}
                </div>
            )
        })
    }
    return (
        <>
            <ToastContainer position="top-right" style={{zIndex: 999}} autoClose={2000} />
            <main className="container py-4 mx-auto">
                <div className="flex flex-wrap justify-center md:justify-between items-center gap-2 px-2">
                    <h2 className="text-2xl font-bold">Categories</h2>
                    <button onClick={() => setIsCategoryOpen(true)} className="z-1 fixed bottom-[50px] right-[20px] flex font-bold items-center gap-2 hover:text-white hover:bg-black transition duration-200 rounded-3xl bg-green-500 px-4 py-2 group">
                        <span className="text-sm md:text-2xl flex justify-center items-center group-hover:animate-bounce">
                            Add Category
                            <Plus />
                        </span>
                    </button>
                    <AddCategory setIsCategoryOpen={setIsCategoryOpen} isCategoryOpen={isCategoryOpen} />
                    <EditCategory setIsCategoryEditOpen={setIsCategoryEditOpen} isCategoryEditOpen={isCategoryEditOpen} item={item} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-2 px-2">
                    {renderChildren(data)}
                </div>
            </main>
        </>

    )
}

export default Categories;