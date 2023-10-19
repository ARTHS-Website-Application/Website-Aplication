import SearchFilter from '@/components/SearchFilter'
import Pagination from '@/components/Pagination'
import { useEffect, useState } from 'react'
import TableOrder from '@/components/teller/TableOrder'
import { useDispatch, useSelector } from 'react-redux'
import { getOrder } from '@/actions/order'
import { itemOrder, listOrder, selectorOrder } from '@/types/actions/listOrder'
import { statusOrder } from '@/types/typeOrder'


const ListOrder = () => {
  const dispatch = useDispatch()
  const orderInfor: listOrder<string, number> = useSelector((state: selectorOrder<string, number>) => state.orderReducer.orderInfor);
  const [orderData, setOrderData] = useState([] as itemOrder<string, number>[]);
  const [paginationNumber,setPaginationNumber] =useState<number>(0);
  console.log(orderData)

  useEffect(() => {
    dispatch(getOrder(paginationNumber));
  }, [dispatch,])

  useEffect(()=>{
    const filteredOrderInfor = orderInfor.data?.filter(item => item.status !== statusOrder.Paid);
    setOrderData(filteredOrderInfor)
  },[orderInfor.data])

  return (
    <div className="w-full min-h-full">
      <h1 className="font-semibold text-[24px]">Danh sách đơn hàng</h1>
      <div className="pt-3">
      </div>
      {/* Table */}
      <TableOrder data={orderData} />

    </div>
  )
}

export default ListOrder