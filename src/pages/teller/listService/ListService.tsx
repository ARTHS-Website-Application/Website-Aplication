import { itemService } from '@/types/actions/listService';
import ItemService from '../itemService/ItemService';
type Props = {
    data: itemService<string, number>[],
    onClickAdd: (data: itemService<string, number>) => void, // Modify the prop definition here
}

const ListService = ({ data, onClickAdd }: Props) => {
    

    return (
        <div className={`grid grid-cols-4 gap-x-7 gap-y-3  ${data.length>4 ?"overflow-y-scroll h-[60vh]":"h-[60vh] pb-[20vh]" }  py-3`}>
            {data.map((item: itemService<string, number>, index: number) => (
                <ItemService
                    onClickAdd={() => onClickAdd(item)} // Pass the item as an argument
                    profileItem={item}
                    key={index}
                    _name={item.name}
                    _priceCurrent={item.price}
                    _imageUrl={item.images[0].imageUrl}
                />
            ))}
        </div>
    );
}

export default ListService;
