// import axios from "@/api/axios";
import { loginConstants } from "@/constants/mainConstants";
import { publicService } from "@/services/publicService";
import { Dispatch } from "redux";
// import { ThunkDispatch } from "@reduxjs/toolkit";
// import { AnyAction } from "redux";
interface dataLogin {

    phone: string;
    password: string;


}
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const loginPage = async (userData: dataLogin, dispatch: Dispatch,setAuth:any) => {
    // const from = location.state?.from?.pathname || "/";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // return async (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    try {
        const res = await publicService.login(userData)
        setAuth(res.data);
        console.log("ress", res);
        // navigate(from, {replace:true});

        dispatch(loginSuccess(res.data));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error);
        const message = error.response.data;
        // console.log(message);
        dispatch(loginFail(message));
    }
    // }
};
export const loginSuccess = (data: string) => {
    const dataSuccess = {
        type: loginConstants.LOGIN_SUCCESS,
        payload: data,

    }
    return dataSuccess
};
export const loginFail = (error: string) => {
    return {
        type: loginConstants.LOGIN_FAIL,
        payload: error,
    };
};
