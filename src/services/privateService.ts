import userAxiosPrivate from "@/hooks/useAxiosPrivate"


export class Private {
    getProfile = async () => {
        const axiosPrivate =userAxiosPrivate();

        return await axiosPrivate.get(`/auth`)
    }
    getListStaff = async () => {
        const axiosPrivate = userAxiosPrivate();

        return await axiosPrivate.get(`/staffs`)
    }
}

export const privateService = new Private();