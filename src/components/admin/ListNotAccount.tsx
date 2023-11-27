import { getFilterNotAccount } from '@/actions/userInfor';
import { typeAccount } from '@/types/typeAuth';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SearchFilterAccount from '../SearchFilterAccount';
import { dataAccount, itemAccount, selectorListFilterAccount } from '@/types/actions/listAccount';
import Pagination from '../Pagination';
import TableAccount from './TableAccount';
import LoadingPage from '../LoadingPage';
import ShowCreateAccount from './ShowCreateAccount';

const ListNotAccount = () => {
    const dispatch = useDispatch();
    const accountAllInfor: dataAccount<number> = useSelector((state: selectorListFilterAccount<string, number>) => state.filterAccountReducer.ListFilterNotAccount);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showCreate,setShowCreate] = useState<boolean>(false);
    const [addSearch, setAddSearch] = useState<string>("");
    const [paginationNumber, setPaginationNumber] = useState<number>(0);
    const [productData, setProductData] = useState<itemAccount[]>([]);
    useEffect(() => {
        if (accountAllInfor) {
            setProductData(accountAllInfor.data);
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }
    }, [accountAllInfor]);
    useEffect(() => {
        if (accountAllInfor.pagination?.totalRow) {
            setPaginationNumber(0);
        }
    }, [accountAllInfor.pagination?.totalRow]);

    useEffect(() => {
        const data = {
            pageNumber: paginationNumber,
            status: typeAccount.InActive,
            fullName: addSearch,
        }
        dispatch(getFilterNotAccount(data));
        setIsLoading(true);
    }, [addSearch, dispatch, paginationNumber])
    return (
        <div className="pt-3">
            <div className="flex justify-between items-center px-3">
                <SearchFilterAccount place={'Tìm kiếm tài khoản'} setAddSearch={setAddSearch} />
                <button className="p-3 bg-main hover:bg-[#d68669] text-white font-semibold rounded-lg flex space-x-3 items-center "
                    onClick={() => setShowCreate(true)}
                >
                    <p>Tạo tài khoản</p>
                    <PlusIcon className="w-7 h-7" />
                </button>
            </div>
            <div className="">
                {isLoading
                    ? <LoadingPage />
                    : (
                        <div className='pt-2'>
                            {productData?.length > 0
                                ? (<div className={`h-[55vh]`}>
                                    <TableAccount data={productData} />
                                </div>)
                                : (
                                    <div className='flex justify-center items-center h-[55vh]'>
                                        <p className='font-semibold text-[30px]'>Không tìm thấy tài khoản</p>
                                    </div>
                                )}
                            <div>
                                <Pagination
                                    totalPosts={accountAllInfor.pagination?.totalRow}
                                    postsPerPage={accountAllInfor.pagination?.pageSize}
                                    setCurrentPage={setPaginationNumber}
                                    currentPage={paginationNumber}
                                />
                            </div>
                        </div>
                    )
                }
            </div>
            <ShowCreateAccount
            onClose={() => setShowCreate(false)}
            isVisible={showCreate}
            />
        </div>
    )
}

export default ListNotAccount