import { getDetailProduct } from '@/actions/product';
import LoadingPage from '@/components/LoadingPage';
import { selectorDetailProduct } from '@/types/actions/detailProduct';
import { item } from '@/types/actions/product';
import { typeActiveProduct } from '@/types/typeProduct';
import { formatDateFeedback } from '@/utils/formatDate';
import { formatPrice } from '@/utils/formatPrice';
import { ChevronRightIcon, StarIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react'
import { RxDotsHorizontal } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const detailProduct: item<string, number> = useSelector((state: selectorDetailProduct<string, number>) => state.productDetailReducer.productDetail)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showVehicle, setShowVehicle] = useState<boolean>(false);
    const [data, setData] = useState<item<string, number>>();

    useEffect(() => {
        if (productId) {
            dispatch(getDetailProduct(productId));
            setIsLoading(true);
        }

    }, [dispatch, productId]);
    useEffect(() => {
        setData(detailProduct);
        setTimeout(() => {
            setIsLoading(false);
        }, 500)
    }, [detailProduct])

    const handleBoxVehicle = () => {
        setShowVehicle(!showVehicle);
    }
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
                : (<div>
                    <div className="flex justify-between pt-5">
                        <div className="w-[70%]">
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
                                <p className='font-semibold text-[19px] py-4'> Chi tiết</p>
                                <div className='flex justify-between text-[#6B7280]'>
                                    <div className='space-y-5'>
                                        <p>Loại xe phù hợp</p>
                                        <p>Loại sản phẩm</p>
                                        <p>Giá bán</p>
                                        <p>Trạng thái giảm giá</p>
                                        <p>Phần trăm chiết khấu</p>
                                        {data?.discount && <p>Giá sau khuyến mãi</p>}
                                    </div>
                                    <div className='space-y-5 flex flex-col text-end'>
                                        <div className='flex justify-center space-x-1 relative'>
                                            {data?.vehicles && data?.vehicles.slice(0, 3).map((vehicle, index) => (
                                                <div key={index} className='px-1 py-2 border-2 border-gray-200 rounded-lg'>
                                                    <p>{vehicle.vehicleName}</p>

                                                </div>
                                            ))}
                                            {data?.vehicles && data?.vehicles.length > 3 && (
                                                <button className='p-1 border-2 border-gray-200 rounded-lg'
                                                    onClick={handleBoxVehicle}
                                                >
                                                    <RxDotsHorizontal className='w-5 h-5' />
                                                </button>

                                            )}
                                            {showVehicle ? (
                                                <div
                                                    className='bg-white shadow-lg w-[500px] h-[240px] overflow-y-scroll absolute right-9 p-3 rounded-lg'>
                                                    <div className='grid grid-cols-3 gap-2'>
                                                        {data?.vehicles && data?.vehicles.map((vehicle, index) => (
                                                            <div key={index} className='px-1 py-2 border-2 border-gray-200 rounded-lg'>
                                                                <p>{vehicle.vehicleName}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : ""}

                                        </div>
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
                        <div className=" font-semibold pl-[40px]">
                            <div className="flex space-x-16 items-center pb-5">
                                <p className=' text-[20px] '>Ảnh sản phẩm</p>
                                {/* Thực hiện sau */}
                                {/* <button className='bg-white p-1 px-2 rounded-md hover:bg-main hover:text-white'
                                >
                                    Đổi ảnh
                                </button> */}
                            </div>
                            {data?.images && (
                                <div className='bg-white p-2 rounded-lg flex justify-center items-center shadow-lg'>
                                    <img src={data?.images[0].imageUrl} alt="" className='h-[280px]  object-contain' />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <div className='bg-white mt-10 p-5 rounded-lg w-[80%]'>
                            <div className='flex justify-between items-center pb-5'>
                                <p className='text-[20px] font-semibold'>Tổng ảnh</p>
                                {/* <button
                                className='px-2 py-1 border-2 border-gray-200 rounded-lg hover:bg-main hover:text-white'
                            >Sửa kho ảnh
                            </button> */}
                            </div>
                            <div className='flex justify-center'>
                                <div className={`grid grid-cols-${data?.images?.length??1} gap-x-7`}>
                                    {data?.images && data?.images.map((item, index) => (
                                        <div key={index} className='bg-white p-2 rounded-lg flex justify-center items-center shadow-lg'>
                                            <img src={item.imageUrl} alt="" className='h-[270px] object-contain'/>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className=' flex justify-center items-center py-5'>
                        {data?.description && (
                            <div className='bg-white w-full rounded-lg p-5 space-y-3'>
                                <p className='font-semibold text-[20px]'>Mô tả sản phẩm</p>
                                <div dangerouslySetInnerHTML={{ __html: data?.description }}></div>
                            </div>
                        )}
                    </div>
                    <div className='bg-white px-[5%]  py-5 mb-7 space-y-5'>
                        <p className='text-[20px] font-semibold'>Nhận xét sản phẩm</p>
                        <div className='bg-[#D8D8D8] rounded-lg p-5 flex justify-center'>
                            <div className='flex flex-col items-center pr-5'>
                                <p className='text-[30px] text-yellow-700 font-semibold'>5 trên 5</p>
                                <div className='flex space-x-3'>
                                    {[1, 2, 3, 4, 5].map((index) => (
                                        <StarIcon key={index} className='w-9 h-9 stroke-yellow-400 fill-yellow-400' />
                                    ))}
                                </div>
                            </div>
                            <div className='flex font-semibold space-x-8 text-[20px]'>
                                <button className='px-7 h-[40px] border-2 border-yellow-400 text-yellow-400 bg-white'>All</button>
                                <button className='px-7 h-[40px] border-2 border-gray-400 text-gray-300 bg-white'>5 sao (12)</button>
                                <button className='px-7 h-[40px] border-2 border-gray-400 text-gray-300 bg-white'>4 sao (2) </button>
                                <button className='px-7 h-[40px] border-2 border-gray-400 text-gray-300 bg-white'>3 sao (10) </button>
                                <button className='px-7 h-[40px] border-2 border-gray-400 text-gray-300 bg-white'>2 sao (2) </button>
                                <button className='px-7 h-[40px] border-2 border-gray-400 text-gray-300 bg-white'>1 sao (1) </button>
                            </div>
                        </div>
                        {data?.feedbackProducts && data?.feedbackProducts.length > 0
                            ? (
                                <div className='space-y-3'>
                                    {data?.feedbackProducts.map((item, index) => (
                                        <div key={index}>
                                            <div className='flex items-center'>
                                                {item?.customer?.avatar
                                                    ? (
                                                        <img src={item?.customer.avatar} alt="" className='w-[90px] h-[90px] rounded-full object-cover' />
                                                    ) :
                                                    <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU'}
                                                        alt="" className='w-[90px] h-[90px] rounded-full object-cover' />
                                                }

                                                <div className='pl-[30px] flex flex-col justify-start items-start space-y-4'>
                                                    <p className='font-semibold text-[18px]'>{item?.customer.fullName}</p>
                                                    <div className='flex space-x-3'>
                                                        {[1, 2, 3, 4, 5].map((index) => (
                                                            <span key={index}>
                                                                {index <= item?.rate ? (
                                                                    <StarIcon className='w-5 h-5 stroke-yellow-400 fill-yellow-400' />
                                                                ) : (
                                                                    <StarIcon className='w-5 h-5 stroke-gray-300 fill-gray-300' />
                                                                )}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <p className='text-[#9D9D9D]'>{formatDateFeedback(item?.createAt?.toString())} </p>
                                                </div>
                                            </div>
                                            <div className='mt-5 bg-[#D8D8D8] opacity-80 text-[17px] rounded-full py-4 px-7'>
                                                <p>{item?.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className=' space-y-3'>
                                    <p className='text-[30px] text-center'>Chưa có nhận xét</p>
                                </div>
                            )}
                    </div>
                </div>
                )
            }



        </div >
    )
}

export default ProductDetail