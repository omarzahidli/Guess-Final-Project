import { useAdd2BasketMutation, useDeleteFromBasketMutation, useGetAllCategoriesQuery } from '../../strore/guessApi';
import { Loader2, Minus, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router';

function BasketProduct({data}) {
    const {data: categories} = useGetAllCategoriesQuery()
    const parent = categories?.find(cat => cat.children?.some(sub => sub.id === data.product.categoryId))
    const child = parent?.children?.find(sub => sub.id === data.product.categoryId)
    const navigate = useNavigate()
    
    const [deleteFromBasket, {isLoading: isDeleting}] = useDeleteFromBasketMutation()
    async function handleDeleteBasket() {
        try {
            await deleteFromBasket(data?.id).unwrap();
        } catch (error) {
            console.error(error)
        }
    }
    const [add2Basket, {isLoading: isHandling}] = useAdd2BasketMutation()
    async function handleBasket(val = 1) {
        try {
            await add2Basket({
                id: data.product.id,
                color: data.product.colors[0],
                size: data.product.sizes[0],
                quantity: val,
            }).unwrap();
        } catch (error) {
            console.error(error)
        }
    }
    
    return (
        <>
            {(isDeleting || isHandling) &&
                <div className="fixed inset-0 bg-[#ffffff50] w-screen z-100 h-screen flex justify-center items-center">
                    <Loader2 size={100} className="animate-spin" /> 
                </div>    
            }
            <div className='flex w-full justify-between md:items-start'>
                <div className='min-w-[70px] max-w-[95px]'>
                    <img onClick={() => navigate(`/guess/${parent?.name?.toLowerCase()}/${child?.name?.split(" ").join("").toLowerCase()}/${data?.product?.slug}?id=${data?.product?.id}`)} className='min-w-full cursor-pointer' src={data?.product?.images[0].url} alt={data.product.name} />
                </div>
                <div onClick={() => navigate(`/guess/${parent?.name?.toLowerCase()}/${child?.name?.split(" ").join("").toLowerCase()}/${data?.product?.slug}?id=${data?.product?.id}`)} className='cursor-pointer group px-3.5 md:flex-col hidden md:flex max-w-[200px]'>
                    <h4 className='uppercase text-sm font-semibold text-[#1d1d1d] group-hover:underline'>{data.product.name}</h4>
                    <span className='text-xs text-[#212121]'>{data.color}</span>
                </div>
                <span className='hidden md:inline'>{data.size}</span>
                <div className='flex flex-col md:flex-row justify-center'>
                    <div className='px-3.5 flex flex-col md:hidden'>
                        <h4 className='uppercase text-sm font-semibold text-[#1d1d1d]'>{data.product.name}</h4>
                        <span className='text-xs text-[#212121]'>{data.color}</span>
                    </div>
                    <div className='px-3.5 flex flex-col md:flex-row'>
                        <span className='text-[#aaaaaa] text-sm md:hidden'>Size: {data.size}</span>
                        <div className='flex items-center pb-2.5'>
                            <span className='text-[#212121] font-semibold text-xl pe-2 md:hidden'>QT.</span>
                            <button onClick={() => handleBasket(-1)} className='border w-7.5 h-7.5 flex justify-center items-center'><Minus /></button>
                            <button className='border w-7.5 h-7.5 flex justify-center items-center'>{data.quantity}</button>
                            <button onClick={() => handleBasket(1)} className='border w-7.5 h-7.5 flex justify-center items-center'><Plus /></button>
                        </div>
                        <span className='py-2.5 text-[#212121] text-sm md:hidden'>{data.price} &euro;</span>
                    </div>
                </div>
                <div className='flex items-center self-start'>
                    <span className='whitespace-nowrap text-[#212121] text-sm hidden md:inline'>{data.price} &euro;</span>
                    <X onClick={() => handleDeleteBasket()} />
                </div>
            </div>
        </>
    )
}

export default BasketProduct