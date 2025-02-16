import axios from 'axios';
const URL = `${process.env.REACT_APP_API_BASE_URL}`;
const apikey = `${process.env.REACT_APP_API_KEY}`;


export const updateProfile = (data, token) => {
  return axios.put(
    `${URL}/users/`,
    { ...data },
    {
      headers: {
        authorization: `Bearer ${token}`,
        apikey: apikey,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};

export const updateEmailAPI = (email, token, token_email) => {
  return axios.patch(
    `${URL}/users/email`,
    { token_email: `Bearer ${token_email}`,  email },
    {
      headers: {
        apikey: apikey,
        authorization: `Bearer ${token}`,
      },
    },
  );
};

export function sendChangeEmailFormAPI(email, token) {
  return axios.post(
    `${URL}/users/sendChangeEmail`,
    { email },
    {
      headers: {
        apiKey: apikey,
        authorization: `Bearer ${token}`,
      },
    },
  );
}
