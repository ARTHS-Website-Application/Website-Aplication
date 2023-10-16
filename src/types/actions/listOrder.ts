export interface selectorOrder<T,N> {
    orderReducer: {
        orderInfor: itemOrder<T,N>[];
        showError: T | null;
    }
}

export interface storeOrder<T,N> {
    showError: T | null,
    orderInfor: orderSaga<T,N>[];
}

export interface orderSaga<T,N> {
    data: itemOrder<T,N>
}

export interface itemOrder<T,N> {
    
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

}



