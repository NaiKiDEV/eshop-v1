import {
  CLEAR_MESSAGE_END,
  REGISTER_USER_END,
  LOGIN_USER_END,
  LOGOUT_USER_END
} from './actionTypes';

const initialState = {
  userData: null,
  isLoggedIn: false,
  message: "",
  requestcode: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // case LOGIN_END: {
    //   return {
    //     ...state,
    //     isLoggedIn: true
    //   }
    // }
    case LOGIN_USER_END: {
      return {
        ...state,
        userData: action.payload.user,
        isLoggedIn: action.payload.user ? true : false,
        requestcode: action.payload.error ? 0 : 1,
        message: action.payload.message
      }
    }
    case LOGOUT_USER_END: {
      return {
        ...state,
        userData: null,
        isLoggedIn: false,
        requestcode: 99,
        message: "Logged out!"
      }
    }
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
export default reducer;