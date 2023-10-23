import { ShowProduct } from '@/actions/product'
import LoadingPage from '@/components/LoadingPage'
import Pagination from '@/components/Pagination'
import Search from '@/components/Search'
import TableProductOwner from '@/components/owner/TableProductOwner'
import { item, itemProduct, selectorProduct } from '@/types/actions/product'
import { PlusIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ListProduct = () => {
    const dispatch = useDispatch();
    const productInfor: itemProduct<string, number> = useSelector((state: selectorProduct<string, number>) => state.productReducer.productInfor);
    const [productData, setProductData] = useState([] as item<string, number>[]);
    const [paginationNumber, setPaginationNumber] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [addSearch, setAddSearch] = useState<string>("");
    useEffect(() => {
        setProductData(productInfor.data);
        setIsLoading(false);
    }, [productInfor.data]);
    useEffect(() => {
        dispatch(ShowProduct(paginationNumber));
        setIsLoading(true);
    }, [dispatch, paginationNumber])

    return (
        <div className="w-full">
            <div className="flex justify-between items-center">
                <h1 className="text-main text-[24px] font-semibold">Danh sách sản phẩm</h1>
                <Link to="/manage-products/create-product"
                    className='flex font-semibold bg-main w-[150px]  hover:bg-red-500 py-3 rounded-lg items-center justify-center '
                >
                    <PlusIcon className="w-5 h-5" />
                    <p>Tạo sản phẩm</p>
                </Link>
            </div>
            <div className="py-3">
                <Search />
            </div>
            <div className="">
                {isLoading
                    ? <LoadingPage />
                    : <TableProductOwner productData={productData} />
                }
            </div>
            <Pagination
                totalPosts={productInfor.pagination?.totalRow}
                postsPerPage={productInfor.pagination?.pageSize}
                setCurrentPage={setPaginationNumber}
                currentPage={paginationNumber}
            />

        </div>
    )
}

export default ListProduct