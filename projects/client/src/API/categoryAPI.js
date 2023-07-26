import axios from 'axios';
const URL = `${process.env.REACT_APP_API_BASE_URL}`;

export function getAllCategoriesAPI(data) {
  return axios.get(
    `${URL}/categories`,
  );
}
