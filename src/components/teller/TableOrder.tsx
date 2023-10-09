import React from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
type Props = {}

const TableOrder = (props: Props) => {
    return (
        <div className="pt-3">
            <table className="min-w-full bg-white divide-y divide-gray-200 table-fixed text-center">
                <thead>
                    <tr className="text-left text-xs uppercase tracking-wider bg-yellow-400 text-center">
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
                            Người sửa chữa
                        </th>
                        <th scope="col" className="px-6 py-5 ">
                            Biển số xe
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
                    <tr>
                        <td className="py-3 px-3">
                            Mã đơn 1
                        </td>
                        <td className="">
                            Tên khách hàng 1
                        </td>
                        <td className="">
                            2023-09-27
                        </td>
                        <td className="">
                            1234567890
                        </td>
                        <td className="">
                            Người sửa chữa 1
                        </td>
                        <td className="">
                            XYZ 123
                        </td>
                        <td className="">
                            1,000,000 VND
                        </td>
                        <td className="">
                            Đã hoàn thành
                        </td>
                        <td className="">
                            Chi tiết
                        </td>
                    </tr>
                    <tr>
                        <td className="py-3 px-3">
                            Mã đơn 2
                        </td>
                        <td className="">
                            Tên khách hàng 2
                        </td>
                        <td className="">
                            2023-09-28
                        </td>
                        <td className="">
                            0987654321
                        </td>
                        <td className="">
                            Người sửa chữa 2
                        </td>
                        <td className="">
                            ABC 456
                        </td>
                        <td className="">
                            1,500,000 VND
                        </td>
                        <td className="">
                            Đang xử lý
                        </td>
                        <td className="">
                            Chi tiết
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    )
}

export default TableOrder