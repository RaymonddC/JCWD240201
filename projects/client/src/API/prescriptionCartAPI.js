import axios from 'axios';
const URL = `${process.env.REACT_APP_API_BASE_URL}`;
const apikey = `${process.env.REACT_APP_API_KEY}`;

export const getPrescriptionCartProductListAPI = (token, cart_id) => {
  return axios.get(`${URL}/prescriptioncarts?cart_id=${cart_id}`, {
    headers: {
      authorization: `Bearer ${token}`,
      apikey: apikey,
    },
  });
};

export const createPrescriptionCartProductAPI = (token, data) => {
  return axios.post(
    `${URL}/prescriptioncarts`,
    { ...data },
    {
      headers: {
        authorization: `Bearer ${token}`,
        apikey: apikey,
      },
    },
  );
};

export const updatePrescriptionCartProductAPI = (token, id, data) => {
  return axios.put(
    `${URL}/prescriptioncarts/${id}`,
    { ...data },
    {
      headers: {
        authorization: `Bearer ${token}`,
        apikey: apikey,
      },
    },
  );
};

export const deletePrescriptionCartProductAPI = (token, id) => {
  return axios.delete(`${URL}/prescriptioncarts/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
      apikey: apikey,
    },
  });
};
