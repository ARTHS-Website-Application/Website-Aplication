import userAxiosPrivate from "@/hooks/useAxiosPrivate"


export class Private {
    getProduct = async () => {
        const axiosPrivate =userAxiosPrivate();

        return await axiosPrivate.get(`/motobike-products`)
    }
}

export const privateService = new Private();