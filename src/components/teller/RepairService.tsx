import { showWarningAlert } from '@/constants/chooseToastify';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../Pagination';
import Loading from '../LoadingPage';
import { inStoreOrderDetails } from '@/types/actions/detailOrder';
import { typeActiveProduct } from '@/types/typeProduct';
import { dataService, itemService, selectorService } from '@/types/actions/listService';
import { getFilterServices, getServices } from '@/actions/service';
import ListService from '@/pages/teller/listService/ListService';
import { addProductService } from '@/types/actions/product';
import UpdateService from './UpdateService';

type Props = {
    isVisible: boolean;
    onClose: () => void;
    dataProduct?: inStoreOrderDetails<string, number>[];
    idOrder: string | null;
}

const RepairService = ({ isVisible, onClose, dataProduct, idOrder }: Props) => {
    const tranfomDataProduct: addProductService<string, number>[] = (dataProduct ?? []).map((item: inStoreOrderDetails<string, number>) => {
        const transformedItem: addProductService<string, number> = {
            id: item.repairService.id,
            name: item.repairService.name,
            price: item.repairService.price,
            image: item.repairService.image
        };
        return transformedItem;
    });
    useEffect(() => {
        setAddService(tranfomDataProduct);
    }, [dataProduct])
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [serviceData, setServiceData] = useState([] as itemService<string, number>[]);
    const [addService, setAddService] = useState<addProductService<string, number>[]>(tranfomDataProduct);
    const [addSearch, setAddSearch] = useState<string>("")
    const [searchTimeout, setSearchTimeout] = useState<number | null>(null);
    const [paginationNumber, setPaginationNumber] = useState<number>(0);
    const dataService: dataService<string, number> = useSelector((state: selectorService<string, number>) => state.serviceReducer.serviceInfor);
    const dispatch = useDispatch();

    useEffect(() => {
        const activeProducts = dataService.data?.filter((product) => product.status === typeActiveProduct.Active);
        setServiceData(activeProducts);
        setIsLoading(false);
    }, [dataService?.data]);
    useEffect(() => {
        if (dataService.pagination?.totalRow) {
            setPaginationNumber(0);
            setIsLoading(false);
        }
    }, [dataService.pagination?.totalRow]);
    useEffect(() => {
        if (addSearch !== "") {
            const data = {
                paginationNumber: paginationNumber,
                name: addSearch,
            }
            setTimeout(() => {
                dispatch(getFilterServices(data))
                setIsLoading(true);
            }, 200)
        } else {
            dispatch(getServices(paginationNumber));
            setIsLoading(true);
        }
    }, [dispatch, addSearch, paginationNumber])


    const handleAddService = (data: itemService<string, number>) => {
        const newData: addProductService<string, number> = {
            id: data.id,
            name: data.name,
            price: data.price,
            image: data.images[0].imageUrl
        }
        const itemToAdd = newData;
        const existingCartItems = addService || [];

        const isProductInCart = existingCartItems.some((item) => item.id === itemToAdd.id);
        if (isProductInCart) {
            showWarningAlert(`Dịch vụ đã được thêm, mời bạn kiểm tra lại`)
        } else {
            const updatedItems = [...existingCartItems, itemToAdd];
            setAddService(updatedItems);
            localStorage.setItem('serviceUpdateItems', JSON.stringify(updatedItems));
        }
    }

    //xóa service
    const handleRemoveProduct = (itemId: string) => {
        const existingCartItems: addProductService<string, number>[] = JSON.parse(localStorage.getItem('serviceUpdateItems') as string) || [];
        const updatedItems = existingCartItems.filter((item: addProductService<string, number>) => item.id !== itemId);
        localStorage.setItem('serviceUpdateItems', JSON.stringify(updatedItems));
        setAddService(updatedItems);
    }

    if (!isVisible) {
        return null;
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">

            <div className="w-[80%] bg-white rounded-lg">
                <div className="bg-gray-600 py-2 rounded-t-lg">
                    <div className="w-full flex flex-row justify-between py-[5px] text-white ">
                        <p className="ml-2 mt-1 font-bold">Cập nhật sản phẩm</p>
                    </div>
                </div>
                <div className='px-3 pt-5'>
                    <div className="flex">
                        <div className=" w-[70vw] flex justify-between space-x-5">
                            {/* search */}
                            <form className="w-[70%]">
                                <div className="w-full relative">
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm sản phẩm"
                                        className="w-full py-3 pl-3 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-gray-20"
                                        onChange={(e) => {
                                            if (searchTimeout) {
                                                clearTimeout(searchTimeout);
                                            }
                                            const newTimeSearch = window.setTimeout(() => {
                                                setAddSearch(e.target.value);
                                            }, 800);
                                            // Cập nhật trạng thái searchTimeout
                                            setSearchTimeout(newTimeSearch);
                                        }}
                                    />
                                    <MagnifyingGlassIcon className="w-6 h-6 absolute right-3 top-0 bottom-0 my-auto stroke-gray-500" />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='flex'>
                        {isLoading ? (
                            <Loading />
                        ) : serviceData ? (
                            <div className='w-[70%] flex flex-col space-y-3'>
                                <div className='w-full py-3 '>
                                    <h1 className="text-[20px] w-full font-semibold">Tất cả sản phẩm</h1>
                                </div>
                                <div className=' w-full flex flex-col space-y-3'>
                                    <ListService
                                        onClickAdd={handleAddService}
                                        data={serviceData} />
                                </div>
                                <Pagination
                                    totalPosts={dataService.pagination?.totalRow}
                                    postsPerPage={dataService.pagination?.pageSize}
                                    setCurrentPage={setPaginationNumber}
                                    currentPage={paginationNumber}
                                />
                            </div>
                        ) : (
                            <div className='w-[70%] h-[60vh] flex justify-center items-center'>
                                <p className='text-[20px]'>không tìm thấy sản phẩm</p>
                            </div>
                        )}
                        <UpdateService
                            idOrder={idOrder}
                            tranfomDataProduct={tranfomDataProduct}
                            setAddService={setAddService}
                            addService={addService}
                            removeProduct={handleRemoveProduct}
                            onClose={onClose}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default RepairService