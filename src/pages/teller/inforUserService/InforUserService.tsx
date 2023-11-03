import { useState, useEffect } from 'react'
import { ClipboardDocumentListIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { itemOrder } from '@/types/actions/createOrder';
import { showSuccessAlert } from '@/constants/chooseToastify';
import userAxiosPrivate from '@/hooks/useAxiosPrivate';
import { formatPhoneNumber } from '@/utils/formatPhone';
import StaffSelect from '@/components/teller/StaffSelect';
import { itemService } from '@/types/actions/listService';
type Props = {
    addService?: itemService<string, number>[];
    removeProduct: (itemId: string) => void,
    setAddService: React.Dispatch<React.SetStateAction<itemService<string, number>[]>>;
}

const InforUserService = ({ addService = [], removeProduct, setAddService }: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const navigate = useNavigate();
    const [phoneCustomer, setPhoneCustomer] = useState<string>('');
    const [nameCustomer, setNameCustomer] = useState<string>('');
    const [staffId, setStaffId] = useState<string>('');
    const [licensePlate, setLicensePlate] = useState<string>('');
    const [showService, setShowService] = useState<boolean[]>(Array(addService.length).fill(false));
    const [checkedService, setCheckedService] = useState<boolean[]>(Array(addService.length).fill(false));
    const [orderData, setOrderData] = useState<itemOrder<string, number>[]>([]);
    const [showStaff, setShowStaff] = useState<boolean>(false);
    const axiosPrivate = userAxiosPrivate();

    useEffect(() => {
        // Tạo dữ liệu ban đầu và lưu vào localStorage khi addProduct thay đổi
        const dataCart: itemOrder<string, number>[] = addService.map((item) => ({
            motobikeProductId: null,
            repairServiceId: item.id,
            productQuantity: 0,
        }));
        localStorage.setItem('orderService', JSON.stringify(dataCart));
        setOrderData(dataCart);
    }, [addService]);



    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedPhoneNumber = formatPhoneNumber(e.target.value);
        setPhoneCustomer(formattedPhoneNumber);
    };

    const handleCreateOrder = async () => {
        const data = {
            staffId: staffId,
            customerName: nameCustomer,
            customerPhone: phoneCustomer,
            licensePlate: licensePlate,
            orderDetailModel: orderData
        };
        try {
            const response = await axiosPrivate.post('/store-orders', data);

            if (response.status === 201) {
                const orderId = response.data.id;
                navigate(`/manage-order/${orderId}`);
                localStorage.removeItem('serviceItems');
                localStorage.removeItem('orderService');
                showSuccessAlert('Tạo đơn dịch vụ thành công');
            } else {
                console.log('Lỗi');
            }

        } catch (error) {
            console.error('Lỗi:', error);
        }
    }

    const handleRemoveItemNotChange = (indexToRemove: number) => {
        if (indexToRemove >= 0 && indexToRemove < showService.length) {
            setShowService((prevAddProduct) => {
                const updatedAddProduct = [...prevAddProduct];
                updatedAddProduct.splice(indexToRemove,1);
                return updatedAddProduct;
            });
        }
        console.log(indexToRemove)
        if (indexToRemove >= 0 && indexToRemove < checkedService.length) {
            setCheckedService((prevAddProduct) => {
                const updatedAddProduct = [...prevAddProduct];
                updatedAddProduct.splice(indexToRemove,1);
                return updatedAddProduct;
            });
        }
    };

    return (
        <div className="w-[33%] border-x-2 border-t-2 border-gray-400">
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
                            </div>

                            <div>
                                <div className='flex flex-col space-y-3 text-[18px] pb-2'>
                                    <input
                                        type="text"
                                        placeholder="Số điện thoại"
                                        value={phoneCustomer}
                                        onChange={handlePhoneChange}
                                        className="focus:outline-none focus:border-b-2 focus:border-main  border-b-2 border-black text-right"
                                    />
                                    <input
                                        type="text" placeholder="Tên khách hàng"
                                        value={nameCustomer}
                                        onChange={(e) => setNameCustomer(e.target.value)}
                                        className="focus:outline-none focus:border-b-2 focus:border-main  border-b-2 border-black text-right"
                                    />
                                    <input
                                        type="text" placeholder="Biển số xe"
                                        value={licensePlate}
                                        className="focus:outline-none focus:border-b-2 focus:border-main  border-b-2 border-black text-right"
                                        onChange={(e) => setLicensePlate(e.target.value)}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className=" w-full h-[35vh] px-3 pb-2 overflow-y-scroll space-y-2">
                    {addService &&
                        addService.map((item: itemService<string, number>, index: number) => (
                            <div key={index} className="w-full">
                                <div className='bg-white w-full rounded-lg flex justify-between pb-3'>
                                    <div className='flex'>
                                        <div className='pl-3 h-[13vh] py-2'>
                                            <img src={item.images[0].imageUrl} className='w-auto h-full' alt="" />

                                        </div>
                                        <div className='h-full pl-3 flex flex-col justify-between'>
                                            <div className='font-semibold pt-2'>
                                                <p className='text-[16px]'>{item.name}</p>

                                                    <p className='text-[#FE3A30]'>{item.price}đ</p>

                                            </div>
                                        </div>

                                    </div>
                                    <button className='text-red-700 h-[30px] font-semibold pr-4 pl-1 pt-2'
                                        onClick={() => {
                                            removeProduct(item.id)
                                            handleRemoveItemNotChange(index);
                                        }}>Xóa</button>

                                </div>
                            </div>
                        ))
                    }
                </div>
                {phoneCustomer.length === 10 && nameCustomer && orderData.length > 0
                    ?

                    (
                        <div className='w-full bg-white h-[10vh] flex justify-around py-5'>
                            <button className='w-[150px] bg-slate-200 hover:bg-red-700 hover:text-white font-semibold text-[18px] rounded-lg'
                                onClick={() => {
                                    setPhoneCustomer('');
                                    setNameCustomer('');
                                    setLicensePlate('');
                                    localStorage.removeItem('serviceItems');
                                    localStorage.removeItem('orderService');
                                    setOrderData([]);
                                    setAddService([]);

                                }}
                            >Hủy đơn</button>
                            {orderData.some((item) => item.repairServiceId)
                                && (
                                    <button className='w-[200px] bg-slate-200 hover:bg-main hover:text-white font-semibold text-[18px] rounded-lg'
                                        onClick={() => setShowStaff(true)}
                                    >Tiếp theo</button>
                                )}

                        </div>
                    )

                    : (
                        <div className='w-full h-[10vh] py-5'>
                        </div>
                    )}

            </div>
            <StaffSelect
                handleCreateOrder={handleCreateOrder}
                staffId={staffId}
                setStaffId={setStaffId}
                isVisible={showStaff}
                onClose={() => setShowStaff(false)}
            />
        </div>
    )
}

export default InforUserService