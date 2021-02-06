import {
  GET_ALL_PRODUCTS,
  GET_ALL_PRODUCTS_END,
  ADD_PRODUCT,
  ADD_PRODUCT_END,
  ADD_TO_CART,
  ADD_TO_CART_END,
  REMOVE_FROM_CART,
  REMOVE_FROM_CART_END,
  UPDATE_CART,
  UPDATE_CART_END,
  REMOVE_PRODUCT,
  REMOVE_PRODUCT_END,
  CLEAR_MESSAGE,
  CLEAR_MESSAGE_END,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_END
} from './actionTypes';

export const getAllProducts = () => ({
  type: GET_ALL_PRODUCTS,
});
export const getAllProductsEnd = (products) => ({
  type: GET_ALL_PRODUCTS_END,
  payload: products,
});
export const addProduct = (productData) => ({
  type: ADD_PRODUCT,
  payload: productData
});
export const addProductEnd = (response) => ({
  type: ADD_PRODUCT_END,
  payload: response,
});
export const updateProduct = (productData) => ({
  type: UPDATE_PRODUCT,
  payload: productData
});
export const updateProductEnd = (response) => ({
  type: UPDATE_PRODUCT_END,
  payload: response,
});

export const removeProduct = (productId) => ({
  type: REMOVE_PRODUCT,
  payload: productId
});
export const removeProductEnd = (response) => ({
  type: REMOVE_PRODUCT_END,
  payload: response
});

export const addToCart = (productData) => ({
  type: ADD_TO_CART,
  payload: productData
});
export const addToCartEnd = (productData) => ({
  type: ADD_TO_CART_END,
  payload: productData
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId
});
export const removeFromCartEnd = (productId) => ({
  type: REMOVE_FROM_CART_END,
  payload: productId
});
export const updateCart = (cartItem) => ({
  type: UPDATE_CART,
  payload: cartItem
});
export const updateCartEnd = (cartItem) => ({
  type: UPDATE_CART_END,
  payload: cartItem
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});
export const clearMessageEnd = () => ({
  type: CLEAR_MESSAGE_END,
});
