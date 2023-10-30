export interface selectorBooking<T, N> {
    bookingReducer: {
        bookingInfo: listBooking<T, N>;
        showError: T | null;
    }
}

export interface repairBooking<T, N> {
    showError: T | null,
    bookingInfo: bookingSaga<T, N>[];

}


export interface payloadBooking<N> {
    type: 'list_booking';
    pageNumber: N,
    filters: any,
}


export interface payloadUpdateBooking<T> {
    type: 'update_booking';
    bookingId: T,
    data: any
}



export interface bookingSaga<T, N> {
    error: any;
    data: listBooking<T, N>
}

export interface listBooking<T, N> {
    pagination: pagination<N>,
    data: itemBooking<T, N>[],
}

export interface itemBooking<T, N> {
    id: T,
    dateBook: Date,
    description: T,
    cancellationReason: T,
    cancellationDate: Date,
    status: T,
    createAt: Date,
    customer: customerBooking<T, N>,
}

export interface customerBooking<T, N> {
    accountId: T,
    phoneNumber: N
    fullName: T,
    gender: T,
    address: T,
    avatar: T,
}



export interface pagination<N> {
    pageNumber: N;
    pageSize: N;
    totalRow: N;
}
