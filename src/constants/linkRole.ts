const roleAdmin = [
    {
        to: '/',
        name: 'quan ly',
        subMenu: [
            {
                name: "Submenu 3",
                to: "/submenu-3",
            },
        ],
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
        to: '/',
        name: 'Quản lý sản phẩm',
        subMenu: [
            {
                name: "Submenu 3",
                to: "/manage-products",
            },
        ],
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
        name: 'Quản lý đơn hàng',
        subMenu: [
            {
                name: "Tạo đơn hàng",
                to: "/manage-order/create-order",
            },
            {
                name: "Danh sách đơn hàng",
                to: "/manage-order/list-all-order",
            },
        ],
    },
    {
        name: 'Danh sách đặt lịch',
        subMenu: [
            {
                name: "Submenu 3",
                to: "/manage-booking/list-booking",
            },
        ],
    },
    {
        to: '/manage-online-order',
        name: 'Quản ký đơn đặt hàng'
    }
]

export { roleAdmin, roleOwner, roleTeller }