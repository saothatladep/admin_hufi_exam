import {
  SUBJECT_CREATE_FAIL,
  SUBJECT_CREATE_REQUEST,
  SUBJECT_CREATE_SUCCESS,
  SUBJECT_DELETE_FAIL,
  SUBJECT_DELETE_REQUEST,
  SUBJECT_DELETE_SUCCESS,
  SUBJECT_DETAILS_FAIL,
  SUBJECT_DETAILS_REQUEST,
  SUBJECT_DETAILS_SUCCESS,
  SUBJECT_LIST_FAIL,
  SUBJECT_LIST_REQUEST,
  SUBJECT_LIST_SUCCESS,
  SUBJECT_UPDATE_FAIL,
  SUBJECT_UPDATE_REQUEST,
  SUBJECT_UPDATE_SUCCESS,
} from '../constants/subjectConstants'
import axios from 'axios'
export const listSubjects = (keyword = '', pageNumber = '') => async (dispatch) => {
  try {
    dispatch({
      type: SUBJECT_LIST_REQUEST,
    })

    const { data } = await axios.get(`/api/subjects?keyword=${keyword}&pageNumber=${pageNumber}`)

    dispatch({
      type: SUBJECT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SUBJECT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listSubjectDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SUBJECT_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/subjects/${id}`)
    dispatch({ type: SUBJECT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: SUBJECT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateSubject = (subject) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBJECT_UPDATE_REQUEST,
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
      `/api/subjects/${subject._id}`,
      subject,
      config
    )

    dispatch({
      type: SUBJECT_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SUBJECT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createSubject = (subject) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBJECT_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/subjects`, subject, config)

    dispatch({
      type: SUBJECT_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SUBJECT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteSubject = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBJECT_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/subjects/${id}`, config)

    dispatch({
      type: SUBJECT_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: SUBJECT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
