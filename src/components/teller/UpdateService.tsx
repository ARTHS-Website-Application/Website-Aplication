import { useState, useEffect } from 'react'
import { itemOrder } from '@/types/actions/createOrder';
import { useDispatch } from 'react-redux';
import { showSuccessAlert } from '@/constants/chooseToastify';
import StaffSelect from './StaffSelect';
import { addProductService } from '@/types/actions/product';
import { updateProductOrder } from '@/actions/order';
type Props = {
    addService?: addProductService<string, number>[];
    removeProduct: (itemId: string) => void,
    onClose: () => void;
    setAddService: React.Dispatch<React.SetStateAction<addProductService<string, number>[]>>;
    tranfomDataProduct: addProductService<string, number>[];
    idOrder: string | null;
}

const UpdateService = ({ addService = [], removeProduct, onClose, setAddService, tranfomDataProduct, idOrder }: Props) => {
    const dispatch = useDispatch();
    const [showStaff, setShowStaff] = useState<boolean>(false);
    const [staffId, setStaffId] = useState<string>('');
    const [orderData, setOrderData] = useState<itemOrder<string, number>[]>([]);


    useEffect(() => {
        if (addService.length > 0) {
            // Tạo dữ liệu ban đầu và lưu vào localStorage khi addService thay đổi
            const dataCart: itemOrder<string, number>[] = (addService || []).map((item) => {
                const matchingItem: addProductService<string, number> | undefined = tranfomDataProduct.find((transformedItem) => transformedItem.id === item.id);
                if (matchingItem) {
                    return {
                        repairServiceId: matchingItem.id ?? null,
                        motobikeProductId: null,
                        productQuantity: 0,
                    };
                } else {
                    return {
                        repairServiceId: item.id,
                        motobikeProductId: null,
                        productQuantity: 0,
                    };
                }
            });

            localStorage.setItem('updateOrderData', JSON.stringify(dataCart));
            setOrderData(dataCart);
        }
    }, [addService]);


    //gửi dispatch update
    const handleUpdateStaffProduct = () => {
        const data = {
            staffId: staffId,
            orderDetailModel: orderData.map((item) => ({
                ...item,
                motobikeProductId: item.motobikeProductId || null,
            })),
        }
        if (idOrder) {
            dispatch(updateProductOrder(idOrder, data))
            showSuccessAlert("Cập nhật thành công")
            onClose();
        }
    }

    return (
        <div className="w-[33%] ">
            <div className='bg-white w-full text-center py-[20px]'>
                <h1 className="text-2xl font-semibold">Sản phẩm đơn hàng</h1>
            </div>
            <div className=' w-full h-[75.6vh]  flex flex-col justify-between'>
                <div className=" w-full px-3 py-2 overflow-y-scroll space-y-2">
                    {addService &&
                        addService.map((item: addProductService<string, number>, index: number) => (
                            <div key={index} className="w-full">
                                <div className='bg-white w-full rounded-lg flex justify-between pb-3'>
                                    <div className='flex'>
                                        <div className='pl-3 h-[13vh] py-2'>
                                            <img src={item.image} className='w-auto h-full' alt="" />
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
                                            removeProduct(item?.id)
                                        }}>Xóa</button>

                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='w-full bg-white h-[10vh] flex justify-around py-5'>
                    <button className='w-[150px] bg-slate-200 hover:bg-red-700 hover:text-white font-semibold text-[18px] rounded-lg'
                        onClick={() => {
                            localStorage.removeItem('updateOrderData');
                            setOrderData([]);
                            setAddService([...tranfomDataProduct]);
                            onClose();
                        }}
                    >Hủy</button>
                    {addService.length > 0
                        ? orderData.some((item) => item.repairServiceId)

                            ? (
                                <button className='w-[200px] bg-slate-200 hover:bg-main hover:text-white font-semibold text-[18px] rounded-lg'
                                    onClick={() => setShowStaff(true)}
                                >Tiếp theo</button>
                            ) : (
                                <button className='w-[200px] bg-slate-200 hover:bg-main hover:text-white font-semibold text-[18px] rounded-lg'
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

export default UpdateService