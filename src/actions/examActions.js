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
import axiosClient from './../api/axiosClient'

export const listExam =
  (keyword = '', pageNumber = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: EXAM_LIST_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axiosClient.get(`/api/exams/?keyword=${keyword}&pageNumber=${pageNumber}`, config);

      dispatch({
        type: EXAM_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EXAM_LIST_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };

export const createExam = (exam) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EXAM_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axiosClient.post(`/api/exams`, exam, config);

    dispatch({
      type: EXAM_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EXAM_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const listExamDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: EXAM_DETAILS_REQUEST });
    const { data } = await axiosClient.get(`/api/exams/${id}`);
    dispatch({ type: EXAM_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EXAM_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateExam = (exam) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EXAM_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axiosClient.put(`/api/exams/`, exam, config);

    dispatch({
      type: EXAM_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EXAM_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const deleteExam = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EXAM_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axiosClient.delete(`/api/exams/${id}`, config);

    dispatch({
      type: EXAM_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: EXAM_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
