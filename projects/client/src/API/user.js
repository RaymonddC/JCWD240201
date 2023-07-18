import axios from 'axios';

const token = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null;

const URL = `${process.env.REACT_APP_API_BASE_URL}`;
const apikey = `${process.env.REACT_APP_API_KEY}`;

export const getDataUser = (params) => {
  return axios.get(URL + '/users/', {
    headers: {
      authorization: `Bearer ${token}`,
      apikey: apikey,
    },
  });
};

export const updateProfile = (data) => {
  return axios.put(
    URL + '/users/',
    {
      ...data,
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
        apikey: apikey,
      },
    },
  );
};
