import SearchFilter from '@/components/SearchFilter'
import Pagination from '@/components/Pagination'
import { useEffect, useState } from 'react'
import TableOrder from '@/components/teller/TableOrder'
import { useDispatch, useSelector } from 'react-redux'
import { getFilterOrder, getOrder } from '@/actions/order'
import { itemOrder, listOrder, selectorOrder } from '@/types/actions/listOrder'
import { statusOrder } from '@/types/typeOrder'
import LoadingPage from '@/components/LoadingPage'


const ListOrder = () => {
  const dispatch = useDispatch()
  const orderInfor: listOrder<string, number> = useSelector((state: selectorOrder<string, number>) => state.orderReducer.orderInfor);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orderData, setOrderData] = useState([] as itemOrder<string, number>[]);
  const [paginationNumber, setPaginationNumber] = useState<number>(0);
  const [addSearch, setAddSearch] = useState<string>("");
  const [chooseSelect, setChooseSelect] = useState<string>("name");

  useEffect(() => {
    if (orderInfor.pagination?.totalRow) {
      setPaginationNumber(0);
    }
  }, [orderInfor.pagination?.totalRow]);

  useEffect(() => {
    if (addSearch !== "") {
      if (chooseSelect === "name") {
        const data = {
          customerName: addSearch,
          customerPhone: "",
          number: paginationNumber,
          excludeOrderStatus: statusOrder.Paid,
        }
        dispatch(getFilterOrder(data))
      } else if (chooseSelect === "sdt") {
        const data = {
          customerName: "",
          customerPhone: addSearch,
          number: paginationNumber,
          excludeOrderStatus: statusOrder.Paid,
        }
        dispatch(getFilterOrder(data))
      }
    } else {
      dispatch(getOrder(paginationNumber, statusOrder.Paid));
      setIsLoading(true);
    }

  }, [addSearch, chooseSelect, dispatch, paginationNumber])

  useEffect(() => {
    setOrderData(orderInfor.data)
    setTimeout(() => {
      setIsLoading(false);
    }, 500)
  }, [orderInfor.data])

  return (
    <div className="w-full min-h-full">
      <h1 className="font-semibold text-[24px]">Danh sách đơn hàng</h1>
      <div className="pt-2 flex space-x-1">
        <select className='px-2 outline-none rounded-lg'
          onChange={(e) => {
            setChooseSelect(e.target.value)
            setAddSearch("");
          }}
        >
          <option value="name">Tên khách hàng</option>
          <option value="sdt">Số điện thoại</option>
        </select>
        <SearchFilter place={'Tìm kiếm đơn hàng'} setAddSearch={setAddSearch} />
      </div>
      {isLoading
        ? <LoadingPage />
        : (
          <div>
            {/* Table */}
            {orderData?.length>0 
            ?(<div className={`${orderData?.length < 12 ? "h-[67vh]" : ""}`}>
            <TableOrder data={orderData} />
          </div>)
          :(
            <div className='flex justify-center items-center h-[67vh]'>
              <p className='font-semibold text-[30px]'>Không tìm thấy đơn hàng</p>
            </div>
          )}
            

            <div className="pt-1">
              <Pagination
                totalPosts={orderInfor.pagination?.totalRow}
                postsPerPage={orderInfor.pagination?.pageSize}
                setCurrentPage={setPaginationNumber}
                currentPage={paginationNumber}
              />
            </div>
          </div>
        )
      }
    </div>
  )
}

export default ListOrder