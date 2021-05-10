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
import axios from 'axios'

export const listChapter = (id, keyword = '', pageNumber = '') => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: CHAPTER_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(
      `/api/chapters/subject/${id}?keyword=${keyword}&pageNumber=${pageNumber}`,
      config
    )

    dispatch({
      type: CHAPTER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CHAPTER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createChapter = (chapter) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CHAPTER_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/chapters`, chapter, config)

    dispatch({
      type: CHAPTER_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CHAPTER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listChapterDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CHAPTER_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/chapters/${id}`)
    dispatch({ type: CHAPTER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CHAPTER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateChapter = (chapter) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CHAPTER_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/chapters/${chapter._id}`,
      chapter,
      config
    )

    dispatch({
      type: CHAPTER_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CHAPTER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteChapter = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CHAPTER_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/chapters/${id}`, config)

    dispatch({
      type: CHAPTER_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: CHAPTER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
