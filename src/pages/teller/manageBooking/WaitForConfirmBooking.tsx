import { getBooking } from "@/actions/booking";
import TableBooking from "@/components/teller/TableBooking";
import { itemBooking, listBooking, selectorBooking } from "@/types/listBooking";
import { statusBooking } from "@/types/typeBooking";
import { useEffect, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";


const WaitForConfirmBooking = () => {
  const dispatch = useDispatch();
  const bookingInfo: listBooking<string, number> = useSelector((state: selectorBooking<string, number>) => state.bookingReducer?.bookingInfo);
  const [bookingData, setBookingData] = useState<itemBooking<string, number>[]>([]);
  const [paginationNumber, setPaginationNumber] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>(""); // State to keep track of the search query
  //const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]); // ISO string to YYYY-MM-DD

  // const formatDateToISO = (date: Date): string => {
  //   const offset = -7; // Vietnam is UTC+7, but the offset is the negative
  //   const localTime = new Date(date.getTime() - (offset * 60 * 60 * 1000));
  //   return localTime.toISOString().split('T')[0];
  // }
  
  useEffect(() => {
    const filters = {
      bookingStatus: statusBooking.WaitForConfirm
    }
    dispatch(getBooking(paginationNumber, filters));
  }, [dispatch]);
  
  useEffect(() => {
    let searchedBookingInfo: itemBooking<string, number>[] = [];
    if (bookingInfo && Array.isArray(bookingInfo.data)) {
      searchedBookingInfo = searchQuery
        ? bookingInfo.data.filter(item => item.customer.phoneNumber.toString().includes(searchQuery))
        : bookingInfo.data;
    }
    const filterBooking = searchedBookingInfo.filter(item => item.status === statusBooking.WaitForConfirm);
    setBookingData(filterBooking);
  }, [bookingInfo, searchQuery]);


  return (
    <div className="w-full min-h-full p-5">
      <h1 className="font-semibold text-[24px] mb-5">Danh sách lịch đặt chờ xác nhận</h1>
      <div className="flex items-center space-x-4 mb-5">
        <div className="flex items-center bg-white border border-gray-200 rounded-full px-3 py-2 w-1/2">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Số điện thoại"
            className="flex-grow ml-2 outline-none bg-transparent"
            value={searchQuery}
            onChange={e => {
              const value = e.target.value;
              const isValid = /^[0-9]+$/.test(value) && value.length <= 10;
              if (isValid || value === '') {
                setSearchQuery(value);
              }
            }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')}>
              <FaTimes />
            </button>
          )}
        </div>

      </div>
      <TableBooking data={bookingData} />
    </div>
  )
}
export default WaitForConfirmBooking;