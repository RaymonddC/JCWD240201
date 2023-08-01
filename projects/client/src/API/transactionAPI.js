import axios from 'axios';

const URL = `${process.env.REACT_APP_API_BASE_URL}`;

export function getUserTransactions(token) {
  return axios.get(`${URL}/transactions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
