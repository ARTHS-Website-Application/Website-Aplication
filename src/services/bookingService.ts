import userAxiosPrivate from "@/hooks/useAxiosPrivate";
export class Private{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getBooking = async (pageNumber: number, filters: any) =>{
        //console.log(filters);
        const axiosPrivate = userAxiosPrivate();
        const queryParams = new URLSearchParams({...filters , pageNumber: pageNumber.toString()});
        console.log('query', queryParams.toString());
        return await axiosPrivate.get(`/repair-bookings?${queryParams}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateBooking = async (bookingId: string, data: any) =>{
        const axiosPrivate = userAxiosPrivate();
        console.log('call api update nè');
        return await axiosPrivate.put(`/repair-bookings/${bookingId}`, data);
    }
}
export const bookingService = new Private();