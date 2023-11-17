import { postTransport } from '@/actions/onlineOrder';
import { statusOrder } from '@/types/typeOrder';
import { useState } from 'react'
import { useDispatch } from 'react-redux';

type Props = {
    onClose: () => void;
    isVisible: boolean;
    idOrder: string;
}

const CreateTransport = ({ isVisible, onClose, idOrder }: Props) => {
    const dispatch = useDispatch();
    const [showError, setShowError] = useState<string>('');
    const [addNote, setAddNote] = useState<string>('');
    const [addContent, setAddContent] = useState<string>('');
    const [addWeight, setAddWeight] = useState<number>(0);
    const [addLength, setAddLength] = useState<number>(0);
    const [addWidth, setAddWidth] = useState<number>(0);
    const [addHeight, setAddHeight] = useState<number>(0);

    if (!isVisible) {
        return null;
    }
    const handleCreateTransport = () => {
        const data = {
            orderId: idOrder,
            note: addNote,
            content: addContent,
            weight: addWeight,
            length: addLength,
            width: addWidth,
            height: addHeight
        }
        console.log("data",data);
        const status = {
            status: statusOrder.Transport,
            cancellationReason: "",
        }
        if (addNote && addContent && addLength && addWidth && addHeight && addWeight) {
            dispatch(postTransport(data, status))
            setShowError('')
        } else {
            setShowError('Không được bỏ trống')
        }
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
            <div className="min-w-[500px] bg-white rounded-lg pb-3">
                <div className="bg-gray-600 py-2 rounded-t-lg">
                    <div className="w-full flex flex-row justify-between py-[5px] text-white ">
                        <p className="ml-2 mt-1 font-bold">
                            Thông tin đơn hàng vận chuyển
                        </p>
                    </div>
                </div>
                <div className='py-5 px-3 space-y-3'>
                    <div className='flex space-x-3 items-center'>
                        <p className="text-[17px] font-semibold">Nội dung:</p>
                        <input type="text"
                            className='outline-none w-[80%] px-1 border-b-2 border-gray-500'
                            placeholder='Nhập nội dung'
                            onChange={(e) => setAddNote(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col w-full space-y-1'>
                        <p className="text-[17px] font-semibold">Ghi chú:</p>
                        <textarea
                            className='w-full min-h-[100px] px-1 border-2 border-gray-500'
                            placeholder='Nhập ghi chú...'
                            onChange={(e) => setAddContent(e.target.value)}
                        ></textarea>
                    </div>
                    <div className='grid grid-cols-2 gap-3 '>
                        <div className='flex items-center space-x-3 pt-3 font-semibold '>
                            <p className='text-[17px]'>Cân nặng(kg):</p>
                            <input type="number"
                                className='w-[50px] outline-none border-b-2 border-gray-600 text-center text-[15px]'
                                min={1}
                                defaultValue={1}
                                onChange={(e) => {
                                    const newValue = parseInt(e.target.value);
                                    setAddWeight(newValue);
                                }}
                            />
                        </div>
                        <div className='flex items-center space-x-3 pt-3 font-semibold '>
                            <p className='text-[17px]'>Chiều dài(cm):</p>
                            <input type="number"
                                className='w-[50px] outline-none border-b-2 border-gray-600 text-center text-[15px]'
                                min={1}
                                defaultValue={1}
                                onChange={(e) => {
                                    const newValue = parseInt(e.target.value);
                                    setAddLength(newValue);
                                }}
                            />
                        </div>
                        <div className='flex items-center space-x-3 pt-3 font-semibold '>
                            <p className='text-[17px]'>Chiều rộng(cm):</p>
                            <input type="number"
                                className='w-[50px] outline-none border-b-2 border-gray-600 text-center text-[15px]'
                                min={1}
                                defaultValue={1}
                                onChange={(e) => {
                                    const newValue = parseInt(e.target.value);
                                    setAddWidth(newValue);
                                }}
                            />
                        </div>
                        <div className='flex items-center space-x-3 pt-3 font-semibold '>
                            <p className='text-[17px]'>Chiều cao(cm):</p>
                            <input type="number"
                                className='w-[50px] outline-none border-b-2 border-gray-600 text-center text-[15px]'
                                min={1}
                                defaultValue={1}
                                onChange={(e) => {
                                    const newValue = parseInt(e.target.value);
                                    setAddHeight(newValue);
                                }}
                            />
                        </div>
                    </div>

                    {showError ? (
                        <p className='text-red-700 text-center text-[18px] font-semibold pt-3'>{showError}</p>
                    ) : ""}
                </div>


                <div className="font-bold text-white flex flex-row-reverse justify-center space-x-5 space-x-reverse pt-[10px]">

                    <button
                        type='button'
                        className={`hover:bg-blue-800 bg-gray-400 px-5 h-[40px]  rounded-md`}
                        onClick={handleCreateTransport}
                    >
                        Chuyển đơn vận chuyển
                    </button>
                    <button
                        className=" bg-red-700 px-5 h-[40px]  rounded-md  "
                        onClick={() => {
                            onClose();
                            setShowError('');
                        }}
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateTransport