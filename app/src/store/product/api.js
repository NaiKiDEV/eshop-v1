/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import httpClient from '../../core/httpClient';

export const getUserApi = () => {
  return httpClient.get(`users/current`);
};

export const getAllProductsApi = () => {
  return httpClient.get(`products/all`);
};

export const loginUserApi = (userData) => {
  return httpClient.post(`users/login`, userData);
};
