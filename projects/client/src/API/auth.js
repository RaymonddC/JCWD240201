import axios from 'axios';

const URL = process.env.REACT_APP_API_BASE_URL;
const APIKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImFjY2Vzcy1jb25maXJtIiwiaWF0IjoxNjg5MTQ4NTc3fQ.sjK_BgX2XeIcj2qdk16kGOY8kLp1QnaPrQ9z1r_Q5B4';

export function userVerification(token) {
  console.log(URL);
  return axios.post(
    `${URL}auth/verifyEmail`,
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
  console.log(URL);
  return axios.post(
    `${URL}auth/sendVerify`,
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
