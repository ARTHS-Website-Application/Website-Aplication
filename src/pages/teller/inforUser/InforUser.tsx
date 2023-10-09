import { useState } from 'react'
import { ClipboardDocumentListIcon } from '@heroicons/react/24/solid'
import { itemProduct } from '@/types/actions/product'
type Props = {
    addProduct?:itemProduct<string,number>[];
}

const InforUser = ({addProduct=[]}: Props) => {
    const [checked, setChecked] = useState<boolean>(false);
    const [showService, setShowService] = useState<boolean[]>(Array(addProduct.length).fill(false));
    const toggleService = (index: number) => {
        const updatedShowService = [...showService];
        updatedShowService[index] = !updatedShowService[index];
        setShowService(updatedShowService);
      };
    return (
        <div className="w-[40%] border-x-2 border-t-2 border-gray-400">
            <div>

            </div>
            <div className='bg-white w-full text-center py-[20px] border-b-2 border-gray-400'>
                <h1 className="text-2xl font-semibold">Đơn hàng</h1>
            </div>
            <div className=' w-full h-[75.6vh]  flex flex-col justify-between '>
                <div className='px-3 pt-3 bg-white'>
                    <div className=' flex items-center pb-3'>
                        <ClipboardDocumentListIcon className="w-9 h-9 stroke-gray-400 fill-white" />
                        <p>Thông tin khách hàng</p>
                    </div>
                    <div className='w-full flex flex-col justify-between '>
                        <div className='w-full flex justify-between'>
                            <div className='flex flex-col space-y-3 text-[20px]'>
                                <p>Số điện thoại</p>
                                <p>Tên khách hàng</p>
                                <p>Biển số xe</p>
                                <p>Loại xe</p>
                                <p>Nhân viên sửa chữa</p>
                            </div>

                            <div>
                                <div className='flex flex-col space-y-3 text-[18px] pb-2'>
                                    <input
                                        type="text" placeholder="Số điện thoại"
                                        className="focus:outline-none focus:border-b-2 focus:border-main  border-b-2 border-black text-right"
                                    />
                                    <input
                                        type="text" placeholder="Tên khách hàng"
                                        className="focus:outline-none focus:border-b-2 focus:border-main  border-b-2 border-black text-right"
                                    />
                                    <input
                                        type="text" placeholder="Biển số xe"
                                        className="focus:outline-none focus:border-b-2 focus:border-main  border-b-2 border-black text-right"
                                    />
                                    <input
                                        type="text" placeholder="Loại xe"
                                        className="focus:outline-none focus:border-b-2 focus:border-main  border-b-2 border-black text-right"
                                    />
                                    <select className='h-10 border-2 border-gray-300 text-[18px]' name="thong tin" id="">
                                        <option value="" >Nhân viên</option>
                                        <option value="4">4</option>
                                        <option value="">1</option>
                                        <option value="">1</option>
                                        <option value="">1</option>
                                    </select>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className=" w-full h-[35vh] px-3 py-2 overflow-y-scroll space-y-2">
                    {addProduct && addProduct
                    
                    ? addProduct.map((item:itemProduct<string,number>,index:number)=>(
                        <div key={index} className="w-full h-[200px]">
                        <div className='bg-white w-full h-[124px] rounded-lg flex justify-between'>
                            <div className='h-full flex'>
                                <div className='pl-3 h-full py-2'>
                                    <img src={item.imageUrl} className='w-[100px] h-[110px]' alt="" />

                                </div>
                                <div className='h-full pl-3 flex flex-col justify-between'>
                                    <div className='font-semibold pt-2'>
                                        <p className='text-[16px]'>{item.name}</p>
                                        <p className='text-[#888888] text-[14px]'>{item.priceCurrent}đ</p>
                                        <p className='text-[#FE3A30]'>{item.priceCurrent}đ</p>
                                    </div>
                                    <div className='flex items-center space-x-1 pb-1'>
                                        <h3 className='font-semibold'>Số lượng:</h3>
                                        <input
                                            type="number"
                                            defaultValue={1}
                                            min={1}
                                            max={item.quantity}
                                            className='w-[60px] border-b-2 border-black text-center focus:outline-none focus:border-b-2 focus:border-main'
                                        />
                                        {item.repairService?(
                                            <button
                                            className='font-bold pl-3 text-blue-700'
                                            onClick={() => toggleService(index)}
                                        >chọn dịch vụ</button>
                                        ):""}
                                        
                                    </div>
                                </div>

                            </div>
                            <button className='text-red-700 h-[30px] font-semibold pr-4 pt-2'>Xóa</button>

                        </div>
                        {showService[index]
                            ? (<label className='w-full h-[70px] bg-white mt-3 flex items-center'>
                                <input type="checkbox"
                                    defaultChecked={checked}
                                    onChange={() => setChecked(!checked)}
                                    className='w-5 h-5 mx-4 border-2 border-mainB'
                                />
                                {item?.repairService?.image
                                ?(
                                    <div>
                                    <img src={item.repairService.image}
                                        alt="" className='w-[50px] h-[50px]' />
                                </div>
                                ):(
                                    <div>
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain3.webp"
                                        alt="" className='w-[50px] h-[50px]' />
                                </div>
                                )
                            }
                                
                                
                                <div className='pl-3 flex flex-col justify-center'>
                                    <h3 className='text-[14px]'>{item?.repairService?.name}</h3>
                                    <p className='text-[#888888] text-[12px] line-through'>{item?.repairService?.price}đ</p>
                                    <p className='text-red-600 text-[14px]'>{item?.repairService?.price}</p>
                                </div>
                            </label>)
                            : ""
                        }
                    </div>
                    ))
                    :""       
                }

                </div>
                <div className='w-full bg-white h-[10vh] flex justify-around py-5'>
                    <button className='w-[150px] bg-slate-200 hover:bg-red-700 hover:text-white font-semibold text-[18px] rounded-lg'>Hủy đơn</button>
                    <div className=' text-center'>
                        <h3 className='font-semibold'>Tổng tiền:</h3>
                        <p className='text-[20px]'>147.000 đ</p>
                    </div>
                    <button className='w-[200px] bg-slate-200 hover:bg-main hover:text-white font-semibold text-[18px] rounded-lg'>Tiếp theo</button>
                </div>
            </div>



        </div>
    )
}

export default InforUser