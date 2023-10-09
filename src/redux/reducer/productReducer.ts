import { productSaga, storeProduct } from '@/types/actions/product';
import { productInfor } from '../../constants/mainConstants';


const initialState: storeProduct<string, number> = {
    productInfor: [],
    showError: null,
};



const productReducer = (
    state: storeProduct<string, number> = initialState,
    { type, payload }: { type: string; payload: productSaga<string, number> }
) => {
    switch (type) {
        case productInfor.GET_PRODUCT_INFO_SUCCESS:
            return {
                ...state,
                productInfor: payload.data,

            }

        case productInfor.GET_PRODUCT_INFO_FAIL:
            return {
                ...state,
                productInfor: [],
            }
        default:
            return state;
    }
};

export default productReducer;