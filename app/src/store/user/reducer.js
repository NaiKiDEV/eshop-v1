import {
  CLEAR_MESSAGE_END,
  GET_USER_END,
  REGISTER_USER_END,
} from './actionTypes';

const initialState = {
  userData: null,
  isLoggedIn: false,
  message: "",
  requestCode: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    // case LOGIN_END: {
    //   return {
    //     ...state,
    //     isLoggedIn: true
    //   }
    // }
    case REGISTER_USER_END: {
      return {
        ...state,
        message: action.payload.message,
        requestcode: action.payload.error ? 0 : 1
      }
    }
    case CLEAR_MESSAGE_END: {
      return {
        ...state,
        message: "",
        requestcode: null
      }
    }
    default: {
      return state;
    }
  }
};
