const roleAdmin = [
    {
        to: '/',
        name: 'quan ly',
    },
];
const roleOwner = [
    {
        to: '/owner',
        name: 'quan ly',
    },
    {
        to: '/admin',
        name: 'quan ly',
    },
    {
        to: '/admin',
        name: 'quan ly',
    },
]
const roleTeller = [
    {
        to: '/teller',
        name: 'Trang chủ',
    },
    {
        to: '/manage-order',
        name: 'Quản lý đơn hàng',
    },
    {
        to: '/admin',
        name: 'quan ly',
    },
]

export {roleAdmin,roleOwner,roleTeller}