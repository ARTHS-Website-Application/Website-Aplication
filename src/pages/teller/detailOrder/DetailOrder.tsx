import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ChevronRightIcon,
  CalendarDaysIcon,
  CreditCardIcon,
  UserIcon,
  DevicePhoneMobileIcon,
  ArrowPathRoundedSquareIcon,
} from '@heroicons/react/24/solid';
import { FaMotorcycle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'
import { getDetailOrder, updateStatusOrder } from '@/actions/order'
import { inStoreOrderDetails, itemDetailOrder, selectorDetailOrder } from '@/types/actions/detailOrder'
import userAxiosPrivate from '@/hooks/useAxiosPrivate';
import { statusOrder } from '@/types/typeOrder';
import RepairCustomer from '@/components/teller/RepairCustomer';
import Loading from '@/components/LoadingPage';
import RepairProduct from '@/components/teller/RepairProduct';
import { showSuccessAlert } from '@/constants/chooseToastify';

const DetailOrder = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const detailOrder: itemDetailOrder<string, number> = useSelector((state: selectorDetailOrder<string, number>) => state.orderDetailReducer.orderDetail);
  console.log("orderDetail", detailOrder)
  const [data, setData] = useState<itemDetailOrder<string, number>>();
  const axiosPrivate = userAxiosPrivate();
  const [payment, setPayment] = useState<string>("Tiền mặt");
  const [showUpdate, setShowUpdate] = useState<boolean>(false)
  const [showUpdateProduct, setShowUpdateProduct] = useState<boolean>(false)
  useEffect(() => {
    if (orderId) {
      dispatch(getDetailOrder(orderId));
      setIsLoading(true);
    }

  }, [dispatch, orderId]);
  useEffect(() => {
    if (detailOrder.id === orderId) {
      setData(detailOrder);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000)
    }


  }, [detailOrder, orderId])

  const TotalOrderProduct = () => {
    let total = 0;
    data?.orderDetails?.forEach((item) => {
      total += (item.quantity * item?.price) +(item?.instUsed===true?item?.motobikeProduct?.installationFee:0);
    });
    return total;
  };

  const TotalOrderService = () => {
    let total = 0;
    data?.orderDetails?.forEach((item) => {
      if (item.repairService) {

        total += item.repairService.price;
      }
    });
    return total;
  };
  //chỉnh format tiền
  const formatPrice = (price: number) => {
    const formattedPrice = (price / 1000).toLocaleString(undefined, { minimumFractionDigits: 3 });

    return formattedPrice.replace(",", ".");
  }
  const TotalOrderDetail = TotalOrderProduct();
  const TotalService = TotalOrderService();

  const handleVNPay = async () => {
    try {
      const response = await axiosPrivate.post('/payments/vn-pay',
        {
          orderId: data?.id,
          amount: data?.totalAmount
        }
      )
      if (response.status === 200) {
        window.location.href = response.data;
      } else {
        console.log('Lỗi');
      }
    } catch (error) {
      console.log(error)
    }

  }

  const handleZaloPay = async () => {
    try {
      const response = await axiosPrivate.post('/payments/zalo-pay',
        {
          orderId: data?.id
        }
      )
      if (response.status === 200) {
        //window.location.href = response.data.order_url;
        window.open(response.data.order_url, '')
      } else {
        console.log('Lỗi');
      }
    } catch (error) {
      console.log(error)
    }

  }

  const handleCash = () => {
    if (data?.id) {
      dispatch(updateStatusOrder(data?.id, statusOrder.Paid));
      setIsLoading(true);
      showSuccessAlert('Thanh toán thành công, đơn hàng đang xuất bill');
    }
  }


  return (
    <div>
      {isLoading
        ? <Loading />
        : data && (
          <div className={`w-full bg-white rounded-md px-3 
          ${data?.status === statusOrder.Paid ||  data?.status !== statusOrder.WaitForPay ? "py-3" : ""}`}>
            <div className="font-semibold text-[20px] flex space-x-4 items-center pt-3">
              {data?.status !== statusOrder.Paid
                ? (
                  <Link to="/manage-order/list-all-order/list-order" className="hover:text-main">Danh sách đơn hàng</Link>
                ) : (
                  <Link to="/manage-order/list-all-order/history-order" className="hover:text-main">Lịch sử đơn hàng</Link>
                )}
              <ChevronRightIcon className="w-5 h-5" />
              <p>Chi tiết đơn hàng</p>
            </div>
            {/* Thông tin người dùng */}
            <div className='flex space-x-5 py-3'>
              <div className='w-[50%] border-2 border-[#E0E2E7] px-5 pt-5 pb-2 space-y-3  rounded-lg'>
                <p className={`rounded-2xl font-semibold py-1 w-[170px] text-center text-[19px]
                    ${data?.status === statusOrder.Paid ? "bg-[#E7F4EE] text-[#0D894F]" :
                    data?.status === statusOrder.Processing ? "bg-[#bac5e9] text-blue-500" :
                      data?.status === statusOrder.WaitForPay ? "bg-[#FBEABC] text-[#90530C]" :
                        ""}`}>
                  {data?.status}
                </p>
                <div className='pt-3 text-[18px] flex justify-between'>
                  <div className='text-[#1A1C21] font-semibold flex flex-col space-y-7'>
                    <div className=' flex space-x-3'>
                      <CalendarDaysIcon className='w-7 h-7 fill-gray-500' />
                      <p>Ngày đặt</p>
                    </div>
                    {data?.orderDetails.every((item)=>item.instUsed===false && !item.repairService) || data?.status === statusOrder.WaitForPay ? (
                      <div className='flex space-x-3'>
                        <CreditCardIcon className='w-7 h-7  fill-gray-500 ' />
                        <p>Phương thức thanh toán</p>
                      </div>
                    ) : ""}

                    {data?.staff && (
                      <div className='flex space-x-3'>
                        <UserIcon className='w-7 h-7 fill-gray-500' />
                        <p>Nhân viên sửa chữa</p>
                      </div>
                    )}

                    <div className='flex space-x-3'>
                      <ArrowPathRoundedSquareIcon className='w-7 h-7 fill-gray-500' />
                      <p>Loại đơn</p>
                    </div>
                  </div>
                  <div className='text-[#1A1C21] font-semibold flex flex-col space-y-6 text-end'>
                    <div>
                      <p>
                        {data && data.orderDate && (
                          new Intl.DateTimeFormat('en-GB', {
                            timeZone: 'UTC'
                          }).format(new Date(Date.parse(data.orderDate.toString()) + 7 * 60 * 60 * 1000))
                        )}
                      </p>
                    </div>
                    {data?.orderDetails.every((item)=>item.instUsed===false && item.repairService===null) ||  data?.status === statusOrder.WaitForPay
                      ? data?.paymentMethod ? (
                        <p>{data?.paymentMethod}</p>
                      ) : (
                        <select className='border-2 bg-main text-white pl-1 border-mainB w-[140px] py-2 rounded-lg'
                          defaultValue={payment}
                          onChange={(e) => setPayment(e.target.value)}
                        >
                          <option className='bg-white text-black '>
                            Tiền mặt
                          </option>
                          <option className='bg-white text-black'>
                            VN Pay
                          </option>
                          <option className='bg-white text-black'>
                            Zalo Pay
                          </option>
                        </select>
                      ) : ""}
                    {data.staff ? (
                      <div>
                        <p>{data?.staff.fullName}</p>
                      </div>
                    ):""}

                    <div>
                      {data?.orderType}
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-[50%] border-2 border-[#E0E2E7] px-5 py-5 rounded-lg'>
                <div className='flex justify-between pb-3'>
                  <h1 className='text-[20px] font-semibold '>Thông tin khách hàng</h1>
                  {data?.status !== statusOrder.Paid && (
                    <button className='underline text-[22px] text-[#13B2E4] font-semibold hover:text-main'
                      onClick={() => setShowUpdate(true)}
                    >Sửa thông tin</button>
                  )}
                </div>


                <div className={`text-[18px] flex justify-between pt-3`}>
                  <div className='text-[#1A1C21] font-semibold flex flex-col space-y-7 '>
                    <div className='flex space-x-3'>
                      <UserIcon className='w-7 h-7 fill-gray-500' />
                      <p>Khách hàng</p>
                    </div>
                    <div className='flex space-x-3'>
                      <DevicePhoneMobileIcon className='w-7 h-7 fill-gray-500' />
                      <p>Số điện thoại</p>
                    </div>
                    {data?.licensePlate && (
                      <div className='flex space-x-3'>
                        <FaMotorcycle className='w-7 h-7 fill-gray-500' />
                        <p>Biển số xe</p>
                      </div>
                    )}
                  </div>
                  <div className='text-[#1A1C21] font-semibold text-end space-y-7'>
                    <div>
                      <p>{data?.customerName}</p>
                    </div>
                    <div >
                      <p>{data?.customerPhoneNumber}</p>
                    </div>
                    <div>
                      <p>{data?.licensePlate}</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* thông tin sản phẩm */}
            <div className={`w-full border-[#E0E2E7] space-y-3  
            ${data?.status === statusOrder.Paid ||  data?.status !== statusOrder.WaitForPay ? "border-2 rounded-md py-3" : "border-x-2 border-t-2 rounded-t-md pt-3"} `}>
              <div className='flex justify-between w-full px-3'>
                <div className='font-semibold flex items-center space-x-3 '>
                  <h2 className='text-[20px]'>Danh sách sản phẩm</h2>
                  <h3 className='bg-[#E7F4EE] text-[#0D894F] w-[100px] py-1 text-center rounded-lg'>{data?.orderDetails?.length} sản phẩm</h3>
                </div>
                {data?.status !== statusOrder.Paid && data?.status !== statusOrder.WaitForPay && (
                  <button className='bg-main w-[200px] text-center py-3 rounded-lg font-semibold text-white hover:bg-[#ec504b]'
                    onClick={() => {
                      setShowUpdateProduct(true);
                    }}
                  >Thêm / Sửa sản phẩm</button>
                )}
              </div>

              <div className={`overflow-y-scroll ${data?.orderDetails.every((item)=>item.instUsed===false && item.repairService===null) ||data?.status === statusOrder.WaitForPay ? "h-[30vh]" : "h-[40vh]"}`}>
                {data?.orderDetails?.some((item) => item.motobikeProduct)
                  ? (
                    <div>
                      <table className="w-full bg-white divide-y divide-gray-200 table-fixed text-center">
                        <thead>
                          <tr className="text-xs uppercase tracking-wider bg-mainB text-center">
                            <th scope="col" className="py-3 flex justify-center items-center space-x-2">
                              <p>Tên sản phẩm</p>
                            </th>
                            <th scope="col" className="">
                              <p>Bảo hành đến</p>
                            </th>
                            <th scope="col" className="">
                              <p>Số lượng</p>
                            </th>
                            <th scope="col" className="">
                              <p>Đơn giá</p>
                            </th>
                            <th scope="col" className="">
                              <p>Giá thay phụ kiện</p>
                            </th>
                            <th scope="col" className="">
                              <p>Tổng tiền(VND)</p>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {data?.orderDetails?.filter((item) => item.motobikeProduct).map((item: inStoreOrderDetails<string, number>, index) => (
                            <tr key={index}>
                              <td className="py-3 px-3 flex items-center">
                                <img src={item?.motobikeProduct?.image} alt="" className="h-11 mr-5" />
                                <p className='text-start'>{item?.motobikeProduct?.name}</p>
                              </td>
                              <td className="">
                                {item && item.warrantyEndDate && (
                                  new Intl.DateTimeFormat('en-GB', {
                                    timeZone: 'UTC'
                                  }).format(new Date(Date.parse(item.warrantyEndDate.toString()) + 7 * 60 * 60 * 1000))
                                )}
                              </td>
                              <td className="">
                                {item?.quantity}
                              </td>
                              <td className="">
                                {formatPrice(item?.price)}
                              </td>
                              <td className="">
                                {formatPrice(item?.instUsed===true?item?.motobikeProduct?.installationFee:0)}
                              </td>
                              <td className="">
                                {formatPrice((item?.quantity * item?.price) + ( item?.instUsed===true?item?.motobikeProduct?.installationFee:0))}
                              </td>
                            </tr>
                          ))}

                        </tbody>
                      </table>
                      <div className="flex justify-end pr-[110px] font-semibold space-x-[155px] py-3 ">
                        <p className='text-[18px]'>Tổng tiền sản phẩm</p>
                        <p className=''>{formatPrice(TotalOrderDetail)} VNĐ</p>
                      </div>
                    </div>
                  ) : ""}

                {data?.orderDetails?.some((item) => item.repairService) && (
                  <div>
                    <table className="w-full bg-white divide-y divide-gray-200 table-auto text-center">
                      <thead>
                        <tr className="text-xs uppercase tracking-wider bg-mainB text-center">
                          <th scope="col" className="px-6 py-3 flex justify-center items-center space-x-2">
                            <p>Tên dịch vụ</p>
                          </th>

                          <th scope="col" className="">
                            <p>Tổng tiền(VND)</p>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {data?.orderDetails?.filter((item) => item.repairService).map((item: inStoreOrderDetails<string, number>, index) => (
                          item.repairService ? (
                            <tr key={index}>
                              <td className="py-5 px-3 flex items-center">
                                <img src={item?.repairService?.image} alt="" className=" border-2 border-black h-11 mr-5" />
                                <p>{item?.repairService?.name}</p>
                              </td>
                              <td className="">
                                {formatPrice(item?.repairService?.price)}
                              </td>
                            </tr>
                          ) : ""

                        ))}

                      </tbody>
                    </table>
                    <div className="flex justify-end pr-[120px] space-x-[160px] font-semibold pb-3">
                      <p className='text-[18px]'>Tổng tiền dịch vụ</p>
                      <p className='font-semibold'>{formatPrice(TotalService)} VNĐ</p>
                    </div>
                  </div>
                )}
              </div>
              {/*footer */}
              <div className='flex justify-end pr-[115px] space-x-[220px]'>
                <p className='text-[19px] font-semibold'>Tổng cộng</p>
                <p className='font-semibold text-[19px]'>{formatPrice(TotalOrderDetail + TotalService)} VNĐ</p>
              </div>
              {data?.orderDetails.every((item)=>item.instUsed===false && item.repairService===null) ||  data?.status === statusOrder.WaitForPay
                ?
                data?.status !== statusOrder.Paid ? (
                  payment === "Tiền mặt" ? (
                    <div className='flex justify-end pr-[90px] pt-2'>
                      <button className='bg-main hover:bg-red-800 w-[190px] py-5 text-white rounded-md'
                        onClick={handleCash}
                      >Xác nhận thanh toán</button>
                    </div>
                  ) : payment === "VN Pay" ? (
                    <div className='flex justify-end pr-[90px] pt-2'>
                      <button className='bg-main hover:bg-red-800 w-[190px] py-5 text-white rounded-md'
                        onClick={handleVNPay}
                      >Thanh toán VN Pay</button>
                    </div>
                  ) : (
                    <div className='flex justify-end pr-[90px] pt-2'>
                      <button className='bg-main hover:bg-red-800 w-[190px] py-5 text-white rounded-md'
                        onClick={handleZaloPay}
                      >Quét mã OR</button>
                    </div>
                  )
                ) : ""
                : ""
              }

            </div>

            <RepairCustomer
              isVisible={showUpdate}
              onClose={() => setShowUpdate(false)}
              idOrder={data?.id}
              nameCustomer={data?.customerName}
              phoneCustomer={data?.customerPhoneNumber}
              licensePlate={data?.licensePlate}
            />

            <RepairProduct
              dataProduct={data?.orderDetails}
              staffId={data?.staff?.accountId}
              idOrder={data?.id}
              isVisible={showUpdateProduct}
              onClose={() => setShowUpdateProduct(false)}
            />
          </div>
        )
      }
    </div>

  )
}

export default DetailOrder