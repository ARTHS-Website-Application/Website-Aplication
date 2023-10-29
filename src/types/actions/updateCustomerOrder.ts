
export interface payloadItemCustomer<T> {
    type: "update_user_order"
    idOrder: T;
    data: itemCustomer<T>

}

export interface payloadItemStaffProduct<T,N> {
    type: "update_product_order";
    idOrder: T;
    data: itemStaffProduct<T,N>

}

export interface payByCash<T> {
    type: "pay_with_cash";
    idOrder: T;
    statusOrder: T

}

export interface itemCustomer<T> {

    customerName: T,
    customerPhone: T,
    licensePlate: T | null,

}

export interface itemStaffProduct<T,N> {
    staffId: T|null,
    orderDetailModel:itemProductOrder<T,N>[]
}
export interface itemProductOrder<T, N> {
    repairServiceId: T|null,
    motobikeProductId?: T,
    productQuantity?: N,
}