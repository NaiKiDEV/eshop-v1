import {
  GET_ALL_PRODUCTS_END
} from './actionTypes';

const initialState = {
  products: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    // case LOGIN_END: {
    //   return {
    //     ...state,
    //     isLoggedIn: true
    //   }
    // }
    case GET_ALL_PRODUCTS_END: {
      return {
        ...state,
        products: action.payload
      }
    }
    default: {
      return state;
    }
  }
};
