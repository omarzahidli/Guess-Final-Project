import { useNavigate, useParams, useSearchParams } from "react-router"
import { useFilterProductsQuery, useGetAllCategoriesQuery } from "../../strore/guessApi"
import ProductCard from "../components/ProductCard"
import { Check, ChevronDown, LayoutGrid, Loader2, SlidersHorizontal, Square, X } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useEffect, useRef, useState } from "react"
import "../../../colors.css"
import Slider from "rc-slider"
import "rc-slider/assets/index.css"

function List() {
    const {category} = useParams()
    const [search] = useSearchParams()
    const navigate = useNavigate()
    const id = search.get("id")
    const [grid, setGrid] = useState(false)
    const {data: categories} = useGetAllCategoriesQuery()
    const subCategoryName = categories?.find(cat => cat.name.toLowerCase() === category)?.children?.find(child => child.id == id)?.name    
    const [filterModal, setFilterModal] = useState(false)
    const [sortBy, setSortBy] = useState(false)
    const [sortProp, setSortProp] = useState(null)
    const [colorFilter, setColorFilter] = useState(false)
    const [selectedColors, setSelectedColors] = useState([])
    const [sizeFilter, setSizeFilter] = useState(false)
    const [selectedSizes, setSelectedSizes] = useState([])
    const [priceFilter, setPriceFilter] = useState(false)
    const sliderRef = useRef(null)
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
    const [range, setRange] = useState(null);
    const [colorsToShow, setColorsToShow] = useState([]);
    const [sizesToShow, setSizesToShow] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedData?.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(sortedData.length / productsPerPage);

    const selectedSizesStr = selectedSizes?.map(size => `&sizes=${size}`).join('') || '';
    const selectedColorsStr = selectedColors?.map(color => `&colors=${color}`).join('') || '';
    const selectedPricesStr = range ? `&minPrice=${range[0]}&maxPrice=${range[1]}` : '';
    const string = `categoryId=${id}${selectedColorsStr}${selectedSizesStr}${selectedPricesStr}`;
    const { data, isError, isLoading } = useFilterProductsQuery(string);
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setMinPrice(null);
        setMaxPrice(null);
        setRange([0, 0]);
        setColorsToShow([]);
        setSizesToShow([]);
        setSelectedColors([]);
        setSelectedSizes([]);
        setSortProp(null);
        setFilterModal(false);
    }, [category, subCategoryName]);
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage])

    useEffect(() => {
        setCurrentPage(1);
    }, [sortedData, selectedColors, selectedSizes, range]);
    useEffect(() => {
        if (data && data.length > 0 && minPrice === null && maxPrice === null) {
            const prices = data.map(p => p.price);
            setMinPrice(Math.min(...prices));
            setMaxPrice(Math.max(...prices));
        }
    }, [data, minPrice, maxPrice]);

    useEffect(() => {
        if (minPrice !== null && maxPrice !== null) {
            setRange([minPrice, maxPrice]);
        }
    }, [minPrice, maxPrice]);

    const colorsOrder = [
    "Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Pink", "Brown", "Black", "White", "Gray", "Beige", "Ivory",
    "Teal", "Turquoise", "Lime", "Olive", "Maroon", "Navy", "Indigo", "Gold", "Silver", "Bronze", "Coral", "Salmon",
    "Mint", "Lavender", "Charcoal", "Peach", "Mustard", "Sand", "Sky", "Plum", "Emerald", "Ruby", "Sapphire"
    ];

    const sizesOrder = [
    "XS", "S", "M", "L", "XL", "XXL", "XXXL", "XXS", "XXXS",
    "EU 36", "EU 37", "EU 38", "EU 39", "EU 40", "EU 41", "EU 42", "EU 43", "EU 44", "EU 45", "EU 46", "EU 47"
    ];

    useEffect(() => {
        const showColors = sortedData?.reduce((acc, prod) => {
            if (!selectedSizes || selectedSizes.length === 0 || prod.sizes.some(sz => selectedSizes.includes(sz))) {
            prod.colors?.forEach(color => {
                const existing = acc.find(item => item.color === color);
                if (existing) existing.count += 1;
                else acc.push({ color, count: 1 });
            });
            }
            return acc;
        }, []) || [];
        const sortedColors = showColors.sort((a, b) => {
            const indexA = colorsOrder.indexOf(a.color);
            const indexB = colorsOrder.indexOf(b.color);
            return indexA - indexB;
        });
        const showSizes = sortedData?.reduce((acc, prod) => {
            if (!selectedColors || selectedColors.length === 0 || prod.colors.some(c => selectedColors.includes(c))) {
            prod.sizes?.forEach(size => {
                const existing = acc.find(item => item.size === size);
                if (existing) existing.count += 1;
                else acc.push({ size, count: 1 });
            });
            }
            return acc;
        }, []) || [];
        const sortedSizes = showSizes.sort((a, b) => {
            const indexA = sizesOrder.indexOf(a.size);
            const indexB = sizesOrder.indexOf(b.size);
            return indexA - indexB;
        });


        setColorsToShow(sortedColors);
        setSizesToShow(sortedSizes);
    }, [sortedData, selectedColors, selectedSizes]);


    const darkColors = ["red","blue","green","purple","brown","black","navy","maroon","indigo","charcoal","emerald","ruby","sapphire"]

    useEffect(() => {
        if (!data) return;

        let sorted = [...data];

        switch (sortProp) {
            case "Price Ascending":
            sorted.sort((a, b) => a.price - b.price);
            break;
            case "Price Descending":
            sorted.sort((a, b) => b.price - a.price);
            break;
            case "New Arrivals":
            sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
        }
        setSortedData(sorted);
    }, [data, sortProp]);

    useEffect(() => {
        const sliderElement = sliderRef.current
        const handleTouchMove = (event) => {
            if (event.cancelable) {
                event.preventDefault()
            }
        }
        if (sliderElement) {
            sliderElement.addEventListener('touchmove', handleTouchMove, { passive: false })
        }
        return () => {
            if (sliderElement) {
                sliderElement.removeEventListener('touchmove', handleTouchMove)
            }
        }
    }, [])




    function clearFilter() {
        setSelectedColors([])
        setSelectedSizes([])
        setRange([minPrice, maxPrice])
        setSortProp(null)
        setFilterModal(false)
    }

    function handleFilter(setter) {
        setFilterModal(true)
        setter && setter(true)
    }

    function closeFilters() {
        setColorFilter(false)
        setSizeFilter(false)
        setPriceFilter(false)
        setSortBy(false)
        setFilterModal(false)
    }

    

    return (
        <>
            <Header>
                <div className="sticky top-0 bg-white lg:flex p-3 gap-10 px-[15px] overflow-auto flex-nowrap whitespace-nowrap lg:px-[24px] hidden">
                    {categories?.find(cat => cat.name.toLowerCase() === category)?.children?.map(child => (
                        <p onClick={() => navigate(`/guess/${category}/${child.name.toLowerCase().split(' ').join('')}?id=${child.id}`)} className={`${child.name == "Sale" ? "text-red-500 hover:text-red-700 " : "text-gray-500 hover:text-black "} text-sm cursor-pointer transition duration-100`} key={child.id}>{child.name}</p>
                    ))}
                </div>
            </Header>
            <main>
                {isLoading ? 
                    <div className="h-screen flex justify-center items-center z-100">
                        <Loader2 size={100} className="animate-spin" /> 
                    </div>
                    :
                    <>
                    
                        <div className="flex justify-between items-center px-6 py-4">
                            <div className="gap-1 flex text-sm cursor-pointer">
                                <span onClick={() => navigate("/")} className="text-gray-500">Guess</span>/<span className="text-gray-500 capitalize" onClick={() => navigate(`/guess/${category}`)}>{category}</span>/<span className="text-gray-500">{subCategoryName}</span>
                            </div>
                            <div className="flex gap-2">
                                <Square onClick={() => setGrid(true)} className="text-gray-500" />
                                <LayoutGrid onClick={() => setGrid(false)} className={`${grid ? "text-gray-500 fill-gray-500" :  "fill-black"}`} />
                            </div>
                        </div>
                        <h2 className="px-6 text-2xl font-semibold">View All ({isError ? 0 : currentProducts?.length || 0})</h2>
                        <div className="px-6 flex gap-2 pt-2 overflow-auto whitespace-nowrap">
                            <button onClick={() => handleFilter(setColorFilter)} className="bg-[#fafafa] text-gray-600 rounded px-3 py-1 flex items-center justify-center gap-2">Colors <span className={`bg-black w-6 h-6 justify-center items-center rounded-full hidden ${selectedColors?.length && "lg:flex"} text-white`}>{selectedColors?.length}</span></button>
                            <button onClick={() => handleFilter(setSizeFilter)} className="bg-[#fafafa] text-gray-600 rounded px-3 py-1 flex items-center justify-center gap-2">Sizes <span className={`bg-black w-6 h-6 justify-center items-center rounded-full hidden ${selectedSizes?.length && "lg:flex"} text-white`}>{selectedSizes?.length}</span></button>
                            <button onClick={() => handleFilter(setPriceFilter)} className="bg-[#fafafa] text-gray-600 rounded px-3 py-1">Price</button>
                            <button onClick={() => handleFilter(setSortBy)} className={`bg-[#fafafa] text-gray-600 rounded px-3 py-1 break-keep flex items-center justify-center gap-2 ${sortProp?.length && "font-bold" }`}>Sort by</button>
                            <button onClick={() => handleFilter()} className="bg-[#fafafa] text-gray-600 rounded px-3 py-1 flex gap-1"><SlidersHorizontal />Narrow by</button>
                        </div>
                        <div onClick={() => closeFilters()} className={`${filterModal ? 'block' : 'hidden'} fixed inset-0 bg-[#0005] z-100 w-full h-screen`}>
                            <div onClick={(e) => e.stopPropagation()} className="lg:fixed overflow-auto lg:right-0 lg:top-0 lg:!w-[480px] flex flex-col h-full bg-white border-gray-400 w-full">
                                <div className="flex justify-between items-center border-b p-8 border-gray-400 w-full">
                                    <span className="text-xl font-semibold">Filter and sort</span>
                                    <X onClick={() => closeFilters()} />
                                </div>
                                <div>
                                    <div className="border-b border-gray-400 flex flex-col justify-center px-8">
                                        <div onClick={() => setSortBy(!sortBy)} className="my-5 flex justify-between items-center">
                                            <div className="flex flex-col">
                                                <span className="font-semibold">Sort by</span>
                                                {sortProp && <span className="text-gray-400 text-sm">{sortProp}</span> }
                                            </div>
                                            <ChevronDown className={`${sortBy && 'rotate-180'} transition duration-150`} />
                                        </div>
                                        {sortBy && 
                                            <div className="flex flex-col items-start py-5 gap-2">
                                                <label className="flex items-center gap-2" htmlFor="new">
                                                    <input onClick={(e) => setSortProp(e.target.value)} className="accent-black" checked={sortProp == "New Arrivals" ? true : false} id="new" name="sort" value="New Arrivals" type="radio" />
                                                    New Arrivals
                                                </label> 
                                                <label className="flex items-center gap-2" htmlFor="asc">
                                                    <input onClick={(e) => setSortProp(e.target.value)} className="accent-black" checked={sortProp == "Price Ascending" ? true : false} id="asc" name="sort" value="Price Ascending" type="radio" />
                                                    Price Ascending
                                                </label> 
                                                <label className="flex items-center gap-2" htmlFor="desc">
                                                    <input onClick={(e) => setSortProp(e.target.value)} className="accent-black" checked={sortProp == "Price Descending" ? true : false} id="desc" name="sort" value="Price Descending" type="radio" />
                                                    Price Descending
                                                </label> 
                                            </div>
                                        }
                                    </div>
                                    <div className="border-b border-gray-400 flex flex-col justify-center px-8">
                                        <div onClick={() => setColorFilter(!colorFilter)} className="my-5 flex justify-between items-center">
                                            <div className="flex flex-col">
                                                <span className="font-semibold">Colors</span>
                                                {selectedColors && <span className="text-gray-400 text-sm">{selectedColors.join(", ")}</span>}
                                            </div>
                                            <ChevronDown className={`${colorFilter && 'rotate-180'} transition duration-150`} />
                                        </div>
                                        {colorFilter && 
                                            <div className="grid grid-cols-2 py-5 gap-2">
                                                {colorsToShow.map((clr, idx) => (
                                                    <div key={idx} onClick={() => selectedColors?.includes(clr.color) ? setSelectedColors(selectedColors?.filter(c => c !== clr.color)) : setSelectedColors([...selectedColors, clr.color])} className="flex items-center gap-2">
                                                        <span className={`${clr.color.toLowerCase()} w-6 h-6 border relative flex items-center justify-center`}>
                                                            <Check className={`${selectedColors?.includes(clr.color) && "opacity-100"} absolute ${darkColors.includes(clr.color.toLowerCase()) ? "text-white" : "text-black"} duration-150 transition opacity-0`} />
                                                        </span>
                                                        <span>{clr.color} ({clr.count})</span>
                                                    </div>
                                                ))}
                                            </div>
                                        }
                                    </div>
                                    <div className="border-b border-gray-400 flex flex-col justify-center px-8">
                                        <div onClick={() => setSizeFilter(!sizeFilter)} className="my-5 flex justify-between items-center">
                                            <div className="flex flex-col">
                                                <span className="font-semibold">Sizes</span>
                                                {selectedSizes && <span className="text-gray-400 text-sm">{selectedSizes.join(", ")}</span>}
                                            </div>
                                            <ChevronDown className={`${sizeFilter && 'rotate-180'} transition duration-150`} />
                                        </div>
                                        {sizeFilter && 
                                            <div className="grid grid-cols-2 py-5 gap-2">
                                                {sizesToShow.map((szs, idx) => (
                                                    <div key={idx} onClick={() => selectedSizes?.includes(szs.size) ? setSelectedSizes(selectedSizes?.filter(s => s !== szs.size)) : setSelectedSizes([...selectedSizes, szs.size])} className="flex items-center gap-2">
                                                        <span className="w-6 h-6 border relative flex items-center justify-center">
                                                            <Check className={`${selectedSizes?.includes(szs.size) && "opacity-100"} absolute text-black duration-150 transition opacity-0`} />
                                                        </span>
                                                        <span>{szs.size} ({szs.count})</span>
                                                    </div>
                                                ))}
                                            </div>
                                        }
                                    </div>
                                    <div className="relative border-b border-gray-400 flex flex-col justify-center px-8">
                                        <div onClick={() => setPriceFilter(!priceFilter)} className="my-5 flex justify-between items-center">
                                            <div className="flex flex-col">
                                                <span className="font-semibold">Price</span>
                                                {range && <span className="text-gray-400 text-sm">{range[0] + "-" + range[1]}</span>}
                                            </div>
                                            <ChevronDown className={`${priceFilter && 'rotate-180'} transition duration-150`} />
                                        </div>
                                        {priceFilter && 
                                            <div className="py-5">
                                                <div className="flex items-center justify-between">
                                                    <div className="relative flex items-center">
                                                        <input
                                                            type="number"
                                                            value={range[0]}
                                                            disabled
                                                            className="border rounded max-w-[95px] px-4 py-1.5"
                                                        />
                                                        <span className="absolute right-0 px-2">&euro;</span>
                                                    </div>
                                                    <div className="relative flex items-center">
                                                        <input
                                                            type="number"
                                                            value={range[1]}
                                                            disabled
                                                            className="border rounded max-w-[95px] px-4 py-1.5"
                                                        />
                                                        <span className="absolute right-0 px-2">&euro;</span>
                                                    </div>
                                                </div>
                                                <div style={{ touchAction: 'none' }} className="relative w-full py-6 z-101">
                                                    <Slider
                                                        range={true}
                                                        min={minPrice}
                                                        max={maxPrice}
                                                        step={1}
                                                        value={range}
                                                        allowCross={false}
                                                        onChange={(value) => setRange(value)}
                                                        className="slider-custom"
                                                        styles={{
                                                            track: { backgroundColor: 'black' },
                                                            handle: { borderColor: 'black', boxShadow: 'none' },
                                                            rail: { backgroundColor: '#f0f0f0' }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="sticky left-0 bottom-0 w-full h-full flex items-end justify-center gap-4 p-4 bg-[#f5f5f5] z-101">
                                    <button onClick={() => clearFilter()} className="w-full text-[#555] font-bold underline border-2 rounded p-3 bg-white">Clear All</button>
                                </div>
                            </div>
                        </div>
                        {currentProducts.length == 0 ? 
                            <div className="py-4 lg:p-6 w-full text-xl px-6">
                                No results for such parameters!
                            </div>
                            :
                            <div className={`grid ${grid && "!px-0 !grid-cols-1"} lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-1 md:gap-2 py-4 lg:p-6 w-full`}>
                                {currentProducts?.map((prod, idx) => {
                                    return (
                                        <ProductCard key={idx} data={prod} cat={category} />
                                    )
                                })}
                            </div>
                        }
                        {totalPages > 1 && (
                            <div className="flex flex-wrap justify-center gap-2 py-4 px-4">
                                <button 
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                                className="px-3 py-1 border rounded text-sm sm:text-base disabled:opacity-50"
                                disabled={currentPage === 1}
                                >
                                Prev
                                </button>

                                {[...Array(totalPages)].map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentPage(idx + 1)}
                                    className={`px-3 py-1 border rounded text-sm sm:text-base ${currentPage === idx + 1 ? 'bg-black text-white' : 'bg-white text-black'}`}
                                >
                                    {idx + 1}
                                </button>
                                ))}

                                <button 
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                                className="px-3 py-1 border rounded text-sm sm:text-base disabled:opacity-50"
                                disabled={currentPage === totalPages}
                                >
                                Next
                                </button>
                            </div>
                        )}
                    </>
                }
            </main>
            <Footer />
        </>
    )
}

export default List