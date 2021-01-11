/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import httpClient from '../../core/httpClient';

export const getAllProductsApi = () => {
  return httpClient.get(`products/all`);
};

export const addProductApi = (productData) => {
  return httpClient.post(`orders/create`, productData);
};
