import {
  QUESTION_CREATE_FAIL,
  QUESTION_CREATE_REQUEST,
  QUESTION_CREATE_RESET,
  QUESTION_CREATE_SUCCESS,
  QUESTION_DELETE_FAIL,
  QUESTION_DELETE_REQUEST,
  QUESTION_DELETE_SUCCESS,
  QUESTION_DETAILS_FAIL,
  QUESTION_DETAILS_REQUEST,
  QUESTION_DETAILS_RESET,
  QUESTION_DETAILS_SUCCESS,
  QUESTION_IMPORT_FAIL,
  QUESTION_IMPORT_REQUEST,
  QUESTION_IMPORT_RESET,
  QUESTION_IMPORT_SUCCESS,
  QUESTION_LIST_FAIL,
  QUESTION_LIST_REQUEST,
  QUESTION_LIST_SUCCESS,
  QUESTION_UPDATE_FAIL,
  QUESTION_UPDATE_REQUEST,
  QUESTION_UPDATE_RESET,
  QUESTION_UPDATE_SUCCESS,
} from '../constants/questionConstants';
import axiosClient from './../api/axiosClient'

export const listQuestion =
  (id, level, keyword = '', pageNumber = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: QUESTION_LIST_REQUEST,
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

      const { data } = await axiosClient.get(
        `/api/questions/chapter/${id}?keyword=${keyword}&pageNumber=${pageNumber}&level=${level}`,
        config
      );

      dispatch({
        type: QUESTION_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: QUESTION_LIST_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };

export const createQuestion = (question) => async (dispatch, getState) => {
  try {
    dispatch({
      type: QUESTION_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axiosClient.post(`/api/questions`, question, config);

    dispatch({
      type: QUESTION_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: QUESTION_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const listQuestionDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: QUESTION_DETAILS_REQUEST });
    const { data } = await axiosClient.get(`/api/questions/${id}`);
    dispatch({ type: QUESTION_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: QUESTION_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateQuestion = (question) => async (dispatch, getState) => {
  try {
    dispatch({
      type: QUESTION_UPDATE_REQUEST,
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

    const { data } = await axiosClient.put(`/api/questions/`, question, config);

    dispatch({
      type: QUESTION_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: QUESTION_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const deleteQuestion = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: QUESTION_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axiosClient.delete(`/api/questions/${id}`, config);

    dispatch({
      type: QUESTION_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: QUESTION_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const importQuestion = (question) => async (dispatch, getState) => {
  try {
    dispatch({
      type: QUESTION_IMPORT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axiosClient.post(`/api/questions/import`, question, config);

    dispatch({
      type: QUESTION_IMPORT_SUCCESS,
    });
    dispatch({ type: QUESTION_IMPORT_RESET });
  } catch (error) {
    dispatch({
      type: QUESTION_IMPORT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
