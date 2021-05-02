import {
  SUBJECT_CREATE_FAIL,
  SUBJECT_CREATE_REQUEST,
  SUBJECT_CREATE_RESET,
  SUBJECT_CREATE_SUCCESS,
  SUBJECT_DELETE_FAIL,
  SUBJECT_DELETE_REQUEST,
  SUBJECT_DELETE_SUCCESS,
  SUBJECT_DETAILS_FAIL,
  SUBJECT_DETAILS_REQUEST,
  SUBJECT_DETAILS_RESET,
  SUBJECT_DETAILS_SUCCESS,
  SUBJECT_LIST_FAIL,
  SUBJECT_LIST_REQUEST,
  SUBJECT_LIST_SUCCESS,
  SUBJECT_UPDATE_FAIL,
  SUBJECT_UPDATE_REQUEST,
  SUBJECT_UPDATE_RESET,
  SUBJECT_UPDATE_SUCCESS,
} from '../constants/subjectConstants'

export const subjectListReducer = (state = { subjects: [], loading: true }, action) => {
  switch (action.type) {
    case SUBJECT_LIST_REQUEST:
      return { loading: true, subjects: [] }
    case SUBJECT_LIST_SUCCESS:
      return {
        loading: false,
        subjects: action.payload.data,
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

export const subjectUpdateReducer = (state = { subject: {} }, action) => {
  switch (action.type) {
    case SUBJECT_UPDATE_REQUEST:
      return { loading: true }
    case SUBJECT_UPDATE_SUCCESS:
      return { loading: false, success: true, subject: action.payload }
    case SUBJECT_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case SUBJECT_UPDATE_RESET:
      return { subject: {} }
    default:
      return state
  }
}

export const subjectCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBJECT_CREATE_REQUEST:
      return { loading: true }
    case SUBJECT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case SUBJECT_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case SUBJECT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const subjectDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBJECT_DELETE_REQUEST:
      return { loading: true }
    case SUBJECT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case SUBJECT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
