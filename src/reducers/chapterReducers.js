import {
  CHAPTER_CREATE_FAIL,
  CHAPTER_CREATE_REQUEST,
  CHAPTER_CREATE_RESET,
  CHAPTER_CREATE_SUCCESS,
  CHAPTER_DELETE_FAIL,
  CHAPTER_DELETE_REQUEST,
  CHAPTER_DELETE_SUCCESS,
  CHAPTER_DETAILS_FAIL,
  CHAPTER_DETAILS_REQUEST,
  CHAPTER_DETAILS_RESET,
  CHAPTER_DETAILS_SUCCESS,
  CHAPTER_LIST_FAIL,
  CHAPTER_LIST_REQUEST,
  CHAPTER_LIST_SUCCESS,
  CHAPTER_UPDATE_FAIL,
  CHAPTER_UPDATE_REQUEST,
  CHAPTER_UPDATE_RESET,
  CHAPTER_UPDATE_SUCCESS,
} from '../constants/chapterConstants'

export const chapterListReducer = (
  state = { chapters: [], loading: true },
  action
) => {
  switch (action.type) {
    case CHAPTER_LIST_REQUEST:
      return { loading: true, chapters: [] }
    case CHAPTER_LIST_SUCCESS:
      return {
        loading: false,
        chapters: action.payload.data,
      }
    case CHAPTER_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const chapterCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CHAPTER_CREATE_REQUEST:
      return { loading: true }
    case CHAPTER_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case CHAPTER_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case CHAPTER_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const chapterDetailsReducer = (
  state = { chapter: {}, loading: true },
  action
) => {
  switch (action.type) {
    case CHAPTER_DETAILS_REQUEST:
      return { loading: true, ...state }
    case CHAPTER_DETAILS_SUCCESS:
      return {
        loading: false,
        chapter: action.payload,
      }
    case CHAPTER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case CHAPTER_DETAILS_RESET:
      return { loading: true, chapter: {} }
    default:
      return state
  }
}

export const chapterUpdateReducer = (state = { chapter: {} }, action) => {
  switch (action.type) {
    case CHAPTER_UPDATE_REQUEST:
      return { loading: true }
    case CHAPTER_UPDATE_SUCCESS:
      return { loading: false, success: true, chapter: action.payload }
    case CHAPTER_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case CHAPTER_UPDATE_RESET:
      return { chapter: {} }
    default:
      return state
  }
}

export const chapterDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CHAPTER_DELETE_REQUEST:
      return { loading: true }
    case CHAPTER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case CHAPTER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
