import userAxiosPrivate from "@/hooks/useAxiosPrivate"


export class Private {
    getProfile = async () => {
        const axiosPrivate =userAxiosPrivate();

        return await axiosPrivate.get(`/auth`)
    }
}

export const privateService = new Private();