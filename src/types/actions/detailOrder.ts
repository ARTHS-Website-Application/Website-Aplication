export interface sagaDetailOrder {
    type: "detail_order";
    id: string
}

export interface selectorDetailOrder<T, N> {
    orderDetailReducer: {
        orderDetail: itemDetailOrder<T, N>;
        showError: T | null;
    }
}

export interface storeOrderDetail<T, N> {
    showError: T | null,
    orderDetail: itemDetailOrder<T, N>[];
}

export interface orderDetailPayloadReducer<T, N> {
    showError: T | null,
    data: itemDetailOrder<T, N>
}

export interface itemDetailOrder<T, N> {
    id: T,
    tellerId: T,
    staff: {
        accountId: T,
        avatar: T,
        fullName: T,
        gender: T,
        phoneNumber: T,
    },
    tellerName: T,
    customerName: T,
    customerPhoneNumber: T,
    address: T,
    licensePlate: T,
    status: T,
    paymentMethod: T,
    totalAmount: N,
    orderType: T,
    orderDate: Date,
    orderDetails: inStoreOrderDetails<T, N>[],
    shippingCode: T,
    shippingMoney: N,
    cancellationReason: T,
    cancellationDate: Date,

}

export interface inStoreOrderDetails<T, N> {
    id: T,
    quantity: N,
    price: N,
    instUsed: boolean,
    subTotalAmount: N,
    warrantyStartDate: Date,
    warrantyEndDate: Date,
    createAt: T,
    motobikeProduct: {
        id: T,
        name: T,
        priceCurrent: N,
        installationFee: N,
        discountAmount: N,
        image: T
    },
    repairService: {
        id: T,
        name: T,
        duration: N,
        price: N,
        discountAmount: N,
        image: T
    },
    warrantyHistories: [
        {
            id: T,
            repairDate: Date,
            productQuantity: N,
            repairDetails: T,
            handledBy: T,
            totalAmount: N,
            status: T
        }
    ]
}


