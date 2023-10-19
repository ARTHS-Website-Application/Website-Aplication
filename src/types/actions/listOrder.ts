export interface selectorOrder<T,N> {
    orderReducer: {
        orderInfor: listOrder<T,N>;
        showError: T | null;
    }
}

export interface storeOrder<T,N> {
    showError: T | null,
    orderInfor: orderSaga<T,N>[];
}
export interface payloadOrder<N>{
    type:'list_order';
    number:N
}

export interface orderSaga<T,N> {
    data: listOrder<T,N>
}

export interface listOrder<T,N>{
    pagination:pagination<N>
    data:itemOrder<T,N>[]
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
export interface pagination<N> {
    pageNumber: N;
    pageSize: N;
    totalRow: N;
}



