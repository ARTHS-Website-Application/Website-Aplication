import { useEffect, useState } from 'react'
import ListProduct from '../listProduct/ListProduct'
import InforUser from '../inforUser/InforUser'
import { useDispatch, useSelector } from 'react-redux'
import { CategoryProduct, FilterProduct, ShowProduct } from '@/actions/product'
import { item, itemProduct, selectorProduct } from '@/types/actions/product'
import Pagination from '@/components/Pagination'
import { showWarningAlert } from '@/constants/chooseToastify'
import { itemCategoryProduct, selectorCategoryProduct } from '@/types/actions/categoryPr'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Loading from '@/components/LoadingPage'
import { typeActiveProduct } from '@/types/typeProduct'
import { dataService, selectorService } from '@/types/actions/listService'
import ChooseServiceOrder from '@/components/teller/ChooseServiceOrder'
import { typeService } from '@/types/typeService'
import { getFilterServices, getServices } from '@/actions/service'
// import StaffSelect from '@/components/teller/StaffSelect'
enum createShow {
    showProduct = "show_product",
    showService = "show_service",
}
const CreateOrder = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showCreate, setShowCreate] = useState<createShow>(createShow.showProduct);
    const dispatch = useDispatch();
    const productInfor: itemProduct<string, number> = useSelector((state: selectorProduct<string, number>) => state.productReducer.productInfor);
    const dataService: dataService<string, number> = useSelector((state: selectorService<string, number>) => state.serviceReducer.serviceInfor);
    const categoryProduct: itemCategoryProduct<string>[] = useSelector((state: selectorCategoryProduct<string>) => state.categoryProductReducer.categoryProduct);
    const [productData, setProductData] = useState([] as item<string, number>[]);
    const [addProduct, setAddProduct] = useState<item<string, number>[]>([]);
    const [addCategory, setAddCategory] = useState<string>("");
    const [addSearch, setAddSearch] = useState<string>("");
    const [addSearchService,setAddSearchService] = useState<string>("")
    const [searchTimeout, setSearchTimeout] = useState<number | null>(null);
    const [paginationNumber, setPaginationNumber] = useState<number>(0);

    //dispatch loại product
    useEffect(() => {
        dispatch(CategoryProduct());
    }, [dispatch])

    //hiển thị sản phẩm theo api
    useEffect(() => {
        const activeProducts = productInfor.data?.filter((product) => product.status === typeActiveProduct.Active);
        setProductData(activeProducts);
        setIsLoading(false);
    }, [productInfor.data]);

    //thêm sản phẩm
    useEffect(() => {
        const existingCartItems = JSON.parse(localStorage.getItem('cartItems') as string) || [];
        setAddProduct(existingCartItems);
    }, []);

    //lọc sản phẩm
    useEffect(() => {
        if (productInfor.pagination?.totalRow) {
            setPaginationNumber(0);
            setTimeout(() => {
                setIsLoading(false);
            }, 500)
        }
    }, [productInfor.pagination?.totalRow]);
    useEffect(() => {
        if(showCreate===createShow.showProduct){
            if (addCategory !== "" || addSearch !== "") {
                const data = {
                    paginationNumber: paginationNumber,
                    name: addSearch,
                    category: addCategory,
                    status: typeActiveProduct.Active,
                }
                setTimeout(() => {
                    dispatch(FilterProduct(data))
                    setIsLoading(true);
                }, 200)
            } else {
                const data = {
                    status: typeActiveProduct.Active,
                    number: paginationNumber
                }
                dispatch(ShowProduct(data));
                setIsLoading(true);
            }
        }
    }, [addCategory, addSearch, dispatch, paginationNumber, showCreate])

    useEffect(() => {
        if(showCreate===createShow.showService){
            if ( addSearchService !== "") {
                const data = {
                    paginationNumber: 0,
                    name: addSearchService,
                    status:typeService.Active
                }
                setTimeout(() => {
                    dispatch(getFilterServices(data))
                    setIsLoading(true);
                }, 200)
            } else {
                const dataService= {
                    status:typeService.Active,
                    pageNumber:0,
                }
                dispatch(getServices(dataService));
                setIsLoading(true);
            }
        }
    }, [addSearchService, dispatch, showCreate])

    //thêm product
    const handleAddProduct = (data: item<string, number>) => {
        const itemToAdd = data;
        const existingCartItems = addProduct || [];

        const isProductInCart = existingCartItems.some((item) => item.id === itemToAdd.id);
        if (isProductInCart) {
            showWarningAlert(`Sản phẩm đã được thêm, mời bạn kiểm tra lại`)
        } else {
            const updatedItems = [...existingCartItems, itemToAdd];
            setAddProduct(updatedItems);
            localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        }
    }

    //xóa product
    const handleRemoveProduct = (itemId: string) => {
        const existingCartItems: item<string, number>[] = JSON.parse(localStorage.getItem('cartItems') as string) || [];
        const updatedItems = existingCartItems.filter((item: item<string, number>) => item.id !== itemId);
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        setAddProduct(updatedItems);
    }

    return (
        <div className=" w-full min-h-[83.4vh] flex">
            <div className="w-[55%] px-3">
                <div className="flex space-x-4 font-bold pb-5">
                    <button
                        onClick={() => setShowCreate(createShow.showProduct)}
                        className={`flex items-center justify-center px-7 h-[45px] rounded-md text-white
                            ${showCreate === createShow.showProduct
                                ? "bg-main"
                                : "bg-[#DEDEDE] hover:bg-main"}`}
                    >
                        Chọn sản phẩm
                    </button>
                    <button
                        onClick={() => setShowCreate(createShow.showService)}
                        className={`flex items-center justify-center px-7 h-[45px] rounded-md text-white
                            ${showCreate === createShow.showService
                                ? "bg-main"
                                : "bg-[#DEDEDE] hover:bg-main"}`}
                    >
                        Chọn  dịch vụ
                    </button>
                </div>
                {showCreate === createShow.showProduct 
                ? (
                    <div className="w-full">
                        <div className=" w-full flex justify-between space-x-5">
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

                        {/* danh sách sản phẩm*/}
                        {isLoading ? (
                            <Loading />
                        ) : productData.length > 0 ? (
                            <div className='flex flex-col pt-5 space-y-3'>
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
                            <div className='w-full h-[60vh] flex justify-center items-center'>
                                <p className='text-[20px]'>Không tìm thấy sản phẩm</p>
                            </div>
                        )}
                    </div>
                ):(
                    <ChooseServiceOrder 
                    
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    dataService={dataService}  
                    setAddSearch={setAddSearchService}/>
            )}
            </div>

            <InforUser
                setAddProduct={setAddProduct}
                addProduct={addProduct}
                removeProduct={handleRemoveProduct}
            // showStaff={setShowStaff}
            />

        </div>
    )
}

export default CreateOrder