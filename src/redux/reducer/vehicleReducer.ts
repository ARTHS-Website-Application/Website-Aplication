import { listVehicles } from "@/constants/secondaryConstants";
import { storeVehicleProduct, vehicleProductSaga } from "@/types/actions/listVehicle";



const initialState: storeVehicleProduct<string> = {
    vehicleProduct: [],
    showError: null,
};



const vehicleProductReducer = (
    state: storeVehicleProduct<string> = initialState,
    { type, payload }: { type: string; payload: vehicleProductSaga<string> }
) => {
    switch (type) {
        case listVehicles.GET_LIST_VEHICLES_SUCCESS:
            return {
                ...state,
                vehicleProduct: payload.data,

            }

        case listVehicles.GET_LIST_VEHICLES_FAil:
            return {
                ...state,
                vehicleProduct: [],
            }
        default:
            return state;
    }
};

export default vehicleProductReducer;