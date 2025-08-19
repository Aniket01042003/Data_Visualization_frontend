import axios from "axios";
import { API_BASE_URL } from "../../utils/apiConfig";
import { CLEAR_DATASET, UPLOAD_FAILURE, UPLOAD_REQUEST, UPLOAD_SUCCESS } from "./ActionType";

export const uploadDataset = (file) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPLOAD_REQUEST });

    const formData = new FormData();
    formData.append("file", file);

    const token = getState().auth.jwt;

    const { data } = await axios.post(`${API_BASE_URL}/dataset/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("uploadaction dataset ", data.dataset);
    dispatch({
      type: UPLOAD_SUCCESS,
      payload: data.dataset,
    });

  } catch (error) {
    
    dispatch({
      type: UPLOAD_FAILURE,
      payload: error.response?.data?.message || "Upload failed!",
    });
  }
};

export const clearDataset = () => ({
  type: CLEAR_DATASET,
});
