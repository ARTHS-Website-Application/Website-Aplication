import { detailOrder } from '../../constants/mainConstants';
import { orderDetailPayloadReducer, storeOrderDetail } from '@/types/actions/detailOrder';


const initialState: storeOrderDetail<string, number> = {
    orderDetail: [],
    showError: null,
};



const orderDetailReducer = (
    state: storeOrderDetail<string, number> = initialState,
    { type, payload }: { type: string; payload: orderDetailPayloadReducer<string, number> }
) => {
    switch (type) {
        case detailOrder.DETAIL_ORDER_SUCCESS:
            return {
                ...state,
                orderDetail: payload.data,

            }

        case detailOrder.DETAIL_ORDER_FAIL:
            return {
                ...state,
                orderDetail: [],
            }

        default:
            return state;
    }
};

export default orderDetailReducer;