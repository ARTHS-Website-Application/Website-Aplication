import { getDetailOnlineOrder, onlineOrderUpdate, postTransport } from "@/actions/onlineOrder";
import Loading from '@/components/LoadingPage';
import CreateTransport from "@/components/owner/CreateTransport";
import { inStoreOrderDetails } from "@/types/actions/detailOrder";
import { itemOnlineOrder, selectorDetailOnlineOrder, selectorTransport } from "@/types/actions/listOnlineOrder"
import { statusOrder } from "@/types/typeOrder";
import { ArrowPathRoundedSquareIcon, CalendarDaysIcon, ChevronRightIcon, CreditCardIcon, DevicePhoneMobileIcon, MapPinIcon, UserIcon } from "@heroicons/react/24/solid";
import { LiaShippingFastSolid } from "react-icons/lia";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom";
import ShowError from "@/components/teller/ShowError";
import { showSuccessAlert } from "@/constants/chooseToastify";
import { resetError } from "@/actions/userInfor";

const DetailOnlineOrder = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const detailOnlineOrder: itemOnlineOrder<string, number> = useSelector((state: selectorDetailOnlineOrder<string, number>) => state.onlineOrderDetailReducer.onlineOrderDetail);
  const itemError: string | null = useSelector((state: selectorTransport) => state.transportReducer.showError);
  const showItem = useSelector((state: selectorTransport) => state.transportReducer.transportInfor);
  console.log("first", itemError, showItem);
  const [data, setData] = useState<itemOnlineOrder<string, number>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingCreate, setIsLoadingCreate] = useState<boolean>(false);
  const [showTransport, setShowTransport] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [showCheckError, setShowCheckError] = useState<string | null>(null)
  const [showErrorTransport, setShowErrorTransport] = useState<string>('');
  const [addNote, setAddNote] = useState<string>('');
  const [addContent, setAddContent] = useState<string>('');
  const [addWeight, setAddWeight] = useState<number>(0);
  const [addLength, setAddLength] = useState<number>(0);
  const [addWidth, setAddWidth] = useState<number>(0);
  const [addHeight, setAddHeight] = useState<number>(0);

  console.log('id', orderId);
  useEffect(() => {
    if (orderId) {
      dispatch(getDetailOnlineOrder(orderId));
      setIsLoading(true);
    }
  }, [dispatch, orderId]);

  useEffect(() => {
    if (detailOnlineOrder?.id === orderId) {
      setData(detailOnlineOrder);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000)
    }

  }, [detailOnlineOrder, orderId])
  console.log('getwithId', data);

  //Transport
  useEffect(() => {
    if (itemError === null && showItem !== null) {
      setShowTransport(false)
      showSuccessAlert('Gửi thông tin đơn hàng thành công');
      dispatch(resetError());
      setIsLoadingCreate(false)
    } else {
      setShowCheckError(itemError);
      setIsLoadingCreate(false)
    }
  }, [dispatch, itemError, showItem])

  //chỉnh format tiền
  const formatPrice = (price: number) => {
    const formattedPrice = (price / 1000).toLocaleString(undefined, { minimumFractionDigits: 3 });

    return formattedPrice.replace(",", ".");
  }
  const handleUpdateStatus = () => {
    const data = {
      status: statusOrder.Confirm,
      cancellationReason: "",
    }
    if (detailOnlineOrder) {
      dispatch(onlineOrderUpdate(detailOnlineOrder.id, data))
      setIsLoading(true)
    }
  }

  const handleCreateTransport = () => {
    if (data) {
      setIsLoadingCreate(true);
      const dataTransport = {
        orderId: data?.id,
        note: addNote,
        content: addContent,
        weight: addWeight,
        length: addLength,
        width: addWidth,
        height: addHeight
      }
      const status = {
        status: statusOrder.Transport,
        cancellationReason: "",
      }
      if (addNote && addContent && addLength && addWidth && addHeight && addWeight) {
        dispatch(postTransport(dataTransport, status))
        setShowErrorTransport('')
      } else {
        setShowErrorTransport('Không được bỏ trống')
        setIsLoadingCreate(false);
      }
    }
  }


  return (
    <div>
      {isLoading ? <Loading />
        : data && (
          <div className={`w-full bg-white rounded-md px-3`}>
            <div className="font-semibold text-[20px] flex space-x-4 items-center pt-3">
              {data?.status === statusOrder.Processing
                ? (
                  <Link to="/manage-order/online-order/list-order" className="hover:text-main">Danh sách đơn đặt hàng</Link>
                ) : data?.status === statusOrder.Confirm ? (
                  <Link to="/manage-order/online-order/list-order-confirm" className="hover:text-main"> Danh sách đơn hàng đã xác nhận</Link>
                ) : data?.status === statusOrder.Transport ? (
                  <Link to="/manage-order/online-order/list-order-transport" className="hover:text-main"> Danh sách đơn hàng đang giao</Link>
                ) : data?.status === statusOrder.Finished ? (
                  <Link to="/manage-order/online-order/list-order-finish" className="hover:text-main"> Danh sách đơn hàng đã hoàn thành</Link>
                ) : data?.status === statusOrder.Canceled ? (
                  <Link to="/manage-order/online-order/list-order-canceled" className="hover:text-main"> Danh sách đơn hàng đã hủy</Link>
                ) : data?.status === statusOrder.Paid ? (
                  <Link to="/manage-order/online-order/list-order-paid" className="hover:text-main"> Danh sách đơn hàng đã thanh toán</Link>
                ) : ""}
              <ChevronRightIcon className="w-5 h-5" />
              <p>Chi tiết đơn hàng</p>
            </div>

            {/* Thông tin người dùng */}
            <div className='flex space-x-5 py-3'>
              <div className='w-[50%] border-2 border-[#E0E2E7] px-5 pt-5 pb-2 space-y-3  rounded-lg'>
                <p className={`rounded-2xl font-semibold py-1 w-[170px] text-center text-[19px]
                    ${data?.status === statusOrder.Paid ? "bg-[#E7F4EE] text-[#0d1389]" :
                    data?.status === statusOrder.Processing ? "bg-[#bac5e9] text-blue-500" :
                      data?.status === statusOrder.Transport ? "bg-[#e1a157] text-[#90530C]" :
                        data?.status === statusOrder.Confirm ? "bg-[#FBEABC] text-yellow-600" :
                          data?.status === statusOrder.Finished ? "bg-[#6fe46d] text-[#0d890f]" :
                            data?.status === statusOrder.Canceled ? "bg-red-100 text-red-700" :
                              ""}`}>
                  {data?.status}
                </p>
                <div className='pt-3 text-[18px] flex justify-between'>
                  <div className='text-[#1A1C21] font-semibold flex flex-col space-y-7'>
                    <div className=' flex space-x-3'>
                      <CalendarDaysIcon className='w-7 h-7 fill-gray-700' />
                      <p>Ngày đặt</p>
                    </div>
                    <div className='flex space-x-3'>
                      <CreditCardIcon className='w-7 h-7 fill-gray-700' />
                      <p>Phương thức thanh toán</p>
                    </div>
                    <div className='flex space-x-3'>
                      <ArrowPathRoundedSquareIcon className='w-7 h-7 fill-gray-700' />
                      <p>Loại đơn</p>
                    </div>
                    {data && data.shippingCode !== null ? (
                      <div className='flex space-x-3'>
                        <LiaShippingFastSolid className='w-7 h-7 fill-gray-700' />
                        <p>mã vận chuyển</p>
                      </div>
                    ) : ""}

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
                    <div>
                      {data?.paymentMethod}
                    </div>
                    <div>
                      {data?.orderType}
                    </div>
                    {data && data.shippingCode !== null ? (
                      <div>
                        {data?.shippingCode}
                      </div>
                    ) : ""}
                  </div>
                </div>
              </div>
              <div className='w-[50%] border-2 border-[#E0E2E7] px-5 py-5 rounded-lg'>
                <div className='flex justify-between'>
                  <h1 className='text-[20px] font-semibold '>Thông tin khách hàng</h1>
                </div>
                <div className={`text-[18px] pt-3`}>
                  <div className='text-[#1A1C21] font-semibold space-y-7 '>
                    <div className="flex justify-between items-center">
                      <div className='flex space-x-3 pr-3'>
                        <UserIcon className='w-7 h-7 fill-gray-700' />
                        <p>Khách hàng</p>
                      </div>
                      <p>{data?.customer.fullName}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className='flex space-x-3'>
                        <DevicePhoneMobileIcon className='w-7 h-7 fill-gray-700' />
                        <p>Số điện thoại</p>
                      </div>
                      <p>{data?.customer.phoneNumber}</p>
                    </div>
                    <div className="flex justify-between">
                      <div className='flex space-x-3 w-[30%]'>
                        <MapPinIcon className='w-7 h-7 fill-gray-700' />
                        <p>Địa chỉ</p>
                      </div>
                      <p className="text-end">{data?.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* thông tin sản phẩm */}
            <div className={`w-full border-[#E0E2E7] space-y-3 border-2 rounded-md py-3`}>
              <div className='flex space-x-3 w-full px-3'>
                <div className='font-semibold flex items-center space-x-3 '>
                  <h2 className='text-[20px]'>Danh sách sản phẩm</h2>
                  <h3 className='bg-[#E7F4EE] text-[#0D894F] w-[100px] py-1 text-center rounded-lg'>{data?.orderDetails?.length} sản phẩm</h3>
                </div>
                {data?.status === statusOrder.Canceled ? (
                  <button className="p-2 text-white bg-red-400 hover:bg-red-700 font-semibold rounded-lg"
                    onClick={() => setShowError(true)}
                  >Lý do hủy</button>
                ) : ""}
              </div>

              <div className='overflow-y-scroll h-[30vh] flex flex-col'>
                <table className="w-full bg-white divide-y divide-gray-200 table-fixed text-center">
                  <thead>
                    <tr className="text-center text-xs uppercase tracking-wider bg-mainB">
                      <th scope="col" className="py-3 flex justify-center items-center space-x-2">
                        <p>Tên sản phẩm</p>
                      </th>
                      {data?.orderDetails?.some((item) => item?.discount) ? (
                          <th scope="col" className="text-center">
                            <p>Áp dụng khuyến mãi</p>
                          </th>
                        ) : ""}
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
                    {data?.orderDetails?.map((item: inStoreOrderDetails<string, number>, index) => (
                      <tr key={index}>
                        <td className="py-3 px-3 flex items-center">
                          <img src={item?.motobikeProduct.image} alt="" className="h-11 mr-5" />
                          <p>{item?.motobikeProduct.name}</p>
                        </td>
                        {data?.orderDetails?.some((item) => item?.discount) ? (
                            <td className="w-[16%] text-center">
                              {item?.discount ? `${item?.discount?.title} (${item?.discount?.discountAmount}%)` : "không"}
                            </td>
                          ):""}
                        <td className="">
                          {item?.quantity}
                        </td>
                        <td className="">
                          {formatPrice(item?.price)}
                        </td>
                        <td className="">
                          {formatPrice(item.subTotalAmount)}
                        </td>
                      </tr>
                    ))}

                  </tbody>
                </table>


              </div>
              {/*footer */}
              <div className='flex justify-end pr-[115px] '>
                <div className='space-y-3'>
                  {data.totalAmount < 1000000
                    ? (<div className="flex text-[15px] font-semibold space-x-[20px] pl-1">
                      <p className=''>Giá tiền ship:</p>
                      <p className=''>{formatPrice(20000)} VNĐ</p>
                    </div>) : ""}
                  <div className='flex text-main space-x-[20px]'>
                    <p className='text-[19px] font-semibold'>Tổng cộng:</p>
                    <p className='font-semibold text-[19px]'>{formatPrice(data.totalAmount)} VNĐ</p>
                  </div>
                </div>
              </div>
              {data?.status === statusOrder.Processing || data?.status === statusOrder.Paid ? (
                <div className='flex justify-end pr-[90px] pt-2'>
                  <button className='bg-main hover:bg-red-800 w-[190px] py-5 text-white rounded-md'
                    onClick={handleUpdateStatus}
                  >Xác nhận đơn hàng</button>
                </div>
              ) : data?.status === statusOrder.Confirm ? (
                <div className='flex justify-end pr-[90px] pt-2'>
                  <button className='bg-main hover:bg-red-800 w-[190px] py-5 text-white rounded-md'
                    onClick={() => setShowTransport(true)}
                  >Nhập thông tin đơn hàng</button>
                </div>
              ) : ""}
            </div>
            <CreateTransport
              isVisible={showTransport}
              onClose={() => setShowTransport(false)}
              isLoading={isLoadingCreate}
              showCheckError={showCheckError}
              showError={showErrorTransport}
              setShowError={setShowErrorTransport}
              addNote={addNote}
              setAddNote={setAddNote}
              addContent={addContent}
              setAddContent={setAddContent}
              addWeight={addWeight}
              setAddWeight={setAddWeight}
              addLength={addLength}
              setAddLength={setAddLength}
              addWidth={addWidth}
              setAddWidth={setAddWidth}
              addHeight={addHeight}
              setAddHeight={setAddHeight}
              handleCreateTransport={handleCreateTransport}
            />
            <ShowError
              isVisible={showError}
              data={data}
              onClose={() => setShowError(false)}
            />
          </div>
        )
      }
    </div>
  );
}
export default DetailOnlineOrder