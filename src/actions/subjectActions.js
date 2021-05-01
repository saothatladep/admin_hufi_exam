import {
  SUBJECT_DETAILS_FAIL,
  SUBJECT_DETAILS_REQUEST,
  SUBJECT_DETAILS_SUCCESS,
  SUBJECT_LIST_FAIL,
  SUBJECT_LIST_REQUEST,
  SUBJECT_LIST_SUCCESS,
} from '../constants/subjectConstants'
import axios from 'axios'
export const listSubjects = () => async (dispatch) => {
  try {
    dispatch({
      type: SUBJECT_LIST_REQUEST,
    })

    const { data } = await axios.get('/api/subjects')

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
