import { userInfor } from "@/constants/mainConstants";
import { profileUser } from "@/types/actions/profile";

export const ShowProfile = () => {
    return {
        type: userInfor.GET_USER_INFO,
    };
};

export const ShowProfileSuccess = (data:profileUser<string>) => {
    return {
        type: userInfor.GET_USER_INFO_SUCCESS,
        payload: {
            data,
        },
    };
};
export const ShowProfileFailed = (error:string) => {
    return {
        type: userInfor.GET_USER_INFO_FAIL,
        payload: {
            error,
        },
    };
};