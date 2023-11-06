import userAxiosPrivate from "@/hooks/useAxiosPrivate";
import { callFilterOrder, callFilterOrderPaid } from "@/types/actions/listOrder";
import { itemCustomer, itemStaffProduct } from "@/types/actions/updateCustomerOrder";
export class Private {

    getOrder = async (pageNumber: number,excludeOrderStatus:string) => {
        const axiosPrivate = userAxiosPrivate();
        const encodeStatus = encodeURIComponent(excludeOrderStatus);
        //URLSearchParams  không dùng encodeURIComponent
        const queryParams = new URLSearchParams({pageNumber: pageNumber.toString() });
        return await axiosPrivate.get(`/store-orders?${queryParams}&excludeOrderStatus=${encodeStatus}`)
    }

    getFilterOrder = async (data:callFilterOrder<string,number>) => {
        const axiosPrivate = userAxiosPrivate();
        const encodeStatus = encodeURIComponent(data.excludeOrderStatus);
        const encodeName = encodeURIComponent(data?.customerName);
        const queryParams = new URLSearchParams({customerPhone:data.customerPhone, pageNumber: data.number.toString() });
        return await axiosPrivate.get(`/store-orders?${queryParams}&customerName=${encodeName}&excludeOrderStatus=${encodeStatus}`)
    }

    getOrderPaid = async (pageNumber: number,orderStatus:string) => {
        const axiosPrivate = userAxiosPrivate();
        const encodeStatusPaid = encodeURIComponent(orderStatus);
        return await axiosPrivate.get(`/store-orders?orderStatus=${encodeStatusPaid}&pageNumber=${pageNumber}`)
    }
    getFilterOrderPaid = async (data:callFilterOrderPaid<string,number>) => {
        const axiosPrivate = userAxiosPrivate();
        const encodeOrderStatus = encodeURIComponent(data?.orderStatus);
        const encodeUserName = encodeURIComponent(data.customerName);
        const queryParams = new URLSearchParams({customerPhone:data.customerPhone, pageNumber: data.number.toString()});
        return await axiosPrivate.get(`/store-orders?${queryParams}&orderStatus=${encodeOrderStatus}&customerName=${encodeUserName}`)
    }

    getDetailOrder = async (id: string) => {
        const axiosPrivate = userAxiosPrivate();
        return await axiosPrivate.get(`/store-orders/${id}`)
    }

    updateCustomerOrder = async (idOrder: string, data: itemCustomer<string>) => {
        const axiosPrivate = userAxiosPrivate();
        if (data.licensePlate) {
            return await axiosPrivate.put(`/store-orders/${idOrder}`, data)
        } else {
            const dataBuy = {
                customerName: data.customerName,
                customerPhone: data.customerPhone,
            }
            return await axiosPrivate.put(`/store-orders/${idOrder}`, dataBuy)
        }
    }

    updateProductOrder = async (idOrder: string, data: itemStaffProduct<string,number>) => {
        const axiosPrivate = userAxiosPrivate();
        if (data.staffId) {
            return await axiosPrivate.put(`/store-orders/${idOrder}`, data)
        } else {
            const dataProduct={
                orderDetailModel:data.orderDetailModel
            }
            return await axiosPrivate.put(`/store-orders/${idOrder}`,dataProduct)
        }
    }
    updateStatusOrder= async (idOrder: string, data:string) => {
        const axiosPrivate = userAxiosPrivate();
            const dataProduct={
                status:data
            }
            return await axiosPrivate.put(`/store-orders/${idOrder}`,dataProduct)
        }
}

export const orderService = new Private();