import LoadingPage from '@/components/LoadingPage';
import Pagination from '@/components/Pagination';
import { dataService, itemService } from '@/types/actions/listService';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useState,useEffect } from 'react';
import { showWarningAlert } from '@/constants/chooseToastify';
import ListService from '@/pages/teller/listService/ListService';

type Props={
    dataService:dataService<string, number>,
    setAddSearch:React.Dispatch<React.SetStateAction<string>>,
    isLoading:boolean,
    setIsLoading:React.Dispatch<React.SetStateAction<boolean>>

}

const ChooseServiceOrder = ({dataService,setAddSearch,isLoading,setIsLoading}:Props) => {
    const [serviceData, setServiceData] = useState([] as itemService<string, number>[]);
    const [addService, setAddService] = useState<itemService<string, number>[]>([]);
    const [searchTimeout, setSearchTimeout] = useState<number | null>(null);
    const [paginationNumber, setPaginationNumber] = useState<number>(0);
    useEffect(() => {
        setServiceData(dataService.data);
        setIsLoading(false);
    }, [dataService.data, setIsLoading]);

    useEffect(() => {
        if (dataService?.pagination?.totalRow) {
            setPaginationNumber(0);
            setIsLoading(false);
        }
    }, [dataService?.pagination?.totalRow, setIsLoading]);

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
    // const handleRemoveProduct = (itemId: string) => {
    //     const existingCartItems: itemService<string, number>[] = JSON.parse(localStorage.getItem('serviceItems') as string) || [];
    //     const updatedItems = existingCartItems.filter((item: itemService<string, number>) => item.id !== itemId);
    //     localStorage.setItem('serviceItems', JSON.stringify(updatedItems));
    //     setAddService(updatedItems);
    // }
    return (
            <div className="w-full">
                <div className=" w-full flex justify-between space-x-5">
                    {/* search */}
                    <form className="w-[70%]">
                        <div className="w-full relative">
                            <input
                                type="text"
                                placeholder="Tìm kiếm dịch vụ"
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
                    <div className='flex flex-col space-y-3 pt-5'>
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
    )
}

export default ChooseServiceOrder