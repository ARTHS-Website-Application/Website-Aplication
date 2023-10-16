import { orderSaga, storeOrder } from '@/types/actions/listOrder';
import { listOrder } from '../../constants/mainConstants';


const initialState: storeOrder<string, number> = {
    orderInfor: [],
    showError: null,
};



const orderReducer = (
    state: storeOrder<string, number> = initialState,
    { type, payload }: { type: string; payload: orderSaga<string, number> }
) => {
    switch (type) {
        case listOrder.LIST_ORDER_SUCCESS:
            return {
                ...state,
                orderInfor: payload.data,

            }

        case listOrder.LIST_ORDER_FAIL:
            return {
                ...state,
                orderInfor: [],
            }
        // case productFilter.GET_PRODUCT_FILTER_SUCCESS:
        //     return {
        //         ...state,
        //         productInfor: payload.data,

        //     }
        // case productFilter.GET_PRODUCT_FILTER_FAIL:
        //     return {
        //         ...state,
        //         productInfor: [],
        //     }
        default:
            return state;
    }
};

export default orderReducer;