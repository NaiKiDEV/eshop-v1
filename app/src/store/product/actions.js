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
