import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./Auth/Reducer";
import { thunk } from "redux-thunk";
import uploadReducer from "./uploadData/Reducer";
import datasetReducer from "./Dataset/Reducer";
import { adminLoginReducer, datasetsReducer, graphsReducer, usersReducer } from "./Admin/Reducer";


const rootReducer = combineReducers({
    auth: authReducer,
    uploadData: uploadReducer,
    datasetReducer: datasetReducer,

    adminLogin: adminLoginReducer,
    users: usersReducer,
    datasets: datasetsReducer,
    graphs: graphsReducer,

})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

