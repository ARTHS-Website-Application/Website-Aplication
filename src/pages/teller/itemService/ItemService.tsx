import { itemService } from "@/types/actions/listService";
import { useState } from "react";

type Props = {
    _name: string,
    _priceCurrent: number,
    _imageUrl: string,
    profileItem: itemService<string, number>,
    onClickAdd: () => void,
}

const ItemService = ({ _name, _priceCurrent, _imageUrl, onClickAdd }: Props) => {
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
                <p className='text-[#FE3A30]'>{_priceCurrent} đ</p>
            </div>
        </div>
    )
}

export default ItemService