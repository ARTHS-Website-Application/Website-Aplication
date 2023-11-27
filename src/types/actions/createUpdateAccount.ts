import { itemDetailAccount } from "./detailAccount";

export interface selectorCreateUpdateAccount<T, N> {
    createUpdateReducer: {
        accountInfor: itemDetailAccount<T,N>
        showError: T | null|undefined;
    }
}

export interface storeCreateAccount<T, N> {
    showError: string | null |undefined;
    accountInfor: itemDetailAccount<T,N>| null;
}

export interface createAccountSaga<T,N> {
    showError: T,
    data: itemDetailAccount<T,N>
}

export interface payloadCreateAccount<T> {
    type: "create_account",
    role:T,
    data: callLCreateAccount<T>
}


export interface callLCreateAccount<T> {
    phoneNumber: T,
    password: T,
    fullName: T,
    gender: T,
}