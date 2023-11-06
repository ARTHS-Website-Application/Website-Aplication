export interface getFilterService<T,N>{
    type:"list_services_filter";
    data:serviceFilter<T,N>
}
export interface serviceFilter<T,N>{
    paginationNumber?:N;
    name?:T;
    status:T;
}

export interface getSortService<T,N>{
    type:"get_sort_services";
    data:sortService<T,N>
}
export interface sortService<T,N>{
    value:T|null;
    status:T;
    pageNumber?:N;
    sortByAsc?:boolean;
    name:T
}
