import { itemPagination } from "../pagination";

export interface selectorService<T, N> {
    serviceReducer: {
        serviceInfor: dataService<T, N>;
        showError: T | null;
    }
}

export interface storeService<T, N> {
    showError: T | null,
    serviceInfor: serviceSaga<T, N>[];
}

export interface serviceSaga<T, N> {
    data: dataService<T, N>
}

export interface payloadServiceChoose<N> {
    type:"list_services_choose",
    pageSize:N
}

export interface payloadService<N> {
    type:"list_services",
    pageNumber:N
}

export interface dataService<T, N> {
    data: itemService<T, N>[];
    pagination: itemPagination<N>
}

export interface itemService<T, N> {
    id: T,
    name: T,
    price: N,
    description: T,
    status: T,
    createAt: Date,
    images: [
        {
            id: T,
            thumbnail: boolean,
            imageUrl: T
        }
    ]
}