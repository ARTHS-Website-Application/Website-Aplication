export interface selectorOnlineOrder<T,N>{
    onlineOrderReducer:{
        onlineOrderInfo: listOnlineOrder<T,N>;
        showError: T| null;
    }
}

export interface storeOrderOnline<T,N> {
    showError: T | null;
    onlineOrderInfo: onlineOrderSaga<T,N>[];
}

export interface payloadOnlineOrder<N>{
    type:'list_online_order';
    number:N,
    filter:any
}



export interface onlineOrderSaga<T,N> {
    data: listOnlineOrder<T,N>
}

export interface listOnlineOrder<T,N>{
    pagination: pagination<N>,
    data: itemOnlineOrder<T,N>[]
}

export interface itemOnlineOrder<T,N>{
    id: T,
    orderCode: T,
    shippingMoney: N,
    customerName:T,
    phoneNumber:T,
    address:T,
    paymentMethod:T,
    status:T,
    totalAmount:N,
    cancellationReason:T,
    cancellationDate:Date,
    orderDate:Date,
    onlineOrderDetails: itemDetails<T,N>[]
}

export interface itemDetails<T,N>{
    price:N,
    quantity:N,
    subTotalAmount:N,
    createAt:Date,
    motobikeProduct:product<T,N>
}

export interface product<T,N>{
    id:T,
    name:T,
    priceCurrent:N,
    discountAmount:N,
    image:T
}
export interface pagination<N> {
    pageNumber: N;
    pageSize: N;
    totalRow: N;
}

//detail
export interface payloadDetailOnlineOrder<T>{
    type: "detail_online_order",
    id: T
}
export interface selectorDetailOnlineOrder<T,N>{
    onlineOrderDetailReducer:{
        onlineOrderDetail: itemOnlineOrder<T,N>;
        showError: T|null;
    }
}

export interface storeDetailOnlineOrder<T,N>{
    onlineOrderDetail: itemOnlineOrder<T,N> | null;
    showError: T|null;
}

export interface detailOnlineOrderSaga<T,N> {
    showError: T | null,
    data: itemOnlineOrder<T,N>
}

