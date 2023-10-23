import { getDetailProduct } from '@/actions/product';
import LoadingPage from '@/components/LoadingPage';
import { selectorDetailProduct } from '@/types/actions/detailProduct';
import { item } from '@/types/actions/product';
import { typeActiveProduct } from '@/types/typeProduct';
import { formatPrice } from '@/utils/formatPrice';
import { ChevronRightIcon, StarIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const detailProduct: item<string, number> = useSelector((state: selectorDetailProduct<string, number>) => state.productDetailReducer.productDetail)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<item<string, number>>();

    useEffect(() => {
        if (productId) {
            dispatch(getDetailProduct(productId));
            setIsLoading(true);
        }

    }, [dispatch, productId]);
    useEffect(() => {
        setTimeout(() => {
            setData(detailProduct);
            setIsLoading(false);
        }, 500)
    }, [detailProduct])
    console.log(data)
    return (
        <div className="w-full">
            <div className="font-semibold text-[20px] flex space-x-4 items-center pt-3">
                <Link to="/manage-products" className="hover:text-main">Danh sách sản phẩm</Link>
                <ChevronRightIcon className="w-5 h-5" />
                <p className="text-main">Chi tiết sản phẩm</p>
            </div>
            {isLoading
                ? <LoadingPage />
                : (
                    <div className="flex py-7">
                        <div className="w-[60%]">
                            <div className="bg-white p-5 text-[17px] rounded-lg">
                                <div className='flex justify-between items-center'>
                                    <p className='font-semibold text-[20px]'>{data?.name}</p>
                                    <div className='flex w-[150px] space-x-2 p-2 items-center border-2 border-gray-200 rounded-lg'>
                                        <div className={`w-2 h-2 rounded-full ${data?.status === typeActiveProduct.Active ? "bg-green-600" : "bg-black"}`}></div>
                                        <p className='font-semibold text-[14px]'>
                                            {data?.status}
                                        </p>
                                    </div>
                                </div>
                                <p className='py-3 text-[#6B7280] text-[15px]'>{data?.description}</p>
                                <p className='font-semibold text-[19px] pb-4'> Chi tiết</p>
                                <div className='flex justify-between text-[#6B7280]'>
                                    <div className='space-y-5'>
                                        <p>Các loại xe</p>
                                        <p>Loại</p>
                                        <p>Giá</p>
                                        <p>Trạng thái giảm giá</p>
                                        <p>Phần trăm chiết khấu</p>
                                        {data?.discount && <p>Giá sau khuyến mãi</p>}
                                    </div>
                                    <div className='space-y-5 flex flex-col items-center'>
                                        <select className='outline-none border-2 border-gray-200 p-1 rounded-md'>
                                            <option value="">Xe phù hợp</option>
                                            {data?.vehicles?.map((item, index) => (
                                                <option key={index} value="">{item.vehicleName}</option>
                                            ))}
                                        </select>
                                        <p>{data?.category?.categoryName}</p>
                                        <p>{formatPrice(data?.priceCurrent)}VNĐ</p>
                                        <p>{data?.discount ? "Có" : "Không"}</p>
                                        <p>{data?.discount ? data?.discount.discountAmount : "0"}%</p>
                                        {data?.discount && <p>{formatPrice(data?.priceCurrent * (1 - data?.discount.discountAmount / 100))}VNĐ</p>}
                                    </div>
                                </div>
                                {data?.discount && (
                                    <div className="pt-5">
                                        <p className='font-semibold'>Đã áp dụng khuyến mãi</p>
                                        <div className='flex py-3 items-center'>
                                            <img src={data?.discount.imageUrl} alt="" className='w-7 h-7' />
                                            <p className='pl-3'>{data?.discount.title}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="w-[40%] font-semibold pl-[40px]">
                            <div className="flex space-x-16 items-center pb-5">
                                <p className=' text-[20px] '>Ảnh sản phẩm</p>
                                <button className='bg-white p-1 px-2 rounded-md hover:bg-main hover:text-white'

                                >
                                    Đổi ảnh
                                </button>
                            </div>
                            <div className='bg-white w-[200px] h-[200px] rounded-lg flex justify-center items-center shadow-lg'>
                                <img src={data?.images[0]?.imageUrl} alt="" className='w-[180px] h-[180px] object-cover' />
                            </div>

                            <div className='bg-white mt-10 p-5 rounded-lg'>
                                <div className='flex justify-between items-center pb-5'>
                                    <p className='text-[20px]'>Tổng ảnh</p>
                                    <button
                                        className='px-2 py-1 border-2 border-gray-200 rounded-lg hover:bg-main hover:text-white'

                                    >Sửa kho ảnh
                                    </button>
                                </div>
                                <div className='grid grid-cols-3 gap-y-4'>
                                    {data?.images && data?.images.map((item, index) => (
                                        <div className='bg-white w-[190px] h-[190px] rounded-lg flex justify-center items-center shadow-lg' key={index}>
                                            <img src={item.imageUrl} alt="" className='w-[170px] h-[170px] object-cover' />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            <div className='bg-white px-[5%]  py-5 space-y-5'>
                <p className='text-[20px] font-semibold'>Nhận xét sản phẩm</p>
                <div className='bg-[#D8D8D8] rounded-lg p-3 flex'>
                    <div className='flex flex-col items-center pr-5'>
                        <p className='text-[30px] text-[#EA1818]'>5 trên 5</p>
                        <div className='flex space-x-3'>
                            {[1, 2, 3, 4, 5].map((index) => (
                                <StarIcon key={index} className='w-9 h-9 stroke-[#EA1818] fill-[#EA1818]' />
                            ))}
                        </div>
                    </div>
                    <div className='flex font-semibold space-x-9 text-[20px]'>
                        <button className='px-7 h-[40px] border-2 border-[#EA1818] text-[#EA1818] bg-white'>All</button>
                        <button className='px-7 h-[40px] border-2 border-gray-400 text-gray-300 bg-white'>5 sao (12)</button>
                        <button className='px-7 h-[40px] border-2 border-gray-400 text-gray-300 bg-white'>4 sao (2) </button>
                        <button className='px-7 h-[40px] border-2 border-gray-400 text-gray-300 bg-white'>3 sao (10) </button>
                        <button className='px-7 h-[40px] border-2 border-gray-400 text-gray-300 bg-white'>2 sao (2) </button>
                        <button className='px-7 h-[40px] border-2 border-gray-400 text-gray-300 bg-white'>1 sao (1) </button>
                    </div>
                </div>
                {/* {data?.feedbackProducts
                    ? (
                        <div className=''>
                            {data?.feedbackProducts.map((item, index) => (*/}
                                <div> 
                <div className='flex'>
                    {/* {item?.customer?.avatar
                                            ? (
                                                <img src={item?.customer.avatar} alt="" className='w-[60px] h-[70px] rounded-full object-cover' />
                                            ) :  */}
                    <img src={'https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain3.webp'} alt="" className='w-[90px] h-[90px] rounded-full object-cover' />
                    {/* } */}

                    <div className='pl-[30px] flex flex-col justify-start items-start space-y-4'>
                        <p className='font-semibold text-[18px]'>Vip sieu cap pro</p>
                        <div className='flex space-x-3'>
                            {[1, 2, 3, 4, 5].map((index) => (
                                <StarIcon key={index} className='w-5 h-5 stroke-[#EA1818] fill-[#EA1818]' />
                            ))}
                        </div>
                        <p className='text-[#9D9D9D]'>17:54 | 07-09-2023 </p>
                    </div>
                </div>
                <div className='mt-5 bg-[#D8D8D8] opacity-30 rounded-full py-4 px-7'>
                    Latest model CNC brake lever for Honda SH 2 disc brakes (SH 125/150i, SH300i, SH350i) all generations... Beautiful CNC, sharp details, chosen by many customers. Latest model CNC brake lever for Honda SH 2 disc brakes (SH 125/150i, SH300i, SH350i) all generations... Beautiful CNC, sharp details, chosen by many customers.
                    
                </div>
            </div>
            {/* ))}
                        </div>
                    ) : (
                        ""
                    )} */}
        </div>



        </div >
    )
}

export default ProductDetail