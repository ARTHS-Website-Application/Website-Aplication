import { getFilterServices, getServices } from '@/actions/service';
import LoadingPage from '@/components/LoadingPage';
import Pagination from '@/components/Pagination';
import { dataService, itemService, selectorService } from '@/types/actions/listService';
import { typeActiveProduct } from '@/types/typeProduct';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListService from '../listService/ListService';
import { showWarningAlert } from '@/constants/chooseToastify';
import InforUserService from '../inforUserService/InforUserService';

const CreateOrderService = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    const dataService: dataService<string, number> = useSelector((state: selectorService<string, number>) => state.serviceReducer.serviceInfor);
    const [serviceData, setServiceData] = useState([] as itemService<string, number>[]);
    const [addService, setAddService] = useState<itemService<string, number>[]>([]);
    const [addSearch, setAddSearch] = useState<string>("")
    const [searchTimeout, setSearchTimeout] = useState<number | null>(null);
    const [paginationNumber, setPaginationNumber] = useState<number>(0);
    useEffect(() => {
        const activeProducts = dataService.data?.filter((product) => product.status === typeActiveProduct.Active);
        setServiceData(activeProducts);
        setIsLoading(false);
    }, [dataService.data]);

    useEffect(() => {
        if (dataService?.pagination?.totalRow) {
            setPaginationNumber(0);
            setIsLoading(false);
        }
    }, [dataService.pagination?.totalRow]);

    useEffect(() => {
        if ( addSearch !== "") {
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

    //thêm service
    const handleAddService = (data: itemService<string, number>) => {
        const itemToAdd = data;
        const existingCartItems = addService || [];

        const isProductInCart = existingCartItems.some((item) => item.id === itemToAdd.id);
        if (isProductInCart) {
            showWarningAlert(`Dịch vụ đã được thêm, mời bạn kiểm tra lại`)
        } else {
            const updatedItems = [...existingCartItems, itemToAdd];
            setAddService(updatedItems);
            localStorage.setItem('serviceItems', JSON.stringify(updatedItems));
        }
    }

    //xóa service
    const handleRemoveProduct = (itemId: string) => {
        const existingCartItems: itemService<string, number>[] = JSON.parse(localStorage.getItem('serviceItems') as string) || [];
        const updatedItems = existingCartItems.filter((item: itemService<string, number>) => item.id !== itemId);
        localStorage.setItem('serviceItems', JSON.stringify(updatedItems));
        setAddService(updatedItems);
    }
    return (
        <div className=" w-full min-h-[83.4vh] flex">
            <div className="w-[77%] px-3">
                <div className=" w-full flex justify-between space-x-5">
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

                {/* danh sách sản phẩm*/}
                {isLoading ? (
                    <LoadingPage />
                ) : dataService?.data?.length > 0 ? (
                    <div className='flex flex-col space-y-3'>
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
                    <div className='w-full h-[60vh] flex justify-center items-center'>
                        <p className='text-[20px]'>Không tìm thấy dịch vụ</p>
                    </div>
                )}
            </div>
            <InforUserService
                setAddService={setAddService}
                addService={addService}
                removeProduct={handleRemoveProduct}
            />

        </div>
    )
}

export default CreateOrderService