import {
  ADD_PRODUCT_END,
  GET_ALL_PRODUCTS_END,
  ADD_PRODUCT
} from './actionTypes';

const initialState = {
  products: [],
  productcode: null,
  productmessage: ""
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
    case ADD_PRODUCT: {
      return {
        ...state,
        productcode: null,
        productmessage: ""
      }
    }
    case ADD_PRODUCT_END: {
      return {
        ...state,
        productcode: action.payload.error ? 0 : 1,
        productmessage: action.payload.message
      }
    }
    default: {
      return state;
    }
  }
};
