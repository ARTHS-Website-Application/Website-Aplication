import { inStoreOrderDetails } from "./detailOrder";
import { callFilterOrder } from "./listOrder";

export interface selectorOnlineOrder<T, N> {
    onlineOrderReducer: {
        onlineOrderInfo: listOnlineOrder<T, N>;
        onlineOrderPaid: listOnlineOrder<T, N>;
        onlineOrderConfirm: listOnlineOrder<T, N>;
        onlineOrderTransport: listOnlineOrder<T, N>;
        onlineOrderFinish: listOnlineOrder<T, N>;
        showError: T | null;
    }
}

export interface storeOrderOnline<T, N> {
    showError: T | null;
    onlineOrderInfo: onlineOrderSaga<T, N>[];
    onlineOrderPaid: onlineOrderSaga<T, N>[];
    onlineOrderConfirm: onlineOrderSaga<T, N>[];
    onlineOrderTransport: onlineOrderSaga<T, N>[];
    onlineOrderFinish: onlineOrderSaga<T, N>[];
}

export interface payloadOnlineOrder<T, N> {
    type: 'list_online_order';
    data: callFilterOrder<T, N>
}



export interface onlineOrderSaga<T, N> {
    data: listOnlineOrder<T, N>
}

export interface listOnlineOrder<T, N> {
    pagination: pagination<N>,
    data: itemOnlineOrder<T, N>[]
}

export interface itemOnlineOrder<T, N> {
    id: T,
    shippingMoney: N,
    customerPhoneNumber:N,
    customer: {
        accountId: T,
        phoneNumber: T,
        fullName: T,
        gender: T,
        address: T,
        avatar: T
    },
    address: T,
    paymentMethod: T,
    status: T,
    totalAmount: N,
    cancellationReason: T,
    cancellationDate: Date,
    orderDate: Date,
    orderType: T,
    orderDetails: inStoreOrderDetails<T, N>[],
}
export interface pagination<N> {
    pageNumber: N;
    pageSize: N;
    totalRow: N;
}

//detail
export interface payloadDetailOnlineOrder<T> {
    type: "detail_online_order",
    id: T
}
export interface selectorDetailOnlineOrder<T, N> {
    onlineOrderDetailReducer: {
        onlineOrderDetail: itemOnlineOrder<T, N>;
        showError: T | null;
    }
}

export interface storeDetailOnlineOrder<T, N> {
    onlineOrderDetail: itemOnlineOrder<T, N> | null;
    showError: T | null;
}

export interface detailOnlineOrderSaga<T, N> {
    showError: T | null,
    data: itemOnlineOrder<T, N>
}

export interface payloadUpdateOnlineOrder<T> {
    type: "update_online_order",
    data: callUpdateOnlineOrder<T>,
    idOrder: T
}
export interface callUpdateOnlineOrder<T> {
    status: T,
    cancellationReason: T
}

export interface payloadTranSport<T,N> {
    type: "create_transport",
    data: callTranSport<T,N>,
    statusOnline:callUpdateOnlineOrder<T>
}
export interface callTranSport<T, N> {
    orderId: T,
    note: T,
    content: T,
    weight: N,
    length: N,
    width: N,
    height: N
}
