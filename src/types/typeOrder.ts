export enum statusOrder {
    NewOrder = "Đơn mới",
    Repairing = "Đang sửa chữa",
    WaitForPay = "Chờ thanh toán",
    Finished = "Hoàn thành",
    Paid = "Đã thanh toán",
}

export enum typeOrder{
    Purchase = "Đơn mua hàng",
    Repair = "Đơn sửa chữa",
}


export enum statusOnlineOrder{
    Processing = "Chờ xử lý",
    Confirm = "Đã xác nhận",
    Transport = "Đang giao",
    Finished = "Hoàn thành",
    Canceled = "Đã hủy",
    Paid = "Đã thanh toán",
}
