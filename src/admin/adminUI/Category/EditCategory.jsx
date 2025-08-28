import { Rotate3D, X } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Modal from "../Modal"
import { useEditCategoryMutation } from "../../../strore/guessApi"

function EditCategory({isCategoryEditOpen, setIsCategoryEditOpen, item}) {
    const [name, setName] = useState("")
    const [slug, setSlug] = useState("")
    const [parentId, setParentId] = useState("")
    const [editCategory, { isLoading }] = useEditCategoryMutation()
    useEffect(() => {
        setName(item?.name)
        setSlug(item?.slug)
        setParentId(item?.parentId)
    }, [item])
    const getParams = () => {
        setName(item.name)
        setSlug(item.slug)
        setParentId(item.parentId)
    }
    const handleEditCategory = async () => {
        if (!name || !slug) {
            toast.error('Please fill all fields')
        }
        else if (name === item.name && slug === item.slug && parentId === item.parentId) {
            toast.info("Nothing has changed!")
            setIsCategoryEditOpen(false)
        }
        else {
            try {
                await editCategory({ params: { name, slug, parentId }, id: item.id }).unwrap()
                toast.success('Category successfully edited')
                setName('')
                setSlug('')
                setParentId('')
                setIsCategoryEditOpen(false)
            } catch (error) {
                const msg = Array.isArray(error.data.message)
                    ? error.data.message[0]
                    : error.data.message || "An unexpected error occurred"
                toast.error(msg)
            }
        }
    }
    return (
        isCategoryEditOpen && (
            <Modal>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Edit Category</h2>
                    <button onClick={() => {
                            setIsCategoryEditOpen(false)
                            getParams()
                        }} 
                        className="text-gray-500 hover:text-gray-800 text-2xl"
                    >
                        <X />
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category Name</label>
                        <input
                            onInput={(e) => setName(e.target.value)}
                            value={name ?? ''}
                            type="text"
                            placeholder="Enter name"
                            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Slug</label>
                        <input
                            onInput={(e) => setSlug(e.target.value)}
                            value={slug ?? ''}
                            type="text"
                            placeholder="Enter slug"
                            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Parent ID</label>
                        <input
                            onInput={(e) => setParentId(e.target.value)}
                            value={parentId ?? ''}
                            type="number"
                            min="1"
                            placeholder="Optional parent ID (default null)"
                            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex justify-end pt-4">
                        <button onClick={handleEditCategory} type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            {isLoading ? <Rotate3D size={25} className="animate-spin" /> : "Save"}
                        </button>
                    </div>
                </div>
            </Modal>
        )
    )
}

export default EditCategory