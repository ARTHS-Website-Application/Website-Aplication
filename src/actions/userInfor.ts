import { userInfor } from "@/constants/mainConstants";
import { listStaff } from "@/constants/secondaryConstants";
import { itemStaff } from "@/types/actions/listStaff";
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

export const selectStaff = () => {
    return {
        type: listStaff.LIST_STAFF,
    };
};

export const selectStaffSuccess = (data:itemStaff<string>[]) => {
    return {
        type: listStaff.LIST_STAFF_SUCCESS,
        payload: {
            data,
        },
    };
};
export const selectStaffFailed = (error:string) => {
    return {
        type: listStaff.LIST_STAFF_FAIL,
        payload: {
            error,
        },
    };
};