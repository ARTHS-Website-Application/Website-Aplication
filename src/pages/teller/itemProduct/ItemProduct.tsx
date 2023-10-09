import { itemProduct } from "@/types/actions/product";
import { useState } from "react";

type Props = {
    _name: string,
    _priceCurrent: number,
    _imageUrl: string,
    profileItem: itemProduct<string, number>,
    onClickAdd:()=> void,
}

const ItemProduct = ({_name, _priceCurrent, _imageUrl, onClickAdd }: Props) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    // const handleAddToCart = () => {
    //     // Create an object to represent the item
    //     const itemToAdd = profileItem;

    //     // Get the existing cart items from local storage (if any)
    //     const existingCartItems = JSON.parse(localStorage.getItem('cartItems') as string) || [];
    //     const updatedItems = [...existingCartItems, itemToAdd];
    //     console.log(updatedItems)
    //     // Add the new item to the cart
    //     existingCartItems.push(itemToAdd);

    //     // Save the updated cart items back to local storage
    //     localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    // };
    return (
        <div className=" bg-white shadow-inner p-2"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className='w-full h-[200px] bg-center flex items-end' style={{ backgroundImage: `url(${_imageUrl})` }}>
                {isHovered &&
                    <button className='w-full h-[30px] bg-main text-white'
                        onClick={onClickAdd}
                    >Thêm</button>}
            </div>
            <div className='w-full flex flex-col justify-center items-center space-y-1 pt-1'>
                <p className='text-[14px] text-center'>{_name}</p>
                <p className='line-through text-[#888888]'>{_priceCurrent} đ</p>
                <p className='text-[#FE3A30]'>{_priceCurrent} đ</p>
            </div>
        </div>
    )
}

export default ItemProduct