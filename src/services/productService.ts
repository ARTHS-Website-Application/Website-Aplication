import userAxiosPrivate from "@/hooks/useAxiosPrivate"
import { itemFilter } from "@/types/actions/filterCreate";


export class Private {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createProduct = async (data: any) => {
        const formData = new FormData();
        const axiosPrivate = userAxiosPrivate();
        formData.append('name', data.name);
        formData.append('priceCurrent', data.priceCurrent);
        formData.append('quantity', data.quantity);
        formData.append('description', data.description);
        formData.append('repairServiceId', data.repairServiceId);
        formData.append('discountId', data.discountId);
        formData.append('warrantyId', data.warrantyId);
        formData.append('categoryId', data.categoryId);
        for (const id of data.vehiclesId) {
            formData.append('vehiclesId', id);
        }
        for (let i = 0; i < data.images.length; i++) {
            formData.append('images', data.images[i], data.images[i].name);
        }
        return await axiosPrivate.post(`/motobike-products`, formData, {
            headers: {
                'Content-type': 'multipart/form-data',
            },
        })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateProduct = async (idProduct:string,data: any) => {
        const formData = new FormData();
        const axiosPrivate = userAxiosPrivate();
        formData.append('name', data.name);
        formData.append('priceCurrent', data.priceCurrent);
        formData.append('quantity', data.quantity);
        formData.append('description', data.description);
        formData.append('repairServiceId', data.repairServiceId);
        formData.append('discountId', data.discountId);
        formData.append('warrantyId', data.warrantyId);
        formData.append('categoryId', data.categoryId);
        for (const id of data.vehiclesId) {
            formData.append('vehiclesId', id);
        }
        // for (let i = 0; i < data.images.length; i++) {
        //     formData.append('images', data.images[i], data.images[i].name);
        // }
        return await axiosPrivate.put(`/motobike-products/${idProduct}`, formData, {
            headers: {
                'Content-type': 'multipart/form-data',
            },
        })
    }

    getListProduct = async (numberPagination: number) => {
        const axiosPrivate = userAxiosPrivate();
        return await axiosPrivate.get(`/motobike-products?pageNumber=${numberPagination}`)
    }
    getCategoryProduct = async () => {
        const axiosPrivate = userAxiosPrivate();

        return await axiosPrivate.get(`/categories`)
    }

    getWarrantyProduct = async () => {
        const axiosPrivate = userAxiosPrivate();

        return await axiosPrivate.get(`/warranties`)
    }

    getVehicleProduct = async () => {
        const axiosPrivate = userAxiosPrivate();

        return await axiosPrivate.get(`/vehicles`)
    }

    getVehicleSearchProduct = async (vehicleName: string) => {
        const axiosPrivate = userAxiosPrivate();
        const encodeName = encodeURIComponent(vehicleName);
        return await axiosPrivate.get(`/vehicles?vehicleName=${encodeName}`)
    }
    getFilterCreateProduct = async (data: itemFilter<string, number>) => {
        const axiosPrivate = userAxiosPrivate();
        if (data.name && data.category) {
            const encodeName = encodeURIComponent(data.name);
            const encodeCategory = encodeURIComponent(data.category);
            return await axiosPrivate.get(`/motobike-products?name=${encodeName}&category=${encodeCategory}&pageNumber=${data.paginationNumber}`)
        } else if (data.name) {
            const encodeName = encodeURIComponent(data.name);
            return await axiosPrivate.get(`/motobike-products?name=${encodeName}&pageNumber=${data.paginationNumber}`)
        } else if (data.category) {
            const encodeCategory = encodeURIComponent(data.category);
            return await axiosPrivate.get(`/motobike-products?category=${encodeCategory}&pageNumber=${data.paginationNumber}`)
        }
    }

    getDetailProduct = async (id: string) => {
        const axiosPrivate = userAxiosPrivate();
        return await axiosPrivate.get(`/motobike-products/${id}`)
    }

}

export const privateService = new Private();