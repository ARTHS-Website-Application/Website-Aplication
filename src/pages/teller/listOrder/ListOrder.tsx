import SearchFilter from '@/components/SearchFilter'
import Pagination from '@/components/Pagination'
import { useEffect } from 'react'
import TableOrder from '@/components/teller/TableOrder'

type Props = {}

const ListOrder = (props: Props) => {
  // const controller = new AbortController();
  useEffect(() => {

  }, [])
  return (
    <div className="w-full min-h-full">
      <h1 className="font-semibold text-[24px]">Danh sách đơn hàng</h1>
      <div className="pt-3">
        <SearchFilter  />
      </div>
      {/* Table */}
      <TableOrder/>

      {/* Pagination */}
      <Pagination currentPage={1} totalPages={10} />
    </div>
  )
}

export default ListOrder