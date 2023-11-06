export interface getFilter<T,N>{
    type:"get_product_filter";
    data:itemFilter<T,N>
}

export interface itemFilter<T,N>{
    paginationNumber?:N
    name?:T;
    category?:T;
    status:T
}

export interface getFilterProductInService<T,N>{
    type:"get_product_filter_service";
    data:filterProductInService<T,N>
}
export interface filterProductInService<T,N>{
    pageSize?:N
    repairService?:T;
}

export interface getFilterProductNotService<N>{
    type:"get_product_filter_not_service";
    data:filterProductNotService<N>
}
export interface filterProductNotService<N>{
    pageSize?:N
    noRepairService?:boolean;
}