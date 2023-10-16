export interface sagaDetailOrder {
    type: "detail_order";
    id: string
}

export interface selectorDetailOrder<T,N> {
    orderDetailReducer: {
        orderDetail: itemDetailOrder<T,N>;
        showError: T | null;
    }
}

export interface storeOrderDetail<T,N> {
    showError: T | null,
    orderDetail: orderDetailPayloadReducer<T,N>[];
}

export interface orderDetailPayloadReducer<T,N> {
    showError: T | null,
    data: itemDetailOrder<T,N>
}

export interface itemDetailOrder<T, N> {
    id: T,
    tellerName: T,
    staffName: T,
    customerName: T,
    customerPhone: T,
    licensePlate: T,
    status: T,
    totalAmount: N,
    orderType: T,
    orderDate: Date,
    inStoreOrderDetails: inStoreOrderDetails<T, N>[]

}

export interface inStoreOrderDetails<T, N> {
    id: T,
    productQuantity: N,
    productPrice: N,
    servicePrice: N,
    warrantyPeriod: Date,
    repairCount: N,
    createAt: T,
    motobikeProduct: {
        id: T,
        name: T,
        priceCurrent: N,
        image: T
    },
    repairService: {
        id: T,
        name: T,
        price: N,
        image: T
    }
}


