import axios from "axios";
import { API_BASE_URL } from "../../utils/apiConfig";
import {
  FETCH_DATASETS_REQUEST,
  FETCH_DATASETS_SUCCESS,
  FETCH_DATASETS_FAILURE,
  DELETE_DATASET_REQUEST,
  DELETE_DATASET_SUCCESS,
  DELETE_DATASET_FAILURE
} from "./ActionType";

// Fetch Datasets
export const fetchDatasets = () => async (dispatch) => {
  dispatch({ type: FETCH_DATASETS_REQUEST });
  const jwt = localStorage.getItem("jwt");
  if (!jwt) return;
  try {
    const jwt = localStorage.getItem("jwt")
    const response = await axios.get(`${API_BASE_URL}/dataset/all`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    });
    // console.log("response from fetdata", response);
    dispatch({ type: FETCH_DATASETS_SUCCESS, payload: response.data });
  } catch (error) {
    console.log("error from fetdata", error);
    dispatch({ type: FETCH_DATASETS_FAILURE, payload: error});
  }
};

// Delete Dataset
export const deleteDataset = (id) => async (dispatch) => {
  dispatch({ type: DELETE_DATASET_REQUEST });
  // console.log("id",id);
  try {
    const jwt = localStorage.getItem("jwt")
    await axios.delete(`${API_BASE_URL}/dataset/${id}`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    });
    dispatch({ type: DELETE_DATASET_SUCCESS, payload: id });
  } catch (error) {
    console.log("error from deldata", error);
    dispatch({ type: DELETE_DATASET_FAILURE, payload: error.message });
  }
};
