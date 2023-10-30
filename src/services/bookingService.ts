import userAxiosPrivate from "@/hooks/useAxiosPrivate";
export class Private{
    getBooking = async (pageNumber: number, filters: any) =>{
        //console.log(filters);
        const axiosPrivate = userAxiosPrivate();
        const queryParams = new URLSearchParams({...filters , pageNumber: pageNumber.toString()});
        console.log('query', queryParams.toString());
        return await axiosPrivate.get(`/repair-bookings?${queryParams}`);
    }

    updateBooking = async (bookingId: string, data: any) =>{
        const axiosPrivate = userAxiosPrivate();
        console.log('call api update nè');
        return await axiosPrivate.put(`/repair-bookings/${bookingId}`, data);
    }
}
export const bookingService = new Private();