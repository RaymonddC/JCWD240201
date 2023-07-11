import axios from 'axios';

const token = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null;

export const getDataUser = (params) => {
  return axios.get(process.env.REACT_APP_API_URL + '/', {
    params: {
      ...params,
    },
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
