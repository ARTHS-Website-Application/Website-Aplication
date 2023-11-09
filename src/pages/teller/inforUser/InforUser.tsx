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
    const [orderData, setOrderData] = useState<itemOrder<string, number>[]>([]);
    const [showStaff, setShowStaff] = useState<boolean>(false);
    const axiosPrivate = userAxiosPrivate();
    console.log(orderData)
    useEffect(() => {
        // Tạo dữ liệu ban đầu và lưu vào localStorage khi addProduct thay đổi
        const dataCart: itemOrder<string, number>[] = addProduct.map((item) => ({
            repairServiceId: null,
            motobikeProductId: item.id,
            productQuantity: 1,
            instUsed: false
        }));
        localStorage.setItem('orderData', JSON.stringify(dataCart));
        setOrderData(dataCart);
    }, [addProduct]);

    //Ẩn/hiện dịch vụ
    const toggleService = (itemId: string, index: number) => {
        const savedData = JSON.parse(localStorage.getItem('orderData') as string);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updatedData = savedData.map((item: any) => {
            if (item.motobikeProductId === itemId) {
                return {
                    ...item,
                    instUsed: !item.instUsed
                };
            }
            return item;
        });

        // Lưu trạng thái vào localStorage
        localStorage.setItem('orderData', JSON.stringify(updatedData));
        setOrderData(updatedData);

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
                updatedAddProduct.splice(indexToRemove, 1);
                return updatedAddProduct;
            });
        }
        console.log(indexToRemove)
    };

    return (
        <div className="w-[45%] border-x-2 border-t-2 border-gray-400">
            <div className='bg-white w-full text-center py-[20px] border-b-2 border-gray-400'>
                <h1 className="text-2xl font-semibold">Đơn hàng</h1>
            </div>
            <div className=' w-full h-[82.4vh]  flex flex-col justify-between '>
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
                <div className=" w-full flex pt-3">
                        <div className="w-[50%]  pl-2 space-y-3 border-r-2 border-y-2 border-gray-400">
                        {addProduct?.length > 0 && (<p className="font-semibold pl-1 ">Các sản phẩm</p>)}
                            <div className="w-full h-[50vh] overflow-auto space-y-3 pr-1">
                                {addProduct &&
                                    addProduct.map((item: item<string, number>, index: number) => (
                                        <div key={index} className="w-full">
                                            <div className='bg-white w-full rounded-lg flex justify-between pb-1'>
                                                <div className='flex pl-2'>
                                                    <div className='py-2 pr-1 w-[40%]'>
                                                        <img src={item.images[0].imageUrl} className='w-full h-[70px] object-cover' alt="" />
                                                    </div>
                                                    <div className='pl-2 flex flex-col justify-between'>
                                                        <div className='font-semibold pt-1'>
                                                            <p className='text-[13px]'>{item.name}</p>
                                                            {item.discount ? (
                                                                <div>
                                                                    <p className='text-[#888888] text-[13px] line-through'>{item.priceCurrent}đ</p>
                                                                    <p className='text-[#FE3A30] text-[13px]'>{item.priceCurrent * (1 - item.discount.discountAmount / 100)}đ</p>
                                                                </div>
                                                            ) : (
                                                                <p className='text-[#FE3A30] text-[13px]'>{item.priceCurrent}đ</p>
                                                            )}

                                                        </div>
                                                        <div className='flex items-center space-x-1 pb-1'>
                                                            <h3 className='font-semibold text-[10px]'>Số lượng:</h3>
                                                            <input
                                                                type="number"
                                                                defaultValue={1}
                                                                min={1}
                                                                onChange={(e) => {
                                                                    handleQuantityChange(item.id, parseInt(e.target.value))
                                                                }}
                                                                className='w-[30px] border-b-2 border-black text-center focus:outline-none focus:border-b-2 focus:border-main'
                                                            />
                                                            {item.installationFee > 0 && (
                                                                <button
                                                                    className='font-bold pl-2 text-blue-700 text-[10px]'
                                                                    onClick={() => toggleService(item.id, index)}
                                                                >{showService[index] ? "Đã chọn sửa chữa" : "Chọn sửa chữa"} </button>
                                                            )}



                                                        </div>
                                                    </div>

                                                </div>
                                                <button className='text-red-700 h-[30px] font-semibold px-1 pt-1'
                                                    onClick={() => {
                                                        removeProduct(item.id)
                                                        handleRemoveItemNotChange(index);
                                                    }}>X</button>

                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                        </div>
                    <div className='w-[50%] h-[50vh] overflow-y-scroll space-y-2'>
                        <p>Các dịch vụ</p>
                    </div>

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