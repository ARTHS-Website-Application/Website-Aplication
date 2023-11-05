import { updateCustomerOrder } from '@/actions/order';
import { showSuccessAlert } from '@/constants/chooseToastify';
import { formatPhoneNumber } from '@/utils/formatPhone';
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
type Props = {
    isVisible: boolean;
    onClose: () => void;
    idOrder: string | null;
    nameCustomer: string | null;
    phoneCustomer: string;
    licensePlate: string;

}

const RepairCustomer = ({ isVisible, onClose, idOrder, nameCustomer, phoneCustomer, licensePlate }: Props) => {
    const [namUser, setNameUser] = useState<string | null>('');
    const [phoneUser, setPhoneUser] = useState<string | null>('');
    const [license, setLicense] = useState<string | null>('');
    const [error, setError] = useState<string | null>('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (nameCustomer && phoneCustomer || licensePlate) {
            setNameUser(nameCustomer)
            setPhoneUser(phoneCustomer)
            setLicense(licensePlate)
        }

    }, [licensePlate, nameCustomer, phoneCustomer])

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedPhoneNumber = formatPhoneNumber(e.target.value);
        setPhoneUser(formattedPhoneNumber);
    };

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            customerName: namUser as string,
            customerPhone: phoneUser as string,
            licensePlate: license,

        }
        if (idOrder && !licensePlate) {
            if (!namUser || !phoneUser) {
                setError('Hãy điền đầy đủ các giá trị')
                // onClose();
            } else if (namUser.trim() && phoneCustomer.length === 10) {
                dispatch(updateCustomerOrder(idOrder, data))
                setError('');
                onClose();
                showSuccessAlert('Cập nhật thành công');
            }
            console.log("va1")
        }
        if (idOrder && licensePlate) {
            if (!namUser || !phoneUser || !phoneUser) {

                setError('Hãy điền đầy đủ các giá trị')
                // onClose();
            } else if (namUser.trim() && phoneCustomer.length === 10 && licensePlate.trim()) {
                dispatch(updateCustomerOrder(idOrder, data))
                setError('');
                onClose();
                showSuccessAlert('Cập nhật thành công');
            }
            console.log("va2")
        }
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
                        onSubmit={(e) => { handleUpdate(e) }}
                    >
                        <div className="w-full flex justify-center py-3 text-[18px] items-center">
                            <div className="w-[500px] flex flex-col space-y-5">
                                <p className="">Tên khách hàng:</p>
                                <p className="">Số điện thoại:</p>
                                {licensePlate && (
                                    <p className="">Biển số xe:</p>
                                )}
                            </div>
                            <div className=" space-y-5">
                                <input
                                    type="text"
                                    value={namUser || ''}
                                    className="focus:outline-none focus:border-b-2 focus:border-main  border-b-2 border-black pl-2"
                                    placeholder="Tên khách hàng"
                                    onChange={(e) => setNameUser(e.target.value)}
                                />
                                <input
                                    type="text"
                                    value={phoneUser || ''}
                                    className="focus:outline-none focus:border-b-2 focus:border-main  border-b-2 border-black pl-2"
                                    placeholder="Số điện thoại(10 số)"
                                    onChange={handlePhoneChange}
                                />
                                {licensePlate && (
                                    <input
                                        type="text"
                                        value={license || ''}
                                        className="focus:outline-none focus:border-b-2 focus:border-main  border-b-2 border-black pl-2"
                                        placeholder="Biển số xe"
                                        onChange={(e) => {
                                            setLicense(e.target.value)
                                        }}
                                    />
                                )}

                            </div>

                        </div>
                        {error ? (
                            <div className="py-1 pr-[55px]">
                                <p className="text-red-700 text-end font-semibold">{error}</p>
                            </div>
                        ) : (
                            ''
                        )}

                        <div className="font-bold text-white flex flex-row-reverse py-2">
                            <button
                                type="submit"
                                className="hover:bg-blue-800 bg-gray-600 w-[100px] h-[40px]  rounded-md ml-3"
                            >
                                Cập nhật
                            </button>
                            <button
                                className=" bg-red-700 w-[100px] h-[40px]  rounded-md  "
                                onClick={() => {
                                    onClose();
                                    setError('')
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