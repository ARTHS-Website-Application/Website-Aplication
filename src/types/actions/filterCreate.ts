export interface getFilter<T>{
    type:"get_product_filter";
    data:itemFilter<T>
}

export interface itemFilter<T>{
    name?:T;
    category?:T;
}