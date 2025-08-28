import { Rotate3D, X } from "lucide-react"
import Modal from "../Modal"
import { useState } from "react"
import { useAddCategoryMutation } from "../../../strore/guessApi"
import { toast } from "react-toastify"

function AddCategory({isCategoryOpen, setIsCategoryOpen}) {
    const [name, setName] = useState('')
    const [slug, setSlug] = useState('')
    const [parentId, setParentId] = useState(null)
    const [addCategory, { isLoading }] = useAddCategoryMutation()
    const handleSaveCategory = async () => {
        if (!name || !slug) {
            toast.error('Please fill all fields')
        }
        else {
            try {
                await addCategory({ name, slug, parentId: parentId ? parentId : null}).unwrap()
                toast.success('Category successfully added')
                setName('')
                setSlug('')
                setParentId('')
                setIsCategoryOpen(false)
            } catch (error) {
                console.log(error);
                const msg = Array.isArray(error.data.message)
                    ? error.data.message[0]
                    : error.data.message || "An unexpected error occurred"
                toast.error(msg)
            }
        }
    }
    return (
        isCategoryOpen && (
            <Modal>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Add Category</h2>
                    <button onClick={() => setIsCategoryOpen(false)} className="text-gray-500 hover:text-gray-800 text-2xl"><X /></button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category Name</label>
                        <input
                            onInput={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Enter name"
                            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Slug</label>
                        <input
                            onInput={(e) => setSlug(e.target.value)}
                            type="text"
                            placeholder="Enter slug"
                            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Parent ID</label>
                        <input
                            onInput={(e) => setParentId(e.target.value)}
                            type="number"
                            min="1"
                            placeholder="Optional parent ID (default null)"
                            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex justify-end pt-4">
                        <button onClick={handleSaveCategory} type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            {isLoading ? <Rotate3D size={25} className="animate-spin" /> : "Save"}
                        </button>
                    </div>
                </div>
            </Modal>
        )
    )
}

export default AddCategory