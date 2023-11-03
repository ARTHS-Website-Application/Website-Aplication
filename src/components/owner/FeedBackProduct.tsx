import { feedbackProducts } from '@/types/actions/product'
import { StarIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { formatDateFeedback } from '@/utils/formatDate';

type Props = {
    data: feedbackProducts<string, number>[] | undefined
}

const FeedBackProduct = ({ data }: Props) => {
    const [selectedRating, setSelectedRating] = useState<number>(0);
    const filteredFeedbacks = data?.filter((item) => {
        if (selectedRating === 0) {
            return true;
        } else {
            return item.rate === selectedRating;
        }
    });

    return (
        <div className='bg-white px-[5%]  py-5 mb-7 space-y-5'>
            <p className='text-[20px] font-semibold'>Nhận xét sản phẩm</p>
            <div className='bg-[#D8D8D8] rounded-lg p-5 flex justify-center'>
                <div className='flex flex-col items-center pr-5'>
                    <p className='text-[30px] text-yellow-700 font-semibold'>5 trên 5</p>
                    <div className='flex space-x-3'>
                        {[1, 2, 3, 4, 5].map((index) => (
                            <StarIcon key={index} className='w-9 h-9 stroke-yellow-400 fill-yellow-400' />
                        ))}
                    </div>
                </div>
                <div className='flex font-semibold space-x-8 text-[20px]'>
                    <button className={`px-7 h-[40px] ${selectedRating === 0 ? "border-2 border-yellow-400 text-yellow-400" : "border-2 border-gray-400 text-gray-300"}   bg-white`}
                        onClick={() =>{
                            setSelectedRating(0)
                        }}
                    >Tất cả</button>
                    {[5, 4, 3, 2, 1].map((value, index) => (
                        <button key={index} className={`px-7 h-[40px] ${selectedRating === value ? "border-2 border-yellow-400 text-yellow-400" : "border-2 border-gray-400 text-gray-300"}   bg-white`}
                            onClick={() =>setSelectedRating(value)}
                        >{value} sao ({data?.filter((item) => item.rate === value).length})</button>
                    ))}
                </div>
            </div>
            {filteredFeedbacks && filteredFeedbacks.length > 0
                ? (
                    <div className='space-y-3'>
                        {filteredFeedbacks.map((item, index) => (
                            <div key={index}>
                                <div className='flex items-center'>
                                    {item?.customer?.avatar
                                        ? (
                                            <img src={item?.customer.avatar} alt="" className='w-[90px] h-[90px] rounded-full object-cover' />
                                        ) :
                                        <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU'}
                                            alt="" className='w-[90px] h-[90px] rounded-full object-cover' />
                                    }

                                    <div className='pl-[30px] flex flex-col justify-start items-start space-y-4'>
                                        <p className='font-semibold text-[18px]'>{item?.customer.fullName}</p>
                                        <div className='flex space-x-3'>
                                            {[1, 2, 3, 4, 5].map((index) => (
                                                <span key={index}>
                                                    {index <= item?.rate ? (
                                                        <StarIcon className='w-5 h-5 stroke-yellow-400 fill-yellow-400' />
                                                    ) : (
                                                        <StarIcon className='w-5 h-5 stroke-gray-300 fill-gray-300' />
                                                    )}
                                                </span>
                                            ))}
                                        </div>
                                        <p className='text-[#9D9D9D]'>{formatDateFeedback(item?.createAt?.toString())} </p>
                                    </div>
                                </div>
                                <div className='mt-5 bg-[#D8D8D8] opacity-80 text-[17px] rounded-full py-4 px-7'>
                                    <p>{item?.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className=' space-y-3'>
                        <p className='text-[30px] text-center'>Chưa có nhận xét</p>
                    </div>
                )}
        </div>
    )
}

export default FeedBackProduct