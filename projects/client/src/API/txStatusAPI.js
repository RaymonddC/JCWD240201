import axios from 'axios';
const URL = `${process.env.REACT_APP_API_BASE_URL}`;

export function getAllTxStatusAPI() {
  try {
    return axios.get(`${URL}/tx-status`);
  } catch (error) {
    throw error;
  }
}
