import { CategoryProduct, FilterProduct, ShowProduct } from '@/actions/product';
import { showWarningAlert } from '@/constants/chooseToastify';
import { itemCategoryProduct, selectorCategoryProduct } from '@/types/actions/categoryPr';
import { addProductOrder, item, itemProduct, selectorProduct } from '@/types/actions/product';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../Pagination';
import ListProduct from '@/pages/teller/listProduct/ListProduct';
import Loading from '../LoadingPage';
import UpdateProduct from '@/components/teller/UpdateProduct';
import { inStoreOrderDetails } from '@/types/actions/detailOrder';
import { typeActiveProduct } from '@/types/typeProduct';

type Props = {
    isVisible: boolean;
    onClose: () => void;
    dataProduct?: inStoreOrderDetails<string, number>[];
    idOrder: string | null;
}

const RepairProduct = ({ isVisible, onClose, dataProduct, idOrder }: Props) => {
    const tranfomDataProduct: addProductOrder<string, number>[] = (dataProduct ?? []).map((item: inStoreOrderDetails<string, number>) => {
        const transformedItem: addProductOrder<string, number> = {
            idProduct: item?.motobikeProduct.id,
            nameProduct: item?.motobikeProduct.name,
            priceCurrent: item?.productPrice,
            priceProduct: item.motobikeProduct.priceCurrent,
            discountAmount: null,
            image: item.motobikeProduct.image,
            productQuantity: item.productQuantity,
            repairService: item?.repairService ?? null,
        };
        return transformedItem;
    });
    useEffect(() => {
        setAddProduct(tranfomDataProduct);
    }, [dataProduct])
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [productData, setProductData] = useState([] as item<string, number>[]);
    const [addProduct, setAddProduct] = useState<addProductOrder<string, number>[]>(tranfomDataProduct);
    const [addCategory, setAddCategory] = useState<string>("");
    const [addSearch, setAddSearch] = useState<string>("")
    const [searchTimeout, setSearchTimeout] = useState<number | null>(null);
    const [paginationNumber, setPaginationNumber] = useState<number>(0);
    const categoryProduct: itemCategoryProduct<string>[] = useSelector((state: selectorCategoryProduct<string>) => state.categoryProductReducer.categoryProduct);
    const productInfor: itemProduct<string, number> = useSelector((state: selectorProduct<string, number>) => state.productReducer.productInfor);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(CategoryProduct());
    }, [dispatch])

    useEffect(() => {
        const activeProducts = productInfor.data?.filter((product) => product.status === typeActiveProduct.Active);
        setProductData(activeProducts);
        setIsLoading(false);
    }, [productInfor?.data]);

    useEffect(() => {
        if (addCategory !== "" || addSearch !== "") {
            const data = {
                paginationNumber: paginationNumber,
                name: addSearch,
                category: addCategory,
            }
            setTimeout(() => {
                dispatch(FilterProduct(data))
                setIsLoading(true);
            }, 200)
        } else {
            dispatch(ShowProduct(paginationNumber));
            setIsLoading(true);
        }
    }, [dispatch, addCategory, addSearch, paginationNumber])

    //thêm product
    const handleAddProduct = (data: item<string, number>) => {
        const newData: addProductOrder<string, number> = {
            idProduct: data.id,
            nameProduct: data.name,
            priceCurrent: null,
            priceProduct: data.priceCurrent,
            discountAmount: data?.discount ? data.discount?.discountAmount : null,
            image: data.images[0].imageUrl,
            productQuantity: 1,
            repairService: data?.repairService
        }
        const itemToAdd = newData;
        const existingCartItems = addProduct || [];

        const isProductInCart = existingCartItems.some((item) => item.idProduct === itemToAdd.idProduct);
        if (isProductInCart) {
            showWarningAlert(`Sản phẩm đã được thêm, mời bạn kiểm tra lại`)
        } else {
            const updatedItems = [...existingCartItems, itemToAdd];
            setAddProduct(updatedItems);
            localStorage.setItem('cartItemsUpdate', JSON.stringify(updatedItems));
        }
    }

    //xóa product
    const handleRemoveProduct = (itemId: string) => {
        const existingCartItems: addProductOrder<string, number>[] = JSON.parse(localStorage.getItem('cartItemsUpdate') as string) || [];
        const updatedItems = existingCartItems.filter((item: addProductOrder<string, number>) => item.idProduct !== itemId);
        localStorage.setItem('cartItemsUpdate', JSON.stringify(updatedItems));
        setAddProduct(updatedItems);
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
                            <select className='cursor-pointer w-[220px] font-semibold rounded-lg text-center text-main focus:outline-none capitalize drop-shadow-xl'
                                onChange={(e) => {
                                    setAddCategory(e.target.value)
                                }}
                            >
                                <option value=' ' className='text-gray-700'>Danh mục</option>
                                {categoryProduct
                                    ? categoryProduct.map((item, index) => (
                                        <option
                                            className='text-gray-700'
                                            key={index}
                                        >{item.categoryName}</option>
                                    ))
                                    : ""
                                }
                            </select>
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
                        <div className="w-[30vw] flex space-x-5 items-center justify-center">
                            <p className="text-lg font-semibold">Nhân viên sửa</p>
                            <select className='h-10 border-2 border-gray-300 text-[18px] rounded-lg'>
                                <option value="" >Nhân viên</option>
                                <option value="6b345ba2-4068-4bc1-8f5a-42427cfe4b98">Staff 01</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex'>
                        {isLoading ? (
                            <Loading />
                        ) : productData ? (
                            <div className='w-[70%] flex flex-col space-y-3'>
                                <div className='w-full py-3 '>
                                    <h1 className="text-[20px] w-full font-semibold">Tất cả sản phẩm</h1>
                                </div>
                                <div className=' w-full flex flex-col space-y-3'>
                                    <ListProduct
                                        onClickAdd={handleAddProduct}
                                        data={productData} />
                                </div>
                                <Pagination
                                    totalPosts={productInfor.pagination?.totalRow}
                                    postsPerPage={productInfor.pagination?.pageSize}
                                    setCurrentPage={setPaginationNumber}
                                    currentPage={paginationNumber}
                                />
                            </div>
                        ) : (
                            <div className='w-[70%] h-[60vh] flex justify-center items-center'>
                                <p className='text-[20px]'>không tìm thấy sản phẩm</p>
                            </div>
                        )}
                        <UpdateProduct
                            idOrder={idOrder}
                            tranfomDataProduct={tranfomDataProduct}
                            setAddProduct={setAddProduct}
                            addProduct={addProduct}
                            removeProduct={handleRemoveProduct}
                            onClose={onClose}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default RepairProduct