import axios from 'axios';

const URL = `${process.env.REACT_APP_API_BASE_URL}`;
const apikey = `${process.env.REACT_APP_API_KEY}`;

// export const getDataUser = (token) => {
//   return axios.get(URL + '/users/', {
//     headers: {
//       authorization: `Bearer ${token}`,
//       apikey: apikey,
//     },
//   });
// };

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

export const updateEmailAPI = (email, token) => {
  console.log(`Emailnya nih =>> ${email}`);
  return axios.patch(
    `${URL}/users/email`,
    { email },
    {
      headers: {
        apikey: apikey,
        authorization: `Bearer ${token}`,
      },
    },
  );
};
