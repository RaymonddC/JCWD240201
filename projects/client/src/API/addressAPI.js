import axios from 'axios';

const URL = `${process.env.REACT_APP_API_BASE_URL}`;
const apikey = `${process.env.REACT_APP_API_KEY}`;

export const getUserAddress = (token) => {
  return axios.get(`${URL}/addresses`, {
    headers: {
      authorization: `Bearer ${token}`,
      apikey: apikey,
    },
  });
};

export const createAddress = (data, token) => {
  return axios.post(
    `${URL}/addresses`,
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

export const updateAddress = (id, data, token) => {
  return axios.put(
    `${URL}/addresses/${id}`,
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

export const updateIsMain = (id, token) => {
  return axios.patch(
    `${URL}/addresses/${id}`,
    {
      is_main: true,
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
        apikey: apikey,
      },
    },
  );
};

export const updateIsSelected = (id, token) => {
  return axios.patch(
    URL + `/addresses/selected/${id}`,
    {
      is_selected: true,
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
        apikey: apikey,
      },
    },
  );
};

export const deleteAddress = (id, token) => {
  return axios.delete(URL + `/addresses/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
      apikey: apikey,
    },
  });
};

export const getProvince = (token) => {
  return axios.get(`${URL}/rajaongkir/province`, {
    headers: {
      authorization: `Bearer ${token}`,
      apikey: apikey,
    },
  });
};

export const getCity = (province_id, token) => {
  return axios.get(`${URL}/rajaongkir/city?province_id=${province_id}`, {
    headers: {
      authorization: `Bearer ${token}`,
      apikey: apikey,
    },
  });
};

export const getCityUser = (city_id, token) => {
  return axios.get(`${URL}/rajaongkir/city?city_id=${city_id}`, {
    headers: {
      authorization: `Bearer ${token}`,
      apikey: apikey,
    },
  });
};
