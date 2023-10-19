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
import Loading from '@/components/Loading'

const CreateOrder = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const productInfor: itemProduct<string, number> = useSelector((state: selectorProduct<string, number>) => state.productReducer.productInfor);
  const categoryProduct: itemCategoryProduct<string>[] = useSelector((state: selectorCategoryProduct<string>) => state.categoryProductReducer.categoryProduct);
  const [productData, setProductData] = useState([] as item<string, number>[]);
  const [addProduct, setAddProduct] = useState<item<string, number>[]>();
  const [addCategory, setAddCategory] = useState<string>("");
  const [addSearch, setAddSearch] = useState<string>("")
  const [searchTimeout, setSearchTimeout] = useState<number | null>(null);
  const [paginationNumber,setPaginationNumber] =useState<number>(0);
  //dispatch
  useEffect(() => {
    dispatch(CategoryProduct());
  }, [dispatch])

  //data product
  useEffect(() => {
    setTimeout(() => {
      setProductData(productInfor.data);
      setIsLoading(false);
    })
  }, [productInfor.data]);

  //add product
  useEffect(() => {
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems') as string) || [];
    setAddProduct(existingCartItems);
  }, []);

  //filter data
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
    }else{
      dispatch(ShowProduct(paginationNumber));
      setIsLoading(true);
    }
  }, [dispatch, addCategory, addSearch,paginationNumber])

  //add product
  const handleAddProduct = (data: item<string, number>) => {
    const itemToAdd = data;
    const existingCartItems = addProduct || [];

    const isProductInCart = existingCartItems.some((item) => item.id === itemToAdd.id);
    if (isProductInCart) {
      showWarningAlert(`Sản phẩm đã được thêm, mời bạn kiểm tra lại`)
    } else {
      const updatedItems = [itemToAdd, ...existingCartItems];
      setAddProduct(updatedItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    }
  }

  //remove product
  const handleRemoveProduct = (itemId: string) => {
    const existingCartItems: item<string, number>[] = JSON.parse(localStorage.getItem('cartItems') as string) || [];
    const updatedItems = existingCartItems.filter((item: item<string, number>) => item.id !== itemId);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    setAddProduct(updatedItems);
  }

  return (
    <div className=" w-full min-h-[83.4vh] flex">
      <div className="w-[77%] px-3">
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
                  // Set a new search timeout
                  const newTimeSearch = window.setTimeout(() => {
                    setAddSearch(e.target.value);
                  }, 800);

                  // Update the searchTimeout state
                  setSearchTimeout(newTimeSearch);
                }}

              />
              <MagnifyingGlassIcon className="w-6 h-6 absolute right-3 top-0 bottom-0 my-auto stroke-gray-500" />
            </div>
          </form>
        </div>

        {/* list Item */}
        {isLoading ? (
          <Loading />
        ) : productData? (
          <div className='flex flex-col space-y-3'>
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
          <div className='w-full h-[60vh] flex justify-center items-center'>
            <p className='text-[20px]'>không tìm thấy sản phẩm</p>
          </div>
        )}
      </div>
      <InforUser
        addProduct={addProduct}
        removeProduct={handleRemoveProduct}
      />
    </div>
  )
}

export default CreateOrder