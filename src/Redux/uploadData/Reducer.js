import { CLEAR_DATASET, UPLOAD_FAILURE, UPLOAD_REQUEST, UPLOAD_SUCCESS,  } from "./ActionType";


const initialState = {
  loading: false,
  dataset: null,
  error: null,
};

const uploadReducer = (state = initialState, action) => {

  switch (action.type) {
    case UPLOAD_REQUEST:
        return { ...state, loading: true, error: null };

    case UPLOAD_SUCCESS:
        return { ...state, loading: false, dataset: action.payload };

    case UPLOAD_FAILURE:
        return { ...state, loading: false, error: action.payload };
    case CLEAR_DATASET:
        return { ...state, dataset: null };

    default:
        return state;
  }
};

export default uploadReducer;

