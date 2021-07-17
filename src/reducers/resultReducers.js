import {
  RESULT_LIST_ALL_FAIL,
  RESULT_LIST_ALL_REQUEST,
  RESULT_LIST_ALL_SUCCESS,
  RESULT_LIST_FAIL,
  RESULT_LIST_REQUEST,
  RESULT_LIST_SUCCESS,
} from '../constants/resultConstants';

export const resultListReducer = (state = { results: [], loading: true }, action) => {
  switch (action.type) {
    case RESULT_LIST_REQUEST:
      return { loading: true, results: [] };
    case RESULT_LIST_SUCCESS:
      return {
        loading: false,
        results: action.payload.data,
      };
    case RESULT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const resultListAllReducer = (state = { results: [], loading: true }, action) => {
  switch (action.type) {
    case RESULT_LIST_ALL_REQUEST:
      return { loading: true, results: [] };
    case RESULT_LIST_ALL_SUCCESS:
      return {
        loading: false,
        results: action.payload.data,
      };
    case RESULT_LIST_ALL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
