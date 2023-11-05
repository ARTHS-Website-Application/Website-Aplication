import { listOnlineOrder } from "@/constants/mainConstants";
import { onlineOrderSaga, storeOrderOnline } from "@/types/actions/listOnlineOrder";


const initialState: storeOrderOnline<string, number> = {
    onlineOrderInfo: [],
    showError: null,
};


const onlineOrderReducer = (
    state: storeOrderOnline<string, number> = initialState,
    { type, payload }: { type: string; payload: onlineOrderSaga<string, number> }
) => {
    switch (type) {
        case listOnlineOrder.LIST_ORDER_SUCCESS:
            return {
                ...state,
                onlineOrderInfo: payload.data,
                
            }
        case listOnlineOrder.LIST_ORDER_FAIL:
            return {
                ...state,
                onlineOrderInfo: [],
            }
        default:
            return state;
    }
};

export default onlineOrderReducer