export interface getFilter<T,N>{
    type:"get_product_filter";
    data:itemFilter<T,N>
}

export interface itemFilter<T,N>{
    paginationNumber?:N
    name?:T;
    category?:T;
}