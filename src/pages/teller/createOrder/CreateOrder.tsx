import SearchFilter from '@/components/SearchFilter'
import { useEffect, useState } from 'react'
import ListProduct from '../listProduct/ListProduct'
import InforUser from '../inforUser/InforUser'
import { useDispatch, useSelector } from 'react-redux'
import { ShowProduct } from '@/actions/product'
import { itemProduct, selectorProduct } from '@/types/actions/product'
import Pagination from '@/components/Pagination'

const CreateOrder = () => {
  const dispatch = useDispatch();
  const productInfor: itemProduct<string, number>[] = useSelector((state: selectorProduct<string, number>) => state.productReducer.productInfor);
  const [productData, setProductData] = useState([] as itemProduct<string, number>[]);
  const [currentPage, setCurrentPage] = useState(1);
  const [addProduct,setAddProduct] = useState<itemProduct<string, number>[]>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [postsPerPage, setPostsPerPage] = useState(12);
  useEffect(() => {
    dispatch(ShowProduct());
  }, [])
  useEffect(() => {
    setProductData(productInfor);
  }, [productInfor]);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = productData.slice(firstPostIndex, lastPostIndex);
  const handleAddProduct = (data: itemProduct<string, number>) => {
    const itemToAdd = data;
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems') as string) || [];
    const updatedItems = [...existingCartItems, itemToAdd];
    setAddProduct(updatedItems);
    // Add the new item to the cart
    existingCartItems.push(itemToAdd);
    // Save the updated cart items back to local storage
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  }
  console.log("first",addProduct)
  return (
    <div className=" w-full min-h-[83.4vh] flex">
      <div className="w-[60%] px-3">
        <div className=" w-full flex justify-between space-x-5">
          {/* <div className="bg-slate-400 w-[20%]">
            <p>Danh mục</p>
          </div> */}
          <SearchFilter />
        </div>
        {/* list Item */}
        <div className=' py-3 w-full flex flex-col space-y-3'>
          <div className='w-full'>
            <h1 className="text-[20px] w-full font-semibold">Tất cả sản phẩm</h1>
          </div>
          <ListProduct
            onClickAdd={handleAddProduct}
            data={currentPosts} />
        </div>
        <Pagination
          totalPosts={productData.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
      <InforUser addProduct={addProduct} />
    </div>
  )
}

export default CreateOrder