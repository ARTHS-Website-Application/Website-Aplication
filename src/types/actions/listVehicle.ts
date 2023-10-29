
export interface selectorVehicleProduct<T> {
    vehicleProductReducer: {
        vehicleProduct: itemVehicleProduct<T>[];
        showError: T | null;
    }
}

export interface payloadVehicle<T> {
    type: 'list_vehicles_search';
    vehicleName: T
}

export interface storeVehicleProduct<T> {
    showError: T | null,
    vehicleProduct: vehicleProductSaga<T>[];
}

export interface vehicleProductSaga<T> {
    data: itemVehicleProduct<T>
}

export interface itemVehicleProduct<T> {
    id: T;
    vehicleName: T;
}



