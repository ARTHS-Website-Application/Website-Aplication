export interface selectorProduct<T,N> {
    productReducer: {
        productInfor: itemProduct<T,N>[];
        showError: string | null;
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
    quantity: 50;
    warrantyDuration: 0;
    status: boolean;
    discountAmount: 0;
    repairService: {
        id: T;
        name: T;
        price: N;
        image: T;
},
    imageUrl: T
}



