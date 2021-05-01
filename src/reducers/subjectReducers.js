import {
  SUBJECT_DETAILS_FAIL,
  SUBJECT_DETAILS_REQUEST,
  SUBJECT_DETAILS_RESET,
  SUBJECT_DETAILS_SUCCESS,
  SUBJECT_LIST_FAIL,
  SUBJECT_LIST_REQUEST,
  SUBJECT_LIST_SUCCESS,
} from '../constants/subjectConstants'

export const subjectListReducer = (state = { subjects: [], loading: true }, action) => {
  switch (action.type) {
    case SUBJECT_LIST_REQUEST:
      return { loading: true, subjects: [] }
    case SUBJECT_LIST_SUCCESS:
      return {
        loading: false,
        subjects: action.payload,
      }
    case SUBJECT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const subjectDetailsReducer = (state = { subjects: [], loading: true }, action) => {
  switch (action.type) {
    case SUBJECT_DETAILS_REQUEST:
      return { loading: true, ...state }
    case SUBJECT_DETAILS_SUCCESS:
      return {
        loading: false,
        subjects: action.payload,
      }
    case SUBJECT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case SUBJECT_DETAILS_RESET:
        return { loading: true, subjects: [] }
    default:
      return state
  }
}
