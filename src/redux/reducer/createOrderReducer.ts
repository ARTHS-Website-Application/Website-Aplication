import { postOrder } from "@/constants/mainConstants";

const initialState = {
    showError: null,
    showSuccess: null,
};

const createOrderReducer = (
    state = initialState,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { type, payload }: { type: string; payload: any }
) => {
   
    switch (type) {
        case postOrder.POST_ORDER_SUCCESS:
            return {
                ...state,
                showSuccess: payload.data,
                showError: null,
            };
        case postOrder.POST_ORDER_FAIL:
            return {
                ...state,
                showSuccess: null,
                showError: payload.error,
            };
        default:
            return state;
    }
}

export default createOrderReducer;