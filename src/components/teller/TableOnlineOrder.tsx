import { itemOnlineOrder } from "@/types/actions/listOnlineOrder"
import { NavLink } from "react-router-dom";


type Props = {
    data: itemOnlineOrder<string, number>[]
}
const TableOnlineOrder = ({ data }: Props) => {
    return (
    <div className="pt-3">
        <table className="min-w-full bg-white divide-y divide-gray-200 table-fixed text-center shadow-md rounded-lg overflow-hidden">
            <thead>
                <tr className="text-sm font-medium uppercase tracking-wider bg-yellow-500 text-white">
                    <th scope="col" className="px-6 py-4">Tên khách hàng</th>
                    <th scope="col" className="px-6 py-4">Mã vận đơn</th>
                    <th scope="col" className="px-6 py-4">Số điện thoại</th>
                    <th scope="col" className="px-6 py-4">Thanh toán</th>
                    <th scope="col" className="px-6 py-4">Trạng thái</th>
                    <th scope="col" className="px-6 py-4">Hành động</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700">
                {data && data.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-100 transition-all duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">{item.customerName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.orderCode}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.phoneNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.paymentMethod}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.status}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <NavLink to={`/manage-online-order/${item.id}`}>Chi tiết</NavLink>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
}

export default TableOnlineOrder