import axios from 'axios';

const URL = `${process.env.REACT_APP_API_BASE_URL}`;
const apikey = `${process.env.REACT_APP_API_KEY}`;

export const getTodayRevenueAPI = (token, params) => {
  return axios.get(`${URL}/tx-histories/revenue`, {
    params: { ...params },
    headers: {
      authorization: `Bearer ${token}`,
      apikey: apikey,
    },
  });
};

export const getTodayTransactionAPI = (token, params) => {
  return axios.get(`${URL}/tx-histories/total-transaction`, {
    params: { ...params },
    headers: {
      authorization: `Bearer ${token}`,
      apikey: apikey,
    },
  });
};

export const getTodayUserAPI = (token, params) => {
  return axios.get(`${URL}/tx-histories/total-user`, {
    params: { ...params },
    headers: {
      authorization: `Bearer ${token}`,
      apikey: apikey,
    },
  });
};

export const getAllTransactionStatusTotalAPI = (token, params) => {
  return axios.get(`${URL}/tx-histories/transaction-status-total`, {
    params: { ...params },
    headers: {
      authorization: `Bearer ${token}`,
      apikey: apikey,
    },
  });
};
