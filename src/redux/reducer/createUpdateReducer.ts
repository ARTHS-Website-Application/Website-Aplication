import { createAccounts } from '@/constants/secondaryConstants';
import { createAccountSaga, storeCreateAccount } from '@/types/actions/createUpdateAccount';


const initialState: storeCreateAccount<string,number>= {
    accountInfor: null,
    showError: null,
};



const createUpdateReducer = (
    state:storeCreateAccount<string,number> = initialState,
    { type, payload }: { type: string; payload: createAccountSaga<string,number> }
    ) => {
    switch (type) {
        case createAccounts.CREATE_ACCOUNT_SUCCESS: 
            return{
                ...state,
                accountInfor: payload.data,
                showError:undefined
            }
            
        case createAccounts.CREATE_ACCOUNT_FAIL:
            return{
                ...state,
                accountInfor:null,
                showError:payload.showError
            }
        default:
            return state;
    }
};

export default createUpdateReducer;