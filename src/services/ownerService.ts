import userAxiosPrivate from "@/hooks/useAxiosPrivate";

export class Private {
    getServiceCreate = async (pageSize: number) => {
        const axiosPrivate = userAxiosPrivate();
        return await axiosPrivate.get(`/repair-services?pageSize=${pageSize}`)
    }

    getDiscountCreate = async () => {
        const axiosPrivate = userAxiosPrivate();
        return await axiosPrivate.get(`/discounts`)
    }
}

export const ownerService = new Private();