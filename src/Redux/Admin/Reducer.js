import {
    ADMIN_LOGIN_REQUEST,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_FAIL,
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAIL,
    DELETE_USER_SUCCESS,
    FETCH_DATASETS_REQUEST,
    FETCH_DATASETS_SUCCESS,
    FETCH_DATASETS_FAIL,
    FETCH_GRAPHS_REQUEST,
    FETCH_GRAPHS_SUCCESS,
    FETCH_GRAPHS_FAIL,
    ADMIN_LOGOUT,
    DELETE_DATASET_SUCCESS,
    DELETE_GRAPH_SUCCESS,
    GET_ADMIN_REQUEST,
    GET_ADMIN_SUCCESS,
    GET_ADMIN_FAILURE,
  } from "./ActionType";
  
  const adminInitialState = {
    loading: false,
    adminInfo: null, // Ensure persistence across refresh
    error:null
  };
  
  export const adminLoginReducer = (state = adminInitialState, action) => {
    
    switch (action.type) {
      case ADMIN_LOGIN_REQUEST:
      case GET_ADMIN_REQUEST:
        return { ...state, loading: true, error: null  };
      case ADMIN_LOGIN_SUCCESS:
      case GET_ADMIN_SUCCESS:
        return { ...state, loading: false, adminInfo: action.payload};
      case ADMIN_LOGIN_FAIL:
      case GET_ADMIN_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case ADMIN_LOGOUT:
        return { ...state, loading: false, adminInfo: null };
      default:
        return state;
    }
  };
  
  // ✅ Explicit initial states for users, datasets, and graphs
  const usersInitialState = {
    loading: false,
    users: [],
    error:null
  };
  
  export const usersReducer = (state = usersInitialState, action) => {
    switch (action.type) {
      case FETCH_USERS_REQUEST:
        return { ...state, loading: true };
      case FETCH_USERS_SUCCESS:
        return { ...state, loading: false, users: action.payload };
      case FETCH_USERS_FAIL:
        return { ...state, loading: false, error: action.payload };
      case DELETE_USER_SUCCESS:
        return {
          ...state,
          users: state.users.filter((user) => user._id !== action.payload),
        };
      default:
        return state;
    }
  };
  
  const datasetsInitialState = {
    loading: false,
    datasets: [],
    error:null
  };
  
  export const datasetsReducer = (state = datasetsInitialState, action) => {
    switch (action.type) {
      case FETCH_DATASETS_REQUEST:
        return { ...state, loading: true };
      case FETCH_DATASETS_SUCCESS:
        return { loading: false, datasets: action.payload };
      case FETCH_DATASETS_FAIL:
        return { loading: false, error: action.payload };
      case DELETE_DATASET_SUCCESS:
        return {...state,datasets: state.datasets.filter((dataset) => dataset._id !== action.payload),
        };
      default:
        return state;
    }
  };
  
  const graphsInitialState = {
    loading: false,
    graphs: [],
    error:null
  };
  
  export const graphsReducer = (state = graphsInitialState, action) => {
    switch (action.type) {
      case FETCH_GRAPHS_REQUEST:
        return { ...state, loading: true };
      case FETCH_GRAPHS_SUCCESS:
        return { loading: false, graphs: action.payload };
      case FETCH_GRAPHS_FAIL:
        return { loading: false, error: action.payload };
      case DELETE_GRAPH_SUCCESS:
        return {...state, graphs: state.graphs.filter((graph) => graph._id !== action.payload),
        };
      default:
        return state;
    }
  };
  