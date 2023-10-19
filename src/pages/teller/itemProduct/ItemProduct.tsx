import { discountItem, item } from "@/types/actions/product";
import { useState } from "react";

type Props = {
    _name: string,
    _priceCurrent: number,
    _imageUrl: string,
    profileItem: item<string, number>,
    _discount:discountItem<string,number>
    onClickAdd:()=> void,
}

const ItemProduct = ({_name, _priceCurrent, _imageUrl,_discount, onClickAdd }: Props) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    return (
        <div className=" bg-white drop-shadow-xl p-2 rounded-lg"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className='w-full h-[200px] bg-cover flex items-end' style={{ backgroundImage: `url(${_imageUrl})` }}>
                {isHovered &&
                    <button className='w-full h-[30px] bg-main text-white'
                        onClick={onClickAdd}
                    >Thêm</button>}
            </div>
            <div className='w-full flex flex-col justify-center items-center space-y-1 pt-1'>
                <p className='text-[14px] text-center'>{_name}</p>
                {_discount ?(
                <div>
                    <p className='line-through text-[#888888]'>{_priceCurrent} đ</p>
                <p className='text-[#FE3A30]'>{_priceCurrent * (1 - _discount.discountAmount/100)} đ</p>
                </div>
                ):(
                    <p className='text-[#FE3A30]'>{_priceCurrent} đ</p>
                )}
            </div>
        </div>
    )
}

export default ItemProduct