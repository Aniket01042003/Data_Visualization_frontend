import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, UPDATE_USER_FAILURE, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from "./ActionType";


const initialState = {
    user: null,
    isLoading: false,
    error: null,
    jwt: null
}


export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case UPDATE_USER_REQUEST:
            return { ...state, isLoading: true, error: null };

        case REGISTER_SUCCESS:
            return { ...state, isLoading: false, error: null };

        case LOGIN_SUCCESS:
            return { ...state, isLoading: false, error: null, user: action.payload.user, jwt: action.payload.token };

        case GET_USER_SUCCESS:
        case UPDATE_USER_SUCCESS:
            return { ...state, isLoading: false, error: null, user: action.payload.user, jwt: action.payload.token };

        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
        case UPDATE_USER_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        case LOGOUT:
            localStorage.removeItem("jwt"); 
            return { ...state, isAuthenticated: false,user: null, jwt: null };

        default:
            return state;
    }



}




