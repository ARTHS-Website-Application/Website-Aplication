import { discountItem} from "@/types/actions/product";
import { useState } from "react";

type Props = {
    _name: string,
    _priceCurrent: number,
    _imageUrl: string,
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
            <div className='w-full h-[200px] bg-cover relative' style={{ backgroundImage: `url(${_imageUrl})` }}>
                {_discount &&(
                    <div className="absolute top-0 right-0 ">
                        <p className="p-1 text-center bg-red-600 text-white">-{_discount.discountAmount}%</p>
                    </div>
                )}
                {isHovered &&
                    <button className='w-full absolute bottom-0 h-[30px]  bg-main text-white'
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