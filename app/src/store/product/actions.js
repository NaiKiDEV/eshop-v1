import {
  GET_ALL_PRODUCTS,
  GET_ALL_PRODUCTS_END,
  ADD_PRODUCT,
  ADD_PRODUCT_END
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
