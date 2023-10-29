import { useState, useEffect } from 'react'
import { ClipboardDocumentListIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { item } from '@/types/actions/product'
import { itemOrder } from '@/types/actions/createOrder';
import { showSuccessAlert } from '@/constants/chooseToastify';
import userAxiosPrivate from '@/hooks/useAxiosPrivate';
import { formatPhoneNumber } from '@/utils/formatPhone';
import StaffSelect from '@/components/teller/StaffSelect';
type Props = {
    addProduct?: item<string, number>[];
    removeProduct: (itemId: string) => void,
    setAddProduct: React.Dispatch<React.SetStateAction<item<string, number>[]>>;
}

const InforUser = ({ addProduct = [], removeProduct, setAddProduct }: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const navigate = useNavigate();
    const [phoneCustomer, setPhoneCustomer] = useState<string>('');
    const [nameCustomer, setNameCustomer] = useState<string>('');
    const [staffId, setStaffId] = useState<string>('');
    const [licensePlate, setLicensePlate] = useState<string>('');
    const [showService, setShowService] = useState<boolean[]>(Array(addProduct.length).fill(false));
    const [checkedService, setCheckedService] = useState<boolean[]>(Array(addProduct.length).fill(false));
    const [orderData, setOrderData] = useState<itemOrder<string, number>[]>([]);
    const [showStaff, setShowStaff] = useState<boolean>(false);
    const axiosPrivate = userAxiosPrivate();

    useEffect(() => {
        // Tạo dữ liệu ban đầu và lưu vào localStorage khi addProduct thay đổi
        const dataCart: itemOrder<string, number>[] = addProduct.map((item) => ({
            repairServiceId: null,
            motobikeProductId: item.id,
            productQuantity: 1,
        }));
        localStorage.setItem('orderData', JSON.stringify(dataCart));
        setOrderData(dataCart);
    }, [addProduct]);

    const handleCheckboxChange = (itemId: string, data: string, index: number) => {
        const savedData = JSON.parse(localStorage.getItem('orderData') || '[]') as itemOrder<string, number>[];

        const updatedOrder: itemOrder<string, number>[] = savedData.map((item, i) => {
            if (item.motobikeProductId === itemId) {
                // Nếu đã chọn checkbox, cập nhật repairServiceId
                if (!checkedService[i]) {
                    return {
                        ...item,
                        repairServiceId: data,
                    };
                } else {
                    return {
                        ...item,
                        repairServiceId: null,
                    };
                }
            }
            return item;
        });
        setOrderData(updatedOrder);

        const newChecked = [...checkedService];
        newChecked[index] = !checkedService[index];
        setCheckedService(newChecked);

        // Cập nhật localStorage
        localStorage.setItem('orderData', JSON.stringify(updatedOrder));
    };
    //Ẩn/hiện dịch vụ
    const toggleService = (index: number) => {
        const updatedShowService = [...showService];
        updatedShowService[index] = !updatedShowService[index];
        setShowService(updatedShowService);
    };

    const handleQuantityChange = (itemId: string, value: number) => {
        const savedData = JSON.parse(localStorage.getItem('orderData') as string);

        // Tìm sản phẩm trong savedData dựa trên itemId
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updatedData = savedData.map((item: any) => {
            if (item.motobikeProductId === itemId) {
                return {
                    ...item,
                    productQuantity: value
                };
            }
            return item;
        });

        localStorage.setItem('orderData', JSON.stringify(updatedData));

        // Cập nhật lại state
        setOrderData(updatedData);
    };

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
                localStorage.removeItem('cartItems');
                localStorage.removeItem('orderData');
                showSuccessAlert('Tạo đơn hàng thành công');
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
                    {addProduct &&
                        addProduct.map((item: item<string, number>, index: number) => (
                            <div key={index} className="w-full">
                                <div className='bg-white w-full rounded-lg flex justify-between pb-3'>
                                    <div className='flex'>
                                        <div className='pl-3 h-[13vh] py-2'>
                                            <img src={item.images[0].imageUrl} className='w-auto h-full' alt="" />

                                        </div>
                                        <div className='h-full pl-3 flex flex-col justify-between'>
                                            <div className='font-semibold pt-2'>
                                                <p className='text-[16px]'>{item.name}</p>
                                                {item.discount ? (
                                                    <div>
                                                        <p className='text-[#888888] text-[14px] line-through'>{item.priceCurrent}đ</p>
                                                        <p className='text-[#FE3A30]'>{item.priceCurrent * (1 - item.discount.discountAmount / 100)}đ</p>
                                                    </div>
                                                ) : (
                                                    <p className='text-[#FE3A30]'>{item.priceCurrent}đ</p>
                                                )}

                                            </div>
                                            <div className='flex items-center space-x-1 pb-1'>
                                                <h3 className='font-semibold'>Số lượng:</h3>
                                                <input
                                                    type="number"
                                                    defaultValue={1}
                                                    min={1}
                                                    onChange={(e) => {
                                                        handleQuantityChange(item.id, parseInt(e.target.value))
                                                    }}
                                                    className='w-[60px] border-b-2 border-black text-center focus:outline-none focus:border-b-2 focus:border-main'
                                                />
                                                {item.repairService ? (
                                                    <button
                                                        className='font-bold pl-2 text-blue-700 '
                                                        onClick={() => toggleService(index)}
                                                    >Chọn dịch vụ</button>
                                                ) : ""}

                                            </div>
                                        </div>

                                    </div>
                                    <button className='text-red-700 h-[30px] font-semibold pr-4 pl-1 pt-2'
                                        onClick={() => {
                                            removeProduct(item.id)
                                            handleRemoveItemNotChange(index);
                                        }}>Xóa</button>

                                </div>
                                {showService[index] && item?.repairService &&
                                    (<label className='w-full h-[70px] bg-white mt-3 flex items-center'>
                                        <input type="checkbox"
                                            checked={checkedService[index]||false}
                                            onChange={() =>
                                                handleCheckboxChange(item.id, item.repairService?.id, index)
                                            }
                                            className='w-5 h-5 mx-4 border-2 border-mainB'
                                        />
                                        <div>
                                            <img src={item.repairService?.image}
                                                alt="" className='w-[50px] h-[50px]' />
                                        </div>
                                        <div className='pl-3 flex flex-col justify-center'>
                                            <h3 className='text-[14px]'>{item?.repairService?.name}</h3>
                                            <p className='text-[#888888] text-[12px] line-through'>{item?.repairService?.price}đ</p>
                                            <p className='text-red-600 text-[14px]'>{item?.repairService?.price}đ</p>
                                        </div>
                                    </label>)
                                }
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
                                    localStorage.removeItem('cartItems');
                                    localStorage.removeItem('orderData');
                                    setOrderData([]);
                                    setAddProduct([]);

                                }}
                            >Hủy đơn</button>
                            {orderData.some((item) => item.repairServiceId)
                                ? (
                                    <button className='w-[200px] bg-slate-200 hover:bg-main hover:text-white font-semibold text-[18px] rounded-lg'
                                        onClick={() => setShowStaff(true)}
                                    >Tiếp theo</button>
                                ) : (
                                    <button className='w-[200px] bg-slate-200 hover:bg-main hover:text-white font-semibold text-[18px] rounded-lg'
                                        onClick={handleCreateOrder}
                                    >Tạo đơn hàng</button>
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

export default InforUser