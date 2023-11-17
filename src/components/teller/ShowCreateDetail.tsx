import { item } from '@/types/actions/product';
import { XMarkIcon } from '@heroicons/react/24/solid';
import {useEffect} from 'react'

type Props = {
    onClose: () => void;
    isVisible: boolean;
    itemDetail:item<string, number>|undefined;
}

const ShowCreateDetail = ({ onClose, isVisible,itemDetail }: Props) => {
    // const [data,setData] = useState<item<string, number>>();
    useEffect(()=>{
        if(itemDetail) {
            // setData(itemDetail);
        }
    },[itemDetail])
    if (!isVisible) {
        return null;
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
            <div className="w-[1200px] bg-white rounded-lg pb-3">
                <div className="bg-gray-600 py-2 rounded-t-lg flex justify-between items-center pr-1">
                    <div className="w-full flex flex-row justify-between py-[5px] text-white ">
                        <p className="ml-2 mt-1 font-bold">
                            Chi tiết sản phẩm
                        </p>
                    </div>
                    <button onClick={onClose}>
                        <XMarkIcon className="w-7 h-7 hover:text-red-800 text-white" />
                    </button>
                </div>
                <div className="overflow-y-auto h-[24.5vh] ">
                {/* <div className="bg-white flex flex-col justify-center items-center rounded-lg py-3 w-[60%]">
                            {data?.images && (
                                <div className='bg-white shadow-lg p-2 rounded-lg'>
                                    <img
                                        src={data?.images[selectedImage].imageUrl}
                                        alt=""
                                        className='h-[480px] object-contain'
                                    />
                                </div>
                            )}
                            <div className='py-5'>
                                <div className='flex justify-center'>
                                    <div className={`grid grid-cols-${data?.images?.length ?? 1} gap-x-7`}>
                                        {data?.images && data?.images.map((item, index) => (
                                            <div key={index} className={`p-2  rounded-lg flex justify-center cursor-pointer  items-center ${index === selectedImage ? 'border-4 border-blue-400' : ''} `}>
                                                <img
                                                    src={item.imageUrl}
                                                    alt=""
                                                    className={`h-[170px] object-contain`}
                                                    onMouseEnter={() => handleChangeImage(index)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div> */}
                </div>
            </div>
        </div>
    )
}

export default ShowCreateDetail