// import SearchFilter from '@/components/SearchFilter'
import Pagination from '@/components/Pagination'
import { useEffect, useState } from 'react'
import TableOrder from '@/components/teller/TableOrder'
import { useDispatch, useSelector } from 'react-redux'
import { getOrder } from '@/actions/order'
import { itemOrder, listOrder, selectorOrder } from '@/types/actions/listOrder'
import { statusOrder } from '@/types/typeOrder'
import LoadingPage from '@/components/LoadingPage'


const ListOrder = () => {
  const dispatch = useDispatch()
  const orderInfor: listOrder<string, number> = useSelector((state: selectorOrder<string, number>) => state.orderReducer.orderInfor);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orderData, setOrderData] = useState([] as itemOrder<string, number>[]);
  const [paginationNumber, setPaginationNumber] = useState<number>(0);

  useEffect(() => {
    if (orderInfor.pagination?.totalRow) {
      setPaginationNumber(0);
    }
  }, [orderInfor.pagination?.totalRow]);

  useEffect(() => {
    dispatch(getOrder(paginationNumber, statusOrder.Paid));
    setIsLoading(true);
  }, [dispatch, paginationNumber])

  useEffect(() => {
    setOrderData(orderInfor.data)
    setTimeout(() => {
      setIsLoading(false);
    }, 1000)
  }, [orderInfor.data])

  return (
    <div className="w-full min-h-full">
      <h1 className="font-semibold text-[24px]">Danh sách đơn hàng</h1>
      <div className="pt-3">
      </div>
      {isLoading
        ? <LoadingPage />
        : (
          <div>
            {/* Table */}
            <div className={`${orderData?.length < 12 ? "h-[70vh]" : ""}`}>
              <TableOrder data={orderData} />
            </div>
            <div className="pt-3">
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