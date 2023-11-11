import ItemProduct from '../itemProduct/ItemProduct';
import {item} from '@/types/actions/product';
type Props = {
    data: item<string, number>[],
    onClickAdd: (data: item<string, number>) => void, // Modify the prop definition here
}

const ListProduct = ({ data, onClickAdd }: Props) => {
    

    return (
        <div className={`grid grid-cols-3 gap-x-7 gap-y-3  ${data.length>4 ?"overflow-y-scroll h-[65vh]":"h-[65vh] pb-[20vh]" }  py-3 pr-1`}>
            {data.map((item: item<string, number>, index: number) => (
                <ItemProduct
                    onClickAdd={() => onClickAdd(item)}
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
