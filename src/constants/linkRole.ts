const roleAdmin = [
    {
        to: '/',
        name: 'Trang chủ',
        subMenu: undefined,
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
        to: "/manage-products",
        name: 'Quản lý sản phẩm',
    },
    {
        name: 'Quản lý đơn hàng',
        subMenu: [
            {
                name:'Đơn hàng online',
                to:'/online-order-owner'
            },
            {
                name: "Đơn hàng offline",
                to: "/manage-orders-owner",
            },
        ],
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
                name: "Các đơn hàng offline",
                to: "/manage-order/list-all-order",
            },
            {
                name: "Các đơn hàng online",
                to: "/manage-order/online-order",
            },
        ],
    },
    {
        name: 'Quản lý đặt lịch',
        subMenu: [
            {
                name: "Lịch đặt hôm nay",
                to: "/manage-booking/list-booking",
            },
            {
                name: "Duyệt lịch",
                to: "/manage-booking/list",
            },
        ],
    },
]

export { roleAdmin, roleOwner, roleTeller }