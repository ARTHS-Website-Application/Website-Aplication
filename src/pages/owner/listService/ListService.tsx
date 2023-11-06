import { getSortServices } from '@/actions/service'
import LoadingPage from '@/components/LoadingPage'
import Pagination from '@/components/Pagination'
import SearchFilter from '@/components/SearchFilter'
import TableService from '@/components/owner/TableService'
import { dataService, itemService, selectorService } from '@/types/actions/listService'
import { typeService } from '@/types/typeService'
import { PlusIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ListService = () => {
    const dispatch = useDispatch();
    const serviceInfor: dataService<string, number> = useSelector((state: selectorService<string, number>) => state.serviceReducer.serviceInfor);
    const [productData, setProductData] = useState([] as itemService<string, number>[]);
    const [paginationNumber, setPaginationNumber] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [addSearch, setAddSearch] = useState<string>("");
    const [sortValue, setSortValue] = useState<string>("");
    const [sortAsc, setSortAsc] = useState<boolean | undefined>();
    const [sortAscPrice, setSortAscPrice] = useState<boolean | undefined>();
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 500)
        setProductData(serviceInfor.data);

    }, [serviceInfor.data]);
    useEffect(() => {
        if (serviceInfor.pagination?.totalRow) {
            setPaginationNumber(0);
            setTimeout(() => {
                setIsLoading(false);
            }, 500)
        }
    }, [serviceInfor.pagination?.totalRow]);
    useEffect(() => {
        if (sortValue === 'name') {
            const data = {
                value: sortValue,
                sortByAsc: sortAsc,
                name: addSearch,
                pageNumber: paginationNumber,
                status: typeService.Active,
            }
            setSortAscPrice(undefined)
            dispatch(getSortServices(data));
            setIsLoading(true);
        } else if (sortValue === 'price') {
            const data = {
                value: sortValue,
                sortByAsc: sortAscPrice,
                name: addSearch,
                pageNumber: paginationNumber,
                status: typeService.Active,
            }
            setSortAsc(undefined)
            dispatch(getSortServices(data));
            setIsLoading(true);
        } else {
            const data = {
                value: sortValue,
                sortByAsc: sortAscPrice,
                name: addSearch,
                pageNumber: paginationNumber,
                status: typeService.Active,
            }
            setSortAsc(undefined)
            dispatch(getSortServices(data));
            setIsLoading(true);
        }



    }, [addSearch, dispatch, paginationNumber, sortAsc, sortAscPrice, sortValue])

    return (
        <div className="w-full">
            <div className="flex justify-between items-center">
                <h1 className="text-main text-[24px] font-semibold">Danh sách dịch vụ</h1>
                <Link to="/manage-services/create-service"
                    className='flex font-semibold bg-main w-[150px]  hover:bg-red-500 py-3 rounded-lg items-center justify-center '
                >
                    <PlusIcon className="w-5 h-5" />
                    <p>Tạo dịch vụ</p>
                </Link>
            </div>
            <div className="py-3">
                <SearchFilter place={'Tìm kiếm dịch vụ'} setAddSearch={setAddSearch} />
            </div>
            <div className="">
                {isLoading
                    ? <LoadingPage />
                    : (
                        <div>
                            <div className="min-h-[70vh]">
                                <TableService
                                    setSortValue={setSortValue}
                                    setSortAscPrice={setSortAscPrice}
                                    setSortAsc={setSortAsc}
                                    productData={productData}
                                />
                            </div>
                            <Pagination
                                totalPosts={serviceInfor.pagination?.totalRow}
                                postsPerPage={serviceInfor.pagination?.pageSize}
                                setCurrentPage={setPaginationNumber}
                                currentPage={paginationNumber}
                            />
                        </div>
                    )
                }
            </div>


        </div>
    )
}

export default ListService