import userAxiosPrivate from "@/hooks/useAxiosPrivate";
import { itemCustomer, itemStaffProduct } from "@/types/actions/updateCustomerOrder";
export class Private {
    getOrder = async (pageNumber: number) => {
        const axiosPrivate = userAxiosPrivate();
        return await axiosPrivate.get(`/store-orders?pageNumber=${pageNumber}`)
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
}

export const orderService = new Private();