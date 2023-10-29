import { listDiscount } from "@/constants/secondaryConstants";
import { discountSaga, storeDiscount } from "@/types/actions/listDiscout";



const initialState: storeDiscount<string, number> = {
    discountInfor: [],
    showError: null,
};



const discountReducer = (
    state: storeDiscount<string, number> = initialState,
    { type, payload }: { type: string; payload: discountSaga<string, number> }
) => {
    switch (type) {
        case listDiscount.GET_LIST_DISCOUNT_SUCCESS:
            return {
                ...state,
                discountInfor: payload.data,
            }

        case listDiscount.GET_LIST_DISCOUNT_FAIL:
            return {
                ...state,
                discountInfor: [],
                showError: payload.data
            }
        default:
            return state;
    }
};

export default discountReducer;