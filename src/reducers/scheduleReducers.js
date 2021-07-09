import {
    SCHEDULE_CREATE_FAIL,
    SCHEDULE_CREATE_REQUEST,
    SCHEDULE_CREATE_RESET,
    SCHEDULE_CREATE_SUCCESS,
    SCHEDULE_DELETE_FAIL,
    SCHEDULE_DELETE_REQUEST,
    SCHEDULE_DELETE_SUCCESS,
    SCHEDULE_DETAILS_FAIL,
    SCHEDULE_DETAILS_REQUEST,
    SCHEDULE_DETAILS_RESET,
    SCHEDULE_DETAILS_SUCCESS,
    SCHEDULE_LIST_FAIL,
    SCHEDULE_LIST_REQUEST,
    SCHEDULE_LIST_SUCCESS,
    SCHEDULE_UPDATE_FAIL,
    SCHEDULE_UPDATE_REQUEST,
    SCHEDULE_UPDATE_RESET,
    SCHEDULE_UPDATE_SUCCESS,
  } from '../constants/scheduleConstants';
  
  export const scheduleListReducer = (state = { schedules: [], loading: true }, action) => {
    switch (action.type) {
      case SCHEDULE_LIST_REQUEST:
        return { loading: true, schedules: [] };
      case SCHEDULE_LIST_SUCCESS:
        return {
          loading: false,
          schedules: action.payload.data,
        };
      case SCHEDULE_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const scheduleCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case SCHEDULE_CREATE_REQUEST:
        return { loading: true };
      case SCHEDULE_CREATE_SUCCESS:
        return { loading: false, success: true, schedule: action.payload };
      case SCHEDULE_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case SCHEDULE_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const scheduleDetailsReducer = (state = { schedule: {}, loading: true }, action) => {
    switch (action.type) {
      case SCHEDULE_DETAILS_REQUEST:
        return { loading: true, ...state };
      case SCHEDULE_DETAILS_SUCCESS:
        return {
          loading: false,
          schedule: action.payload,
        };
      case SCHEDULE_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      case SCHEDULE_DETAILS_RESET:
        return { loading: true, schedule: {} };
      default:
        return state;
    }
  };
  
  export const scheduleUpdateReducer = (state = { schedule: {} }, action) => {
    switch (action.type) {
      case SCHEDULE_UPDATE_REQUEST:
        return { loading: true };
      case SCHEDULE_UPDATE_SUCCESS:
        return { loading: false, success: true, schedule: action.payload };
      case SCHEDULE_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case SCHEDULE_UPDATE_RESET:
        return { schedule: {} };
      default:
        return state;
    }
  };
  
  export const scheduleDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case SCHEDULE_DELETE_REQUEST:
        return { loading: true };
      case SCHEDULE_DELETE_SUCCESS:
        return { loading: false, success: true };
      case SCHEDULE_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  