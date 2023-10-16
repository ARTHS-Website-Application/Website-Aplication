import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { itemOrder } from '@/types/actions/listOrder'
import { NavLink } from 'react-router-dom'
type Props = {
    data: itemOrder<string, number>[]
}

const TableOrder = ({ data }: Props) => {
    const formatPrice = (price: number) => {
        const formattedPrice = (price / 1000).toLocaleString();

        return `${formattedPrice}.000`;
    }
    return (
        <div className="pt-3">
            <table className="min-w-full bg-white divide-y divide-gray-200 table-fixed text-center">
                <thead>
                    <tr className="text-xs uppercase tracking-wider bg-yellow-400 text-center">
                        <th scope="col" className="px-6 py-5 flex justify-center items-center space-x-2">
                            <p>Mã đơn</p>
                            <button><ChevronDownIcon className="w-5 h-5" /></button>
                        </th>
                        <th scope="col" className="px-6 py-5">
                            Tên khách hàng
                        </th>
                        <th scope="col" className="px-6 py-5 ">
                            Ngày Tạo
                        </th>
                        <th scope="col" className="px-6 py-5 ">
                            Số điện thoại
                        </th>

                        <th scope="col" className="px-6 py-5 ">
                            Loại đơn
                        </th>
                        <th scope="col" className="px-6 py-5 ">
                            Tổng tiền (VND)
                        </th>
                        <th scope="col" className="px-6 py-5 ">
                            Trạng thái đơn hàng
                        </th>
                        <th scope="col" className="px-6 py-5">
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {data && data.map((item: itemOrder<string, number>, index) => (
                        <tr key={index}>
                            <td className="py-3 px-3">
                                {item.id}
                            </td>
                            <td className="">
                                {item.customerName}
                            </td>
                            <td className="">
                                {
                                    new Intl.DateTimeFormat('en-GB', {
                                        timeZone: 'UTC'
                                    }).format(new Date(Date.parse(item.orderDate.toString()) + 7 * 60 * 60 * 1000))}
                            </td>
                            <td className="">
                                {item.customerPhone}
                            </td>
                            <td className="">
                                {item.orderType}
                            </td>
                            <td className="">
                                {formatPrice(item.totalAmount)}
                            </td>
                            <td className="">
                                {item.status}
                            </td>
                            <td className="text-blue-700 hover:underline pr-7">
                                <NavLink to={`/manage-order/${item.id}`}>Chi tiết</NavLink>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default TableOrder