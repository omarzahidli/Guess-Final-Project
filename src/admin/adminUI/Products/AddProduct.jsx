import { Loader, Rotate3D, Upload, X } from "lucide-react"
import { useAddProductMutation, useGetAllCategoriesQuery, useUploadImagesMutation } from "../../../strore/guessApi"
import Modal from "../Modal"
import { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify";

const colors = [
  "Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Pink", "Brown", "Black", "White", "Gray", "Beige", "Ivory",
  "Teal", "Turquoise", "Lime", "Olive", "Maroon", "Navy", "Indigo", "Gold", "Silver", "Bronze", "Coral", "Salmon",
  "Mint", "Lavender", "Charcoal", "Peach", "Mustard", "Sand", "Sky", "Plum", "Emerald", "Ruby", "Sapphire"
];

const sizes = [
  "XS", "S", "M", "L", "XL", "XXL", "XXXL", "XXS", "XXXS",
  "EU 36", "EU 37", "EU 38", "EU 39", "EU 40", "EU 41", "EU 42", "EU 43", "EU 44", "EU 45", "EU 46", "EU 47"
];

function AddProduct({isProductOpen, setIsProductOpen}) {
    const [ addProduct, {isLoading} ] = useAddProductMutation()
    const {data: categories, isLoading: isLoadingCat}  = useGetAllCategoriesQuery()
    const [uploadImage, {isLoading: isImageLoading}] = useUploadImagesMutation()

    const [productName, setProductName] = useState()
    const [productDesc, setProductDesc] = useState()
    const [productPrice, setProductPrice] = useState()
    const [productColors, setProductColors] = useState([])
    const [productSizes, setProductSizes] = useState([])
    const [previewImages, setPreviewImages] = useState([])
    const [productSlug, setProductSlug] = useState()
    const [productCategory, setProductCategory] = useState()
    const [selectedIds, setSelectedIds] = useState([])

    useEffect(() => setProductCategory(selectedIds[selectedIds.length - 1]), [selectedIds])       

    const handleColorChange = (e) => {
        const { value, checked } = e.target;
        setProductColors(prev =>  checked ? [...prev, value] : prev.filter(c => c !== value));
    }
    const handleSizeChange = (e) => {
        const { value, checked } = e.target;
        setProductSizes(prev =>  checked ? [...prev, value] : prev.filter(c => c !== value));
    }

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files)
        const previews = files.map(file => ({
            url: URL.createObjectURL(file),
            file
        }))
        setPreviewImages(prevImages => [...prevImages, ...previews]);
    };

    function handleImageDelete(id) {
        setPreviewImages(prevImages => prevImages.filter((_, idx) => idx !== id))
    }
    const handleSaveProduct = async () => {
        if (!productName || !productDesc || !productPrice || !productColors.length || !productSizes.length || !previewImages.length || !productSlug || !productCategory) {
            toast.error('Please fill all fields');
        }
        else {
            const loadingToastId = toast.loading("Uploading images...");
            try {
                const uploadedImages = [];
                for (const img of previewImages) {
                    const formData = new FormData();
                    formData.append("image", img.file);
                    const result = await uploadImage(formData).unwrap();
                    if (result?.id) uploadedImages.push(result.id);
                }
    
                toast.dismiss(loadingToastId);
                toast.success(uploadedImages.length > 1 ? "Images uploaded successfully!" : "Image uploaded successfully!");
    
                await addProduct({
                    productName,
                    productDesc,
                    productPrice,
                    productColors,
                    productSizes,
                    uploadedImages,
                    productSlug,
                    productCategory
                }).unwrap();
    
                toast.success('Product successfully added');
                setProductName('');
                setProductDesc('');
                setProductPrice('');
                setProductColors([]);
                setProductSizes([]);
                setPreviewImages([]);
                setProductSlug('');
                setProductCategory('');
                setIsProductOpen(false);
    
            } catch (error) {
                toast.dismiss(loadingToastId);
                const msg = Array.isArray(error?.data?.message)
                    ? error.data.message[0]
                    : error?.data?.message || "An unexpected error occurred";
                toast.error(msg);
            }
        }
    }


    function CategoryDropdown({ categories, level = 0, selectedIds, setSelectedIds}) {
        const selectedId = selectedIds[level] || "";
        const selectedCategory = categories.find(cat => cat.id === Number(selectedId));

        function handleChange(e) {
            const value = e.target.value;
            const newSelected = [selectedIds];
            newSelected[level] = value;
            newSelected.length = level + 1;
            setSelectedIds(newSelected);
        }

        return (
            <>
            <select
                value={String(selectedId)}
                onChange={handleChange}
                className="mt-1 w-full border rounded px-3 py-2"
            >
                <option disabled value="">
                    Select a {level === 0 ? "Category" : "Subcategory"}*
                </option>
                {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                    {cat.name}
                </option>
                ))}
            </select>

            {selectedCategory?.children?.length > 0 && (
                <CategoryDropdown
                    categories={selectedCategory.children}
                    level={level + 1}
                    selectedIds={selectedIds}
                    setSelectedIds={setSelectedIds}
                />
            )}
            </>
        );
    }
    return (
        isProductOpen && (
            <Modal>
                <ToastContainer position="top-right" style={{zIndex: 999}} autoClose={2000} />
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Add Product</h2>
                    <button onClick={() => {
                        setIsProductOpen(false)
                        setPreviewImages([])
                    }} 
                    className="text-gray-500 hover:text-gray-800 text-2xl"
                    >
                        <X />
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            onInput={(e) => setProductName(e.target.value)}
                            type="text"
                            placeholder="Enter name"
                            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <input
                            onInput={(e) => setProductDesc(e.target.value)}
                            type="text"
                            placeholder="Enter Description"
                            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            onInput={(e) => setProductPrice(e.target.value)}
                            type="number"
                            min="1"
                            placeholder="Enter Price"
                            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    
                    <div>
                        <label className="block mb-1 font-medium">Colors</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-40 overflow-y-auto border p-2 rounded">
                            {colors.map((color, index) => (
                            <label key={index} className="flex items-center">
                                <input value={color} onInput={handleColorChange} type="checkbox" className="mr-2" />
                                {color}
                            </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Sizes</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-40 overflow-y-auto border p-2 rounded">
                            {sizes.map((size, index) => (
                            <label key={index} className="flex items-center">
                                <input value={size} onInput={handleSizeChange} type="checkbox" className="mr-2" />
                                {size}
                            </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Images</label>
                        <input
                            onChange={handleFileChange}
                            type="file"
                            multiple
                            accept="image/*"
                            className="w-full text-sm border text-gray-500 rounded cursor-pointer p-2"
                        />
                        <p className="flex items-center gap-1 my-1 text-xs text-gray-500">PNG, JPG, JPEG (you can select multiple) {isImageLoading ? <Loader className="animate-spin text-gray-300 text-xs" /> : ""}</p>
                        <div className="overflow-auto w-full flex gap-2">
                            {
                                previewImages?.map((img, idx) => {
                                    return(
                                        <div className="relative max-w-[100px]" key={idx}>
                                            <X size={16} onClick={() => handleImageDelete(idx)} className="bg-red-500 text-white rounded-full absolute top-1 right-1 z-1" />
                                            <img className="min-w-[100px] rounded-2xl" src={img.url} alt={idx} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>  

                    <div>
                        <label className="block mb-1 font-medium">Slug</label>
                        <input onInput={(e) => setProductSlug(e.target.value.toLowerCase().split(' ').join('-'))} type="text" className="w-full p-2 border rounded" placeholder="unique-product-slug" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <CategoryDropdown 
                            categories={categories} 
                            selectedIds={selectedIds}
                            setSelectedIds={setSelectedIds}
                        />
                    </div>

                    <div className="flex justify-end pt-4">
                        <button onClick={handleSaveProduct}
                            type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            {isLoading ? <Rotate3D size={25} className="animate-spin" /> : "Save"}
                        </button>
                    </div>
                </div>
            </Modal>
        )
    )
}

export default AddProduct