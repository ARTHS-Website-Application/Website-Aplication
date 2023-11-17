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
        name: 'Quản lý sản phẩm',
        subMenu: [
            {
                name:'Tạo sản phẩm',
                to:'/create-product'
            },
            {
                name: "Danh sách sản phẩm",
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
        name: 'Quản lý dịch vụ',
        subMenu: [
            {
                name:'Tạo dịch vụ',
                to:'/create-service'
            },
            {
                name: "Danh sách dịch vụ",
                to: '/manage-services',
            },
        ],
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