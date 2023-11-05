export interface getFilter<T,N>{
    type:"get_product_filter";
    data:itemFilter<T,N>
}

export interface itemFilter<T,N>{
    paginationNumber?:N
    name?:T;
    category?:T;
}

export interface getFilterService<T,N>{
    type:"list_services_filter";
    data:serviceFilter<T,N>
}
export interface serviceFilter<T,N>{
    paginationNumber?:N
    name?:T;
}