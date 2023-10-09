
export interface selectorProfile<T>{
    userReducer:{
        infor:itemProfile<T>;
        showError:string|null;
    }
}

export interface storeProfileUser<T>{
    showError:string|null,
    infor:profileUser<T>[];
}

export interface profileUser<T>{
    type:"get_user_info";
    data:itemProfile<T>
}

export interface itemProfile<T>{
    id: T;
    fullName: T;
    gender: T;
    avatar: T|null;
    phoneNumber: T;
    role: T;
    status: T;
    createAt: T;
}