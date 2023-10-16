import SearchFilter from '@/components/SearchFilter'
import Pagination from '@/components/Pagination'
import { useEffect, useState } from 'react'
import TableOrder from '@/components/teller/TableOrder'
import { useDispatch, useSelector } from 'react-redux'
import { getOrder } from '@/actions/order'
import { itemOrder, selectorOrder } from '@/types/actions/listOrder'
import { statusOrder } from '@/types/actions/statusOrder'


const ListOrder = () => {
  const dispatch = useDispatch()
  const orderInfor: itemOrder<string, number>[] = useSelector((state: selectorOrder<string, number>) => state.orderReducer.orderInfor);
  const [orderData, setOrderData] = useState([] as itemOrder<string, number>[]);
  console.log(orderData)

  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch])

  useEffect(()=>{
    const filteredOrderInfor = orderInfor.filter(item => item.status !== statusOrder.Paid);
    setOrderData(filteredOrderInfor)
  },[orderInfor])

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