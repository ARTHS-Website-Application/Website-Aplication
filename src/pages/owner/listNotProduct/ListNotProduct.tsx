import { SortProduct, updateStatusProduct } from '@/actions/product'
import LoadingPage from '@/components/LoadingPage'
import PaginationParam from '@/components/PaginationParam'
import SearchFilter from '@/components/SearchFilter'
import TableProductOwner from '@/components/owner/TableProductOwner'
import { item, itemProduct, selectorProduct } from '@/types/actions/product'
import { typeActiveProduct } from '@/types/typeProduct'
import { PlusIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const ListNotProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const productInfor: itemProduct<string, number> = useSelector((state: selectorProduct<string, number>) => state.productReducer.productInfor);
    const [productData, setProductData] = useState([] as item<string, number>[]);
    const [paginationNumber, setPaginationNumber] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [addSearch, setAddSearch] = useState<string>("");
    const [sortValue, setSortValue] = useState<string>("");
    const [sortAsc, setSortAsc] = useState<boolean | undefined>();
    const [sortAscPrice, setSortAscPrice] = useState<boolean | undefined>();
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000)
        setProductData(productInfor.data);

    }, [productInfor.data]);
    useEffect(() => {
        if (productInfor.pagination?.totalRow && addSearch) {
            setPaginationNumber(0);
            navigate('?page=1');
            setIsLoading(true)
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 1000)
    }, [addSearch, navigate, productInfor.pagination?.totalRow]);
    useEffect(() => {
        if (sortValue === 'name') {
            const data = {
                value: sortValue,
                sortByAsc: sortAsc,
                name: addSearch,
                pageNumber: paginationNumber,
                status: typeActiveProduct.InActive,
            }
            setSortAscPrice(undefined)
            dispatch(SortProduct(data));
            setIsLoading(true);
        } else if (sortValue === 'price') {
            const data = {
                value: sortValue,
                sortByAsc: sortAscPrice,
                name: addSearch,
                pageNumber: paginationNumber,
                status: typeActiveProduct.InActive,
            }
            setSortAsc(undefined)
            dispatch(SortProduct(data));
            setIsLoading(true);
        } else {
            const data = {
                value: sortValue,
                sortByAsc: sortAscPrice,
                name: addSearch,
                pageNumber: paginationNumber,
                status: typeActiveProduct.InActive,
            }
            setSortAsc(undefined)
            dispatch(SortProduct(data));
            setIsLoading(true);
        }
    }, [addSearch, dispatch, paginationNumber, sortAsc, sortAscPrice, sortValue])
    const handleRemove = (item: item<string, number>) => {
        const data = {
            value: sortValue,
            sortByAsc: sortValue === 'price' ? sortAscPrice : sortAsc,
            name: addSearch,
            pageNumber: paginationNumber,
            status: typeActiveProduct.InActive,
        };
        if (item) {
            const shouldDelete = window.confirm(`Bạn có chắc chắn muốn hoàng lại sản phẩm: ${item.name} ?`);
            if (shouldDelete) {
                dispatch(updateStatusProduct(item.id, typeActiveProduct.Active, data));
            }
        }


    }
    return (
        <div className="w-full">
            <div className="flex justify-between items-center pb-2">
                <SearchFilter
                    place={'Tìm kiếm sản phẩm'} setAddSearch={setAddSearch}
                />
                <Link to="/manage-products/create-product"
                    className='flex font-semibold bg-main w-[150px]  hover:bg-red-500 py-3 rounded-lg items-center justify-center '
                >
                    <PlusIcon className="w-5 h-5" />
                    <p>Tạo sản phẩm</p>
                </Link>
            </div>
            <div className="">
                {isLoading
                    ? <LoadingPage />
                    : (productData?.length > 0 ? (
                        <div>
                            <div className="min-h-[70vh]">
                                <TableProductOwner
                                    handleRemove={handleRemove}
                                    setSortValue={setSortValue}
                                    setSortAscPrice={setSortAscPrice}
                                    setSortAsc={setSortAsc}
                                    productData={productData} />
                            </div>
                            <PaginationParam
                                totalPosts={productInfor.pagination?.totalRow}
                                postsPerPage={productInfor.pagination?.pageSize}
                                setCurrentPage={setPaginationNumber}
                                currentPage={paginationNumber}
                            />
                        </div>
                    ) : (
                        <div className='h-[70vh] flex justify-center items-center'>
                            <p className="text-[25px] font-semibold">Không tìm thấy sản phẩm</p>
                        </div>
                    )

                    )
                }
            </div>


        </div>
    )
}

export default ListNotProduct