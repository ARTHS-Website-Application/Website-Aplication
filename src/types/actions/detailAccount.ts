


export interface itemDetailAccount<T, N> {
    accountId: T;
    fullName: T;
    gender: T;
    phoneNumber: T;
    address: T;
    avatar: T;
    cart: {
        id: T;
        cartItems: {
            cartId: T;
            quantity: N;
            motobikeProduct: {
                id: T;
                name: T;
                priceCurrent: N;
                installationFee: N;
                discountAmount: N;
                image: T;
            }
        }[]
    };
    feedbackStaffs: {
        id: T;
        title: T;
        content: T;
        sendDate: Date;
        customer: {
            accountId: T;
            phoneNumber: T;
            fullName: T;
            gender: T;
            address: T;
            avatar: T;
        }
    }[]
}