import axios from 'axios';

const URL = `${process.env.REACT_APP_API_BASE_URL}`;
const apikey = `${process.env.REACT_APP_API_KEY}`;

export const getCourierService = (data, token) => {
  return axios.post(
    `${URL}/rajaongkir/`,
    { ...data },
    {
      headers: {
        authorization: `Bearer ${token}`,
        apikey: apikey,
      },
    },
  );
};

export const checkoutAPI = (values, token) => {
  try {
    return axios.post(
      `${URL}/transactions/`,
      { ...values },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};
