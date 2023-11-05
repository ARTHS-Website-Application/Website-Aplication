import { useState, useEffect } from 'react'
import { addProductOrder } from '@/types/actions/product'
import { itemOrder } from '@/types/actions/createOrder';
import { useDispatch } from 'react-redux';
import { updateProductOrder } from '@/actions/order';
import { showSuccessAlert } from '@/constants/chooseToastify';
import StaffSelect from './StaffSelect';
type Props = {
    addProduct?: addProductOrder<string, number>[];
    removeProduct: (itemId: string) => void,
    onClose: () => void;
    setAddProduct: React.Dispatch<React.SetStateAction<addProductOrder<string, number>[]>>;
    tranfomDataProduct: addProductOrder<string, number>[];
    idOrder: string | null;
}

const UpdateProduct = ({ addProduct = [], removeProduct, onClose, setAddProduct, tranfomDataProduct, idOrder }: Props) => {
    const dispatch = useDispatch();
    const [showStaff, setShowStaff] = useState<boolean>(false);
    const [staffId, setStaffId] = useState<string>('');
    // const [checkedService, setCheckedService] = useState<boolean[]>(Array(addProduct.length).fill(false));
    const [orderData, setOrderData] = useState<itemOrder<string, number>[]>([]);
    const [productQuantity, setProductQuantity] = useState<{ [key: string]: number }>({});
    //check tranfomDataProduct và addProduct trùng nhau không
    const [showService, setShowService] = useState<boolean[]>(addProduct.map(() => false));
    const selectedItems = new Set<string>();
    const [checkedService, setCheckedService] = useState<boolean[]>(addProduct.map((item) => {
        //dữ liệu từ detailOrder
        if (item.repairService && item.checked === true && !selectedItems.has(item.idProduct)) {
            selectedItems.add(item.idProduct);
            return true;
        }
        return false;
    }));
    useEffect(() => {
        if (addProduct) {
            const initialProductQuantity = addProduct.reduce((itemCurrent, item) => {
                return {
                    ...itemCurrent,
                    [item.idProduct]: item.productQuantity
                };
            }, {});
            setProductQuantity(initialProductQuantity);
        }
    }, [addProduct]);
    useEffect(() => {
        if (addProduct.length > 0) {
            
            const dataCart: itemOrder<string, number>[] = (addProduct || []).map((item) => {
                const matchingItem: addProductOrder<string, number> | undefined = tranfomDataProduct.find((transformedItem) => transformedItem.idProduct === item.idProduct && item.checked === true);
                
                if (matchingItem) {
                    // Tạo dữ liệu ban đầu và lưu vào localStorage khi addProduct thay đổi
                    return {
                        repairServiceId: item.repairService?.id ?? null,
                        motobikeProductId: item.idProduct,
                        productQuantity: item.productQuantity ?? 1,
                    };
                } else {
                    //dữ liệu thêm mới
                    return {
                        repairServiceId: null,
                        motobikeProductId: item.idProduct,
                        productQuantity: 1,
                    };
                }
            });

            localStorage.setItem('updateOrderData', JSON.stringify(dataCart));
            setOrderData(dataCart);
        }
    }, [addProduct]);
    const handleCheckboxChange = (itemId: string, data: string | null, index: number) => {
        const savedData = JSON.parse(localStorage.getItem('updateOrderData') || '[]') as itemOrder<string, number>[];
        const updatedOrder: itemOrder<string, number>[] = savedData.map((item, i) => {
            if (item?.motobikeProductId === itemId) {
                // Nếu đã chọn checkbox, cập nhật repairServiceId
                if (!checkedService[i] ) {
                    selectedItems.add(itemId);
                    return {
                        ...item,
                        repairServiceId: data,
                    };
                } else {
                    selectedItems.delete(itemId);
                    return {
                        ...item,
                        repairServiceId: null,
                    };
                }
            }
            return item;
        });
    
        // Cập nhật orderData trước
        setOrderData(updatedOrder);
        
    
        // Cập nhật localStorage sau khi đã cập nhật cả hai State
        localStorage.setItem('updateOrderData', JSON.stringify(updatedOrder));
    
        // Cập nhật checkedService sau khi đã cập nhật cả hai State
        setCheckedService((prevCheckedService) => {
            const newChecked = [...prevCheckedService];
            newChecked[index] = !prevCheckedService[index];
            return newChecked;
        });
    };

    
    //Ẩn/hiện dịch vụ
    const toggleService = (index: number) => {
        setShowService((prevShowService) => {
            const updatedShowService = [...prevShowService];
            updatedShowService[index] = !updatedShowService[index];
            return updatedShowService;
        });
    };

    const handleQuantityChange = (itemId: string, value: number) => {
        setProductQuantity((prevProductQuantity) => {
            return {
                ...prevProductQuantity,
                [itemId]: value
            };
        });
        const savedData = JSON.parse(localStorage.getItem('updateOrderData') as string);

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

        localStorage.setItem('updateOrderData', JSON.stringify(updatedData));

        // Cập nhật lại state
        setOrderData(updatedData);
    };
    //gửi dispatch update
    const handleUpdateStaffProduct = () => {
        const data = {
            staffId: staffId,
            orderDetailModel: orderData.map((item) => ({
                ...item,
                motobikeProductId: item.motobikeProductId || null,
            })),
        };
        if (idOrder) {
            dispatch(updateProductOrder(idOrder, data))
            showSuccessAlert("Cập nhật thành công")
            onClose();
        }
    }

    const handleRemoveItemNotChange = (indexToRemove: number) => {
        if (indexToRemove >= 0 && indexToRemove < showService.length) {
            setShowService((prevShowService) => {
                const updatedShowService = [...prevShowService];
                updatedShowService.splice(indexToRemove, 1);
                return updatedShowService;
            });
        }

        if (indexToRemove >= 0 && indexToRemove < checkedService.length) {
            setCheckedService((prevCheckedService) => {
                const updatedCheckedService = [...prevCheckedService];
                updatedCheckedService.splice(indexToRemove, 1);
                return updatedCheckedService;
            });
        }
    };

    return (
        <div className="w-[33%] ">
            <div className='bg-white w-full text-center py-[20px]'>
                <h1 className="text-2xl font-semibold">Sản phẩm đơn hàng</h1>
            </div>
            <div className=' w-full h-[75.6vh]  flex flex-col justify-between'>
                <div className=" w-full px-3 py-2 overflow-y-scroll space-y-2">
                    {addProduct &&
                        addProduct.map((item: addProductOrder<string, number>, index: number) => (
                            <div key={index} className="w-full">
                                <div className='bg-white w-full rounded-lg flex justify-between pb-3'>
                                    <div className='flex'>
                                        <div className='pl-3 h-[13vh] py-2'>
                                            <img src={item.image} className='w-auto h-full' alt="" />
                                        </div>
                                        <div className='h-full pl-3 flex flex-col justify-between'>
                                            <div className='font-semibold pt-2'>
                                                <p className='text-[16px]'>{item.nameProduct}</p>
                                                {item.discountAmount ? (
                                                    <div>
                                                        <p className='text-[#888888] text-[14px] line-through'>{item.priceProduct}đ</p>
                                                        <p className='text-[#FE3A30]'>{item.priceProduct * (1 - item.discountAmount / 100)}đ</p>
                                                    </div>
                                                ) : (
                                                    <p className='text-[#FE3A30]'>{item.priceProduct}đ</p>
                                                )}

                                            </div>
                                            <div className='flex items-center space-x-1 pb-1'>
                                                <h3 className='font-semibold'>Số lượng:</h3>
                                                <input
                                                    type="number"
                                                    value={isNaN(productQuantity[item.idProduct]) ? 1 : productQuantity[item.idProduct]}
                                                    min={1}
                                                    onChange={(e) => handleQuantityChange(item.idProduct, parseInt(e.target.value))}
                                                    className='w-[60px] border-b-2 border-black text-center focus:outline-none focus:border-b-2 focus:border-main'
                                                />
                                                {item.repairService ? (
                                                    <button
                                                        className='font-bold pl-2 text-blue-700'
                                                        onClick={() => toggleService(index)}
                                                    >Chọn dịch vụ</button>
                                                ) : ""}

                                            </div>
                                        </div>

                                    </div>
                                    <button className='text-red-700 h-[30px] font-semibold pr-4 pl-1 pt-2'
                                        onClick={() => {
                                            removeProduct(item?.idProduct)
                                            handleRemoveItemNotChange(index);
                                        }}>Xóa</button>

                                </div>
                                {showService[index] && item?.repairService &&
                                    (<label className='w-full h-[70px] bg-white mt-3 flex items-center'>
                                        <input type="checkbox"
                                            checked={checkedService[index] || false}
                                            onChange={() =>
                                                handleCheckboxChange(item.idProduct, item.repairService ? item.repairService?.id : null, index)
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
                <div className='w-full bg-white h-[10vh] flex justify-around py-5'>
                    <button className='w-[150px] bg-gray-200 hover:bg-red-700 hover:text-white font-semibold text-[18px] rounded-lg'
                        onClick={() => {
                            localStorage.removeItem('updateOrderData');
                            setOrderData([]);
                            setAddProduct([...tranfomDataProduct]);
                            onClose();
                        }}
                    >Hủy</button>
                    {addProduct.length > 0
                        ? orderData?.some((item) => item?.repairServiceId)

                            ? (
                                <button className='w-[200px] bg-gray-200 hover:bg-green-700 hover:text-white font-semibold text-[18px] rounded-lg'
                                    onClick={() => setShowStaff(true)}
                                >Tiếp theo</button>
                            ) : (
                                <button className='w-[200px] bg-gray-200 hover:bg-green-700 hover:text-white font-semibold text-[18px] rounded-lg'
                                    onClick={handleUpdateStaffProduct}
                                >Tạo đơn hàng</button>
                            )
                        : ""}

                </div>
            </div>
            <StaffSelect
                handleCreateOrder={handleUpdateStaffProduct}
                staffId={staffId}
                setStaffId={setStaffId}
                isVisible={showStaff}
                onClose={() => setShowStaff(false)}
            />
        </div>
    )
}

export default UpdateProduct