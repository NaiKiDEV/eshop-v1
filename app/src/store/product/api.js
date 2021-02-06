/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import httpClient from '../../core/httpClient';

export const getAllProductsApi = () => {
  return httpClient.get(`products/all`);
};

export const addProductApi = (productData) => {
  return httpClient.post(`products/create`, productData);
};
export const removeProductApi = (productId) => {
  return httpClient.post(`products/delete`, { _id: productId });
};
export const updateProductApi = (productData) => {
  return httpClient.post(`products/update`, productData);
};
