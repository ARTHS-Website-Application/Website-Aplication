const roleAdmin = [
    {
        to: '/',
        name: 'quan ly',
    },
];
const roleOwner = [
    {
        to: '/owner',
        name: 'Trang chủ',
    },
    {
        to: '/manage-employees',
        name: 'Quản lý nhân viên',
    },
    {
        to: '/manage-products',
        name: 'Quản lý sản phẩm',
    },
    {
        to: '/manage-orders-owner',
        name: 'Quản lý đơn hàng',
    },
    {
        to: '/manage-discounts',
        name: 'Quản lý khuyến mãi',
    },
    {
        to: '/manage-services',
        name: 'Quản lý dịch vụ',
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