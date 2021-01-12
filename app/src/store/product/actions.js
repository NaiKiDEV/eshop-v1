import {
  GET_ALL_PRODUCTS,
  GET_ALL_PRODUCTS_END,
  ADD_PRODUCT,
  ADD_PRODUCT_END,
  ADD_TO_CART,
  ADD_TO_CART_END,
  REMOVE_FROM_CART,
  REMOVE_FROM_CART_END
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
