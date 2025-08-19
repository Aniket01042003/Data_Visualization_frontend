import { LOGOUT } from "../Auth/ActionType";
import {
    FETCH_DATASETS_REQUEST,
    FETCH_DATASETS_SUCCESS,
    FETCH_DATASETS_FAILURE,
    DELETE_DATASET_REQUEST,
    DELETE_DATASET_SUCCESS,
    DELETE_DATASET_FAILURE
  } from "./ActionType";
  
  const initialState = {
    datasets: [],
    loading: false,
    error: null
  };
  
  const datasetReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_DATASETS_REQUEST:
        return { ...state, loading: true };
  
      case FETCH_DATASETS_SUCCESS:
        return { ...state, loading: false, datasets: action.payload };
  
      case FETCH_DATASETS_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      case DELETE_DATASET_REQUEST:
        return { ...state, loading: true };
  
      case DELETE_DATASET_SUCCESS:
        return {
          ...state,
          loading: false,
          datasets: state.datasets.filter((dataset) => dataset._id !== action.payload)
        };
  
      case DELETE_DATASET_FAILURE:
        return { ...state, loading: false, error: action.payload };
      
      case LOGOUT:  
        return { ...state, datasets: [] };
      default:
        return state;
    }
  };
  
  export default datasetReducer;
  