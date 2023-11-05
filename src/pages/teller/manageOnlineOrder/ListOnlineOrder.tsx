import { getOnlineOrder } from "@/actions/onlineOrder";
import LoadingPage from "@/components/LoadingPage";
import Pagination from "@/components/Pagination";
import TableOnlineOrder from "@/components/teller/TableOnlineOrder";
import { itemOnlineOrder, listOnlineOrder, selectorOnlineOrder } from "@/types/actions/listOnlineOrder";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ListOnlineOrder = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const onlineOrderInfo: listOnlineOrder<string, number> = useSelector((state: selectorOnlineOrder<string, number>) => state.onlineOrderReducer.onlineOrderInfo);
    const [onlineOrderData, setOnlineOrderData] = useState([] as itemOnlineOrder<string, number>[]);
    const [paginationNumber, setPaginationNumber] = useState<number>(0);


    useEffect(() => {
        if (onlineOrderInfo.pagination?.totalRow) {
            setPaginationNumber(0);
        }
    }, [onlineOrderInfo.pagination?.totalRow]);

    useEffect(() => {
        const filters = {
            orderStatus: 'Chờ xử lý',
        };
        dispatch(getOnlineOrder(paginationNumber, filters));
        setIsLoading(true);
    }, [dispatch, paginationNumber])

    useEffect(() => {
        setOnlineOrderData(onlineOrderInfo.data)
        
        setTimeout(() => {
            setIsLoading(false);
        }, 1500)
    }, [onlineOrderInfo.data])

    

    return (
        <div className="w-full min-h-full">
            <h1 className="font-semibold text-[24px]">Danh sách đơn hàng</h1>
            <div className="pt-3"></div>
    
            {isLoading ? (
                <LoadingPage />
            ) : (
                <div>
                    <div className={`${onlineOrderData?.length < 12 ? "h-[70vh]" : ""}`}>
                        <TableOnlineOrder data={onlineOrderData} />
                    </div>
    
                    <div className="pt-3">
                        <Pagination
                            totalPosts={onlineOrderInfo.pagination?.totalRow}
                            postsPerPage={onlineOrderInfo.pagination?.pageSize}
                            setCurrentPage={setPaginationNumber}
                            currentPage={paginationNumber}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListOnlineOrder

