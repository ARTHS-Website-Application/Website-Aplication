export interface selectorProduct<T, N> {
    productReducer: {
        productInfor: itemProduct<T, N>;
        showError: T | null;
    }
}

export interface storeProduct<T, N> {
    showError: T | null,
    productInfor: productSaga<T, N>[];
}

export interface productSaga<T, N> {
    data: itemProduct<T, N>
}

export interface itemProduct<T, N> {
    data: item<T, N>[];
    pagination: pagination<N>
}
export interface imageItem<T> {
    id: T;
    imageUrl: T;
    thumbnail: false | true;

}

export interface discountItem<T, N> {
    id: T;
    title: T;
    discountAmount: N;
    startDate: Date;
    endDate: Date;
    imageUrl: T;
    description: T;
    status: T;
}

export interface item<T, N> {
    id: T;
    name: T;
    priceCurrent: N;
    quantity: N;
    warrantyDuration: N;
    status: boolean;
    discount: discountItem<T, N>;
    repairService: {
        id: T;
        name: T;
        price: N;
        image: T;
    },
    images: imageItem<T>[]
}

export interface pagination<N> {
    pageNumber: N;
    pageSize: N;
    totalRow: N;
}

export interface payloadSaga<N> {
    type: 'get_product_info';
    number: N
}

export interface addProductOrder<T, N> {
    idProduct: T;
    nameProduct: T;
    priceCurrent: N|null;
    priceProduct:N;
    discountAmount: N | null;
    image: string;
    productQuantity: N;
    repairService: {
        id: T;
        name: T;
        price: N;
        image: T
    }|null;
}



