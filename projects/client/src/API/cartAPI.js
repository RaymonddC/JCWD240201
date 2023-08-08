import axios from 'axios';

const URL = process.env.REACT_APP_API_BASE_URL;
const APIKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImFjY2Vzcy1jb25maXJtIiwiaWF0IjoxNjg5MTQ4NTc3fQ.sjK_BgX2XeIcj2qdk16kGOY8kLp1QnaPrQ9z1r_Q5B4';

export function getUserCarts(token) {
  return axios.get(`${URL}/carts`, {
    headers: {
      Authorization: `Bearer ${token}`,
      apiKey: APIKey,
    },
  });
}

export function postCart(token, data) {
  return axios.post(
    `${URL}/carts`,
    { ...data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        apiKey: APIKey,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
}

export function deleteCart(token, id) {
  return axios.delete(`${URL}/carts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      apiKey: APIKey,
    },
  });
}

export function updateCart(token, id, data) {
  return axios.put(
    `${URL}/carts/${id}`,
    { ...data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        apiKey: APIKey,
      },
    },
  );
}

export function getAllPrescriptionsCartsAPI(token, params) {
  return axios.get(`${URL}/carts/prescription`, {
    params: {
      search_user: params?.search_user,
      confirmation: params?.confirmation,
      sort: params?.sort,
      page: params?.page,
      limit: params?.limit,
    },
    headers: {
      Authorization: `Bearer ${token}`,
      apiKey: APIKey,
    },
  });
}

export function getPrescriptionCartAPI(token, id) {
  return axios.get(`${URL}/carts/prescription/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      apiKey: APIKey,
    },
  });
}

export function updateConfirmationPrescriptionCartAPI(
  token,
  id,
  confirmation,
  notes,
) {
  return axios.patch(
    `${URL}/carts/${id}`,
    { confirmation, notes: confirmation === false ? notes : null },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        apiKey: APIKey,
      },
    },
  );
}
