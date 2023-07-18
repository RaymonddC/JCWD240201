import axios from 'axios';

const URL = process.env.REACT_APP_API_BASE_URL;
const APIKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImFjY2Vzcy1jb25maXJtIiwiaWF0IjoxNjg5MTQ4NTc3fQ.sjK_BgX2XeIcj2qdk16kGOY8kLp1QnaPrQ9z1r_Q5B4';

export function userVerification(token) {
  return axios.post(
    `${URL}/auth/verifyEmail`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        apiKey: APIKey,
      },
    },
  );
}

export function sendVerificationEmail(email) {
  return axios.post(
    `${URL}/auth/sendVerify`,
    {
      email: email,
    },
    {
      headers: {
        apiKey: APIKey,
      },
    },
  );
}

export function postAPI(path, data, headerData) {
  return axios.post(
    `${process.env.REACT_APP_API_BASE_URL}${path}`,
    {
      ...data,
    },
    {
      headers: {
        apiKey: APIKey,
        ...headerData,
      },
    },
  );
}

export function resetPassword(password, token){
  return axios.patch(
    `${URL}/auth/resetPassword`,
    {
      newPassword: password,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        apiKey: APIKey,
      },
    },
  );
}

export function getAPI(path, headerData) {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}${path}`, {
    headers: {
      apiKey: APIKey,
      ...headerData,
    },
  });
}

export function sendResetForm(email){
  return axios.post(
    `${URL}/auth/sendReset`,
    {
      email: email,
    },
    {
      headers: {
        apiKey: APIKey,
      },
    },
  );
}
