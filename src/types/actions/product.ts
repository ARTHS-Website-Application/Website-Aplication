export interface selectorProduct<T,N> {
    productReducer: {
        productInfor: itemProduct<T,N>[];
        showError: T | null;
    }
}

export interface storeProduct<T,N> {
    showError: T | null,
    productInfor: productSaga<T,N>[];
}

export interface productSaga<T,N> {
    data: itemProduct<T,N>
}

export interface itemProduct<T,N> {
    id: T;
    name: T;
    priceCurrent: N;
    quantity: N;
    warrantyDuration: N;
    status: boolean;
    discountAmount: N;
    repairService: {
        id: T;
        name: T;
        price: N;
        image: T;
},
    imageUrl: T
}



