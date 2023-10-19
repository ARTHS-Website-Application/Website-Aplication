
type Props = {
    isVisible: boolean;
    onClose: () => void;
    idOrder?:string;
    nameCustomer?:string;
    phoneCustomer?:string;
    licensePlate?:string;

}

const RepairCustomer = ({ isVisible, onClose, idOrder, nameCustomer, phoneCustomer, licensePlate}: Props) => {
    const handleUpdate = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

    }

    if (!isVisible) {
        return null;
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
            <div className="w-[500px]">
                <div className="bg-gray-600 py-2 rounded-t-lg">
                    <div className="w-full flex flex-row justify-between py-[5px] text-white ">
                        <p className="ml-2 mt-1 font-bold">Cập nhật thông tin khách hàng</p>
                    </div>
                </div>

                <div className="bg-white w-full p-2 pb-3 rounded-b-lg">
                    <form 
                    onSubmit={(e)=>{handleUpdate(e)}}
                    >
                        <div className="w-full flex justify-center py-3 text-[18px]">
                            <div className="w-[500px] space-y-5">
                                <p className="">Tên khách hàng:</p>
                                <p className="">Số điện thoại:</p>
                                <p className="">Biển số xe:</p>
                            </div>
                            <div className="space-y-5">
                                <input
                                    type="text"
                                    value={nameCustomer}
                                    className="focus:outline-none focus:border-b-2 focus:border-main  border-b-2 border-black pl-2"
                                    placeholder="Tên khách hàng"
                                />
                                <input
                                    type="text"
                                    value={phoneCustomer}
                                    className="focus:outline-none focus:border-b-2 focus:border-main  border-b-2 border-black pl-2"
                                    placeholder="Số điện thoại"
                                />
                                <input
                                    type="text"
                                    value={licensePlate}
                                    className="focus:outline-none focus:border-b-2 focus:border-main  border-b-2 border-black pl-2"
                                    placeholder="Biển số xe"
                                />
                            </div>
                            
                        </div>

                        <div className="font-bold text-white flex flex-row-reverse py-2">
                            <button
                                type="submit"
                                className="hover:bg-blue-800 bg-slate-600 w-[100px] h-[40px]  rounded-md ml-3"
                            >
                                Cập nhật
                            </button>
                            <button
                                className="bg-slate-600 hover:bg-red-700 w-[100px] h-[40px]  rounded-md  "
                                onClick={() => {
                                    onClose();
                                }}
                            >
                                Hủy
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RepairCustomer