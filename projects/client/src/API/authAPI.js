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

export function resetPassword(password, token) {
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

export function keepLogin(token) {
  return axios.get(`${URL}/auth/getUser`, {
    headers: {
      Authorization: `Bearer ${token}`,
      apiKey: APIKey,
    },
  });
}

export function register(data) {
  return axios.post(
    `${URL}/auth/register`,
    {
      ...data,
    },
    {
      headers: {
        apiKey: APIKey,
      },
    },
  );
}

export function checkCredential(data) {
  return axios.post(
    `${URL}/auth/login`,
    {
      ...data,
    },
    {
      headers: {
        apiKey: APIKey,
      },
    },
  );
}

export function sendResetForm(email) {
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

export function changePassword(userId, oldPassword, newPassword) {
  return axios.patch(
    `${URL}/auth/password/${userId}`,
    {
      oldPassword: oldPassword,
      newPassword: newPassword,
    },
    {
      headers: {
        apiKey: APIKey,
      },
    },
  );
}

export function googleLoginAPI(data) {
  return axios.post(
    `${URL}/auth/google-login`,
    {
      ...data,
    },
    {
      headers: {
        apiKey: APIKey,
      },
    },
  );
}

export function sendChangeEmailFormAPI(email) {
  return axios.post(
    `${URL}/auth/sendChangeEmail`,
    { email },
    {
      headers: {
        apiKey: APIKey,
      },
    },
  );
}
