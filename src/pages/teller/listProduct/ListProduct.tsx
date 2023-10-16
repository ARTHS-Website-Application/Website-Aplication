import ItemProduct from '../itemProduct/ItemProduct';
import { itemProduct } from '@/types/actions/product';

type Props = {
    data: itemProduct<string, number>[],
    onClickAdd: (data: itemProduct<string, number>) => void, // Modify the prop definition here
}

const ListProduct = ({ data, onClickAdd }: Props) => {
    return (
        <div className={`grid grid-cols-4 gap-x-7 gap-y-3  ${data.length>4 ?"overflow-y-scroll h-[60vh]":"h-[60vh] pb-[20vh]" }  py-3`}>
            {data.map((item: itemProduct<string, number>, index: number) => (
                <ItemProduct
                    onClickAdd={() => onClickAdd(item)} // Pass the item as an argument
                    profileItem={item}
                    key={index}
                    _name={item.name}
                    _priceCurrent={item.priceCurrent}
                    _discount={item.discount}
                    _imageUrl={item.images[0].imageUrl}
                />
            ))}
        </div>
    );
}

export default ListProduct;
