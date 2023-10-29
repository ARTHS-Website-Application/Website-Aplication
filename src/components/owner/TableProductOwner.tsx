import { item } from '@/types/actions/product';
import { typeActiveProduct } from '@/types/typeProduct';
import { formatDateSeven } from '@/utils/formatDate';
import { formatPrice } from '@/utils/formatPrice';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { RxDotsHorizontal } from 'react-icons/rx';
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
                        Ngày tạo
                    </th>
                    <th scope="col" className=" ">
                        Loại sản phẩm
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
            <tbody className="divide-y divide-gray-200 text-[17px]">
                {productData && productData.map((item: item<string, number>, index) => (
                    <tr key={index}>
                        <td className="flex pl-3 items-center py-[10px] ">
                            <img src={item.images[0].imageUrl} alt="" className='w-8 h-8' />
                            <p className='pl-2'>{item.name}</p>
                        </td>
                        <td className="">
                            {formatDateSeven(item?.createAt.toString())}
                        </td>
                        <td className="">
                            {item?.category.categoryName}
                        </td>
                        {/* <td className="">
                        ds
                        </td> */}
                        <td className="">
                            {item?.discount
                                ? <p>{formatPrice(item.priceCurrent * (1 - item?.discount.discountAmount / 100))} - {formatPrice(item.priceCurrent)}</p>
                                : <p>{formatPrice(item.priceCurrent)}</p>}


                        </td>
                        <td className="">
                            <div className="flex items-center justify-center space-x-2">
                                <div className={`w-2 h-2 rounded-full ${item.status === typeActiveProduct.Active ? "bg-green-600" : "bg-red-600"} `}></div>
                                <p className={`${item.status === typeActiveProduct.Active ? "text-green-600" : ""}  text-[14px]`}> {item.status}</p>
                            </div>

                        </td>
                        <td className="pr-7">
                            <button
                                onClick={() => handleShowDiv(index)}
                            >
                                <RxDotsHorizontal className='w-5 h-5 hover:text-main'/>
                            </button>

                            {showDiv[index] && (
                                <div className="absolute flex flex-col items-center bg-white shadow-lg rounded-lg w-[140px] right-0 space-y-3 py-2 font-semibold text-[#667085]">
                                    <Link to={item.id} className="hover:text-main">Chi tiết</Link>
                                    <Link to={`update-product/${item.id}`} className='flex items-center space-x-1 hover:text-main hover:stroke-main'
                                    >
                                        <PencilIcon className="w-5 h-5" />
                                        <p> Cập nhật</p>
                                    </Link>
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