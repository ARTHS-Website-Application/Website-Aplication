
export interface sagaCreateOrder<T,N>{
    type:"post_order";
    data:itemCreateOrder<T,N>
}

export interface itemCreateOrder<T, N> {
    staffId?: T
    customerName?: T,
    customerPhone?: T,
    licensePlate?: T,
    orderDetailModel?:itemOrder<T,N>[]
}

export interface itemOrder<T,N>{
    repairServiceId: T|null,
    motobikeProductId: T|null,
    productQuantity?: N
}