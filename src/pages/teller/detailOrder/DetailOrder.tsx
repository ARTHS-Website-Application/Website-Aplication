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
import { getDetailOrder } from '@/actions/order'
import { inStoreOrderDetails, itemDetailOrder, selectorDetailOrder } from '@/types/actions/detailOrder'
import userAxiosPrivate from '@/hooks/useAxiosPrivate';
import { statusOrder, typeOrder } from '@/types/typeOrder';
import RepairCustomer from '@/components/teller/RepairCustomer';
import Loading from '@/components/Loading';
import RepairProduct from '@/components/teller/RepairProduct';

const DetailOrder = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const detailOrder: itemDetailOrder<string, number> = useSelector((state: selectorDetailOrder<string, number>) => state.orderDetailReducer.orderDetail)
  const [data, setData] = useState<itemDetailOrder<string, number>>();
  const axiosPrivate = userAxiosPrivate();
  // const navigate = useNavigate();
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
    setTimeout(() => {
      setData(detailOrder);
      setIsLoading(false);
    }, 500)

  }, [detailOrder])

  const TotalOrderProduct = () => {
    let total = 0;
    data?.inStoreOrderDetails?.forEach((item) => {
      total += item.productQuantity * item?.productPrice;
    });
    return total;
  };

  const TotalOrderService = () => {
    let total = 0;
    data?.inStoreOrderDetails?.forEach((item) => {
      if (item.repairService) {

        total += item.repairService.price;
      }
    });
    return total;
  };
  //chỉnh format tiền
  const formatPrice = (price: number) => {
    const formattedPrice = (price / 1000).toLocaleString();

    return `${formattedPrice}.000`;
  }
  const TotalOrderDetail = TotalOrderProduct();
  const TotalService = TotalOrderService();

  const handlePayment = async () => {
    try {
      const response = await axiosPrivate.post('/payments/vn-pay',
        {
          inStoreOrderId: data?.id,
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

  return (
    <div>
      {isLoading
        ? <Loading />
        : data && (
          <div className={`w-full bg-white rounded-md px-3 ${data?.status === statusOrder.Paid ? "py-3" : ""}`}>
            <div className="font-semibold text-[20px] flex space-x-4 items-center pt-3">
              {data?.status !== statusOrder.Paid
                ? (
                  <Link to="/manage-order/list-order" className="hover:text-main">Danh sách đơn hàng</Link>
                ) : (
                  <Link to="/manage-order/history-order" className="hover:text-main">Lịch sử đơn hàng</Link>
                )}
              <ChevronRightIcon className="w-5 h-5" />
              <p>Chi tiết đơn hàng</p>
            </div>
            {/* Thông tin người dùng */}
            <div className='flex space-x-5 py-3'>
              <div className='w-[50%] border-2 border-[#E0E2E7] px-5 pt-5 pb-2 space-y-3  rounded-lg'>
                <p className={`rounded-2xl font-semibold  py-1 w-[170px] text-center   text-[19px]
            ${data?.status === statusOrder.Paid ? "bg-[#E7F4EE] text-[#0D894F]" : data?.status === statusOrder.NewOrder ? "bg-[#bac5e9] text-blue-500" : ""}
          `}>
                  {data?.status}
                </p>
                <div className='pt-3 text-[18px] flex justify-between'>
                  <div className='text-[#1A1C21] font-semibold flex flex-col space-y-5'>
                    <div className=' flex space-x-3'>
                      <CalendarDaysIcon className='w-7 h-7 fill-slate-500' />
                      <p>Ngày đặt</p>
                    </div>
                    <div className='flex space-x-3'>
                      <CreditCardIcon className='w-7 h-7  fill-slate-500 ' />
                      <p>Phương thức thanh toán</p>
                    </div>
                    {data?.staffName && (
                      <div className='flex space-x-3'>
                        <UserIcon className='w-7 h-7 fill-slate-500' />
                        <p>Nhân viên sửa chữa</p>
                      </div>
                    )}

                    <div className='flex space-x-3'>
                      <ArrowPathRoundedSquareIcon className='w-7 h-7 fill-slate-500' />
                      <p>Loại đơn</p>
                    </div>
                  </div>
                  <div className='text-[#1A1C21] font-semibold flex flex-col space-y-4 text-end'>
                    <div>
                      <p>
                        {data && data.orderDate && (
                          new Intl.DateTimeFormat('en-GB', {
                            timeZone: 'UTC'
                          }).format(new Date(Date.parse(data.orderDate.toString()) + 7 * 60 * 60 * 1000))
                        )}
                      </p>
                    </div>
                    {data?.paymentMethod ? (
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
                      </select>
                    )}
                    {data?.orderType !== "Đơn mua hàng" && (
                      data?.staffName && (
                        <div>
                          <p>{data?.staffName}</p>
                        </div>
                      )
                    )}

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
                      <UserIcon className='w-7 h-7 fill-slate-500' />
                      <p>Khách hàng</p>
                    </div>
                    <div className='flex space-x-3'>
                      <DevicePhoneMobileIcon className='w-7 h-7 fill-slate-500' />
                      <p>Số điện thoại</p>
                    </div>
                    {data?.licensePlate && (
                      <div className='flex space-x-3'>
                        <FaMotorcycle className='w-7 h-7 fill-slate-500' />
                        <p>Biển số xe</p>
                      </div>
                    )}
                  </div>
                  <div className='text-[#1A1C21] font-semibold text-end space-y-7'>
                    <div>
                      <p>{data?.customerName}</p>
                    </div>
                    <div >
                      <p>{data?.customerPhone}</p>
                    </div>
                    <div>
                      <p>{data?.licensePlate}</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* thông tin sản phẩm */}
            <div className={`w-full  ${data?.status !== statusOrder.Paid ? "border-x-2 border-t-2 rounded-t-md pt-3" : "border-2 rounded-md py-3"} border-[#E0E2E7]   space-y-3`}>
              <div className='flex justify-between w-full px-3'>
                <div className='font-semibold flex items-center space-x-3 '>
                  <h2 className='text-[20px]'>Danh sách sản phẩm</h2>
                  <h3 className='bg-[#E7F4EE] text-[#0D894F] w-[100px] py-1 text-center rounded-lg'>{data?.inStoreOrderDetails?.length} sản phẩm</h3>
                </div>
                {data?.status !== statusOrder.Paid && (
                  <button className='bg-main w-[200px] text-center py-3 rounded-lg font-semibold text-white hover:bg-[#ec504b]'
                  onClick={() => setShowUpdateProduct(true)}
                  >Thêm / Sửa sản phẩm</button>
                )}
              </div>

              <div className={`overflow-y-scroll ${data?.orderType === typeOrder.Repair ? "h-[27vh]" : "h-[30vh]"}  flex flex-col`}>
                <table className="w-full bg-white divide-y divide-gray-200 table-fixed text-center">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-wider bg-mainB text-center">
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
                        <p>Tổng tiền(VND)</p>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {data?.inStoreOrderDetails?.map((item: inStoreOrderDetails<string, number>, index) => (
                      <tr key={index}>
                        <td className="py-3 px-3 flex items-center">
                          <img src={item?.motobikeProduct.image} alt="" className="h-11 mr-5" />
                          <p>{item?.motobikeProduct.name}</p>
                        </td>
                        <td className="">
                          {item && item.warrantyPeriod && (
                            new Intl.DateTimeFormat('en-GB', {
                              timeZone: 'UTC'
                            }).format(new Date(Date.parse(item.warrantyPeriod.toString()) + 7 * 60 * 60 * 1000))
                          )}
                        </td>
                        <td className="">
                          {item?.productQuantity}
                        </td>
                        <td className="">
                          {formatPrice(item?.productPrice)}
                        </td>
                        <td className="">
                          {formatPrice(item?.productQuantity * item?.productPrice)}
                        </td>
                      </tr>
                    ))}

                  </tbody>
                </table>
                <div className="flex justify-end pr-[110px] font-semibold space-x-[155px] py-3 ">
                  <p className='text-[18px]'>Tổng tiền sản phẩm</p>
                  <p className=''>{formatPrice(TotalOrderDetail)} VNĐ</p>
                </div>
                {data?.orderType === typeOrder.Repair && (
                  <div>
                    <table className="w-full bg-white divide-y divide-gray-200 table-auto text-center">
                      <thead>
                        <tr className="text-left text-xs uppercase tracking-wider bg-mainB text-center">
                          <th scope="col" className="px-6 py-3 flex justify-center items-center space-x-2">
                            <p>Tên dịch vụ</p>
                          </th>

                          <th scope="col" className="">
                            <p>Tổng tiền(VND)</p>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {data?.inStoreOrderDetails?.map((item: inStoreOrderDetails<string, number>, index) => (
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
                    <div className="flex justify-end pr-[110px] space-x-[180px] font-semibold pb-3">
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
              {data?.status !== statusOrder.Paid ? (
                payment === "Tiền mặt" ? (
                  <div className='flex justify-end pr-[90px] pt-2'>
                    <button className='bg-main hover:bg-red-800 w-[190px] py-5 text-white rounded-md'
                      onClick={() => ""}
                    >Xác nhận thanh toán</button>
                  </div>
                ) : (
                  <div className='flex justify-end pr-[90px] pt-2'>
                    <button className='bg-main hover:bg-red-800 w-[190px] py-5 text-white rounded-md'
                      onClick={handlePayment}
                    >Quét mã OR</button>
                  </div>
                )
              ) : ""}

            </div>

            <RepairCustomer
              isVisible={showUpdate}
              onClose={() => setShowUpdate(false)}
              idOrder={data?.id}
              nameCustomer={data?.customerName}

              phoneCustomer={data?.customerPhone}

              licensePlate={data?.licensePlate}
            />
            <RepairProduct
            dataProduct = {data?.inStoreOrderDetails}
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