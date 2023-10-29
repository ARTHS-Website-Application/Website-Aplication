import userAxiosPrivate from "@/hooks/useAxiosPrivate";
import { itemCustomer, itemStaffProduct } from "@/types/actions/updateCustomerOrder";
export class Private {

    getOrder = async (pageNumber: number,excludeOrderStatus:string) => {
        const axiosPrivate = userAxiosPrivate();
        const encodeStatus = encodeURIComponent(excludeOrderStatus);
        const queryParams = new URLSearchParams({excludeOrderStatus: encodeStatus, pageNumber: pageNumber.toString() });
        return await axiosPrivate.get(`/store-orders?${queryParams}`)
    }

    getOrderPaid = async (pageNumber: number,orderStatus:string) => {
        const axiosPrivate = userAxiosPrivate();
        const encodeStatusPaid = encodeURIComponent(orderStatus);
        return await axiosPrivate.get(`/store-orders?orderStatus=${encodeStatusPaid}&pageNumber=${pageNumber}`)
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