import {
  EXAM_CREATE_FAIL,
  EXAM_CREATE_REQUEST,
  EXAM_CREATE_RESET,
  EXAM_CREATE_SUCCESS,
  EXAM_DELETE_FAIL,
  EXAM_DELETE_REQUEST,
  EXAM_DELETE_SUCCESS,
  EXAM_DETAILS_FAIL,
  EXAM_DETAILS_REQUEST,
  EXAM_DETAILS_RESET,
  EXAM_DETAILS_SUCCESS,
  EXAM_LIST_FAIL,
  EXAM_LIST_REQUEST,
  EXAM_LIST_SUCCESS,
  EXAM_UPDATE_FAIL,
  EXAM_UPDATE_REQUEST,
  EXAM_UPDATE_RESET,
  EXAM_UPDATE_SUCCESS,
} from '../constants/examConstants';

export const examListReducer = (state = { exams: [], loading: true }, action) => {
  switch (action.type) {
    case EXAM_LIST_REQUEST:
      return { loading: true, exams: [] };
    case EXAM_LIST_SUCCESS:
      return {
        loading: false,
        exams: action.payload.data,
      };
    case EXAM_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const examCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case EXAM_CREATE_REQUEST:
      return { loading: true };
    case EXAM_CREATE_SUCCESS:
      return { loading: false, success: true, exam: action.payload };
    case EXAM_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case EXAM_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const examDetailsReducer = (state = { exam: {}, loading: true }, action) => {
  switch (action.type) {
    case EXAM_DETAILS_REQUEST:
      return { loading: true, ...state };
    case EXAM_DETAILS_SUCCESS:
      return {
        loading: false,
        exam: action.payload,
      };
    case EXAM_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case EXAM_DETAILS_RESET:
      return { loading: true, exam: {} };
    default:
      return state;
  }
};

export const examUpdateReducer = (state = { exam: {} }, action) => {
  switch (action.type) {
    case EXAM_UPDATE_REQUEST:
      return { loading: true };
    case EXAM_UPDATE_SUCCESS:
      return { loading: false, success: true, exam: action.payload };
    case EXAM_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case EXAM_UPDATE_RESET:
      return { exam: {} };
    default:
      return state;
  }
};

export const examDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case EXAM_DELETE_REQUEST:
      return { loading: true };
    case EXAM_DELETE_SUCCESS:
      return { loading: false, success: true };
    case EXAM_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
