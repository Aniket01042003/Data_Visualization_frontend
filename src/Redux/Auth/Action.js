import axios from "axios";
import { API_BASE_URL } from "../../utils/apiConfig";
import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, UPDATE_USER_FAILURE, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from "./ActionType";



//register
const registerRequest = ()=>({type:REGISTER_REQUEST});
const registerSuccess = (user)=>({type:REGISTER_SUCCESS,payload:user})
const registerFailure = (error)=>({type:REGISTER_FAILURE,payload:error});

export const register = (userData) => async (dispatch) => {
    dispatch(registerRequest())
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
        // console.log("response1 ", response);
        const user = response.data;
        // if (user.jwt) {
        //     localStorage.setItem("jwt", user.jwt)
        // }
        dispatch(registerSuccess(user))
        return { success: true}
    } catch (error) {
        dispatch(registerFailure(error.response.data.message));
        return {error};
    }
}


//login
const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (userData) => async (dispatch) => {
    dispatch(loginRequest())
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
        const user = response.data;
        if (user.token.token) {
            localStorage.setItem("jwt",  user.token.token)
        }
        // console.log("user1 ", user.token);
        dispatch(loginSuccess(user.token));
        return { success: true, message: "Login successful" };
    } catch (error) {
         dispatch(loginFailure(error.response.data.message));
         return{success: false, message: error.response.data.message}
    }
}
export const googlelogin = (jwt) => async (dispatch) => {
    try {
        if (jwt) {
            localStorage.setItem("jwt", jwt);
        }
        return { success: true, message: "Login successful" };
    } catch (error) {
        dispatch(loginFailure(error.response?.data?.message || "Google login failed"));
        return { success: false, message: error.response?.data?.message };
    }
};

const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error });

export const getUser = (jwt) => async (dispatch) => {
    dispatch(getUserRequest())
    try {
        // console.log(jwt);
        const response = await axios.get(`${API_BASE_URL}/user/profile`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        const user = response.data;
        // console.log("user getuser ", response);
        dispatch(getUserSuccess({ user, token: jwt }))
    } catch (error) {
        dispatch(getUserFailure(error.message));
    }
}

export const updateUser = (userId, userData) => async (dispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST });
    
    try {
        const jwt = localStorage.getItem("jwt");

        const response = await axios.put(
            `${API_BASE_URL}/user/update`,
            userData,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    "Content-Type": "application/json",
                },
            }
        );
        dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data });
        return { success: true };
    } catch (error) {
        dispatch({ type: UPDATE_USER_FAILURE, payload: error.response?.data?.message || "Update failed" });
        return { success: false, error: error.response?.data?.message };
    }
};

export const logout = () => (dispatch) => {
    localStorage.setItem("jwt"," ");
    dispatch({ type: LOGOUT, payload: null })
}

export const setUserAuthenticated = (token) => (dispatch) => {
    dispatch({ type: LOGIN_SUCCESS, payload: token });
};
