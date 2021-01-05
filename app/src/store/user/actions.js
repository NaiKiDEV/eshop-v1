import {
  GET_USER,
  GET_USER_END,
  REGISTER_USER,
  REGISTER_USER_END,
  CLEAR_MESSAGE,
  CLEAR_MESSAGE_END
} from './actionTypes';

export const getUser = () => ({
  type: GET_USER,
});
export const getUserEnd = (userData) => ({
  type: GET_USER_END,
  payload: userData,
});
export const registerUser = (userData) => ({
  type: REGISTER_USER,
  payload: userData
});
export const registerUserEnd = (response) => ({
  type: REGISTER_USER_END,
  payload: response,
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});
export const clearMessageEnd = () => ({
  type: CLEAR_MESSAGE_END,
});