import {
  RESULT_LIST_ALL_FAIL,
  RESULT_LIST_ALL_REQUEST,
  RESULT_LIST_ALL_SUCCESS,
  RESULT_LIST_FAIL,
  RESULT_LIST_REQUEST,
  RESULT_LIST_SUCCESS,
} from '../constants/resultConstants';
import axiosClient from './../api/axiosClient';

export const listResult =
  (id, pageNumber = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: RESULT_LIST_REQUEST,
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

      const { data } = await axiosClient.get(`/api/results/schedule/${id}?pageNumber=${pageNumber}`, config);

      dispatch({
        type: RESULT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: RESULT_LIST_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };

export const listAllResult = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RESULT_LIST_ALL_REQUEST,
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

    const { data } = await axiosClient.get(`/api/results/schedule/all/${id}`, config);

    dispatch({
      type: RESULT_LIST_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RESULT_LIST_ALL_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
