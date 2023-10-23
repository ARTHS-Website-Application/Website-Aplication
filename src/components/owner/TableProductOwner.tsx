import { item } from '@/types/actions/product';
import { typeActiveProduct } from '@/types/typeProduct';
import { formatPrice } from '@/utils/formatPrice';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useState } from 'react'
import { Link } from 'react-router-dom';
type Props = {
    productData: item<string, number>[];
}

const TableProductOwner = ({ productData }: Props) => {
    const [showDiv, setShowDiv] = useState(Array(productData?.length).fill(false));
    const handleShowDiv = (index: number) => {
        const updatedShowDiv = [...showDiv];
        updatedShowDiv[index] = !updatedShowDiv[index];
        setShowDiv(updatedShowDiv);
    }
    return (
        <table className="min-w-full bg-white divide-y divide-gray-200 table-fixed text-center">
            <thead>
                <tr className="text-xs uppercase tracking-wider bg-gray-600 text-white text-center">
                    <th scope="col" className="py-4">
                        Tên sản phẩm
                    </th>
                    <th scope="col" className="">
                        Thương hiệu
                    </th>
                    <th scope="col" className=" ">
                        Loại xe
                    </th>
                    {/* <th scope="col" className=" ">
                        Số lượng
                    </th> */}
                    <th scope="col" className=" ">
                        Tiền sau khi giảm - Tiền mặc định (VNĐ)
                    </th>
                    <th scope="col" className=" ">
                        Trạng thái
                    </th>
                    <th scope="col" className="">
                    </th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 overflow-y-scroll h-[60vh]">
                {productData && productData.map((item: item<string, number>, index) => (
                    <tr key={index}>
                        <td className="flex pl-3 items-center py-2 ">
                            <img src={item.images[0].imageUrl} alt="" className='w-9 h-9' />
                            <p className='pl-2 text-[14px]'>{item.name}</p>
                        </td>
                        <td className="">
                            {/* {
                                    new Intl.DateTimeFormat('en-GB', {
                                        timeZone: 'UTC'
                                    }).format(new Date(Date.parse(item.orderDate.toString()) + 7 * 60 * 60 * 1000))} */}
                            <div className='flex justify-center space-x-1'>
                                {item.vehicles.slice(0, 3).map((vehicle, index) => (
                                    <div key={index} className='px-1 py-2 border-2 border-gray-200 rounded-lg'>
                                        <p>{vehicle.vehicleName}</p>
                                        
                                    </div>
                                ))}
                                {item.vehicles.length > 3 && (
                                    <div className='p-1 border-2 border-gray-200 rounded-lg'>
                                        <p>...</p>
                                    </div>
                                )}
                            </div>


                        </td>
                        <td className="">
                            {item?.category.categoryName}
                        </td>
                        {/* <td className="">
                        ds
                        </td> */}
                        <td className="">
                            {item?.discount 
                            ?<p>{formatPrice(item.priceCurrent * (1 - item?.discount.discountAmount / 100))} - {formatPrice(item.priceCurrent)}</p>
                            :<p>{formatPrice(item.priceCurrent)}</p> }

                            
                        </td>
                        <td className="">
                            <div className="flex items-center justify-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${item.status === typeActiveProduct.Active ?"bg-green-600":"bg-red-600"} `}></div>
                            <p className={`${item.status === typeActiveProduct.Active ?"text-green-600":""}  text-[14px]`}> {item.status}</p>
                            </div>
                            
                        </td>
                        <td className=" hover:underline pr-7">
                            <button
                                className="text-[30px] text-center hover:text-main"
                                onClick={() => handleShowDiv(index)}
                            >
                                ...
                            </button>

                            {showDiv[index] && (
                                <div className="absolute flex flex-col items-center bg-white shadow-lg rounded-lg w-[140px] right-0 space-y-3 py-2 font-semibold text-[#667085]">
                                    <Link to={item.id} className="hover:text-main">Chi tiết</Link>
                                    <button className='flex items-center space-x-1 hover:text-main hover:stroke-main'>
                                        <PencilIcon className="w-5 h-5" />
                                        <p> Cập nhật</p>
                                    </button>
                                    <button className='flex items-center space-x-1 hover:text-main hover:fill-main'>
                                        <TrashIcon className="w-5 h-5" />
                                        <p> Xóa</p>
                                    </button>
                                </div>
                            )}

                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TableProductOwner