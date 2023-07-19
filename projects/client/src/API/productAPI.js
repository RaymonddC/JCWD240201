import axios from 'axios';
const URL = `${process.env.REACT_APP_API_BASE_URL}`;

export function getAllProducts(data) {
  return axios.get(
    `${URL}/products?page=${data.page}&limit=${data.limit}&search=${data.search}&category=${data.category}`,
  );
}
