import { storeProfileUser,profileUser } from '@/types/actions/profile';
import { userInfor } from '../../constants/mainConstants';


const initialState: storeProfileUser<string>= {
    infor: [],
    showError: null,
};



const userReducer = (
    state:storeProfileUser<string> = initialState,
    { type, payload }: { type: string; payload: profileUser<string> }
    ) => {
    switch (type) {
        case userInfor.GET_USER_INFO_SUCCESS: 
            return{
                ...state,
                infor: payload.data,
            }
            
        case userInfor.GET_USER_INFO_FAIL:
            return{
                ...state,
                infor:[],
            }
        default:
            return state;
    }
};

export default userReducer;