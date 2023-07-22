import axios from 'axios';
const URL = `${process.env.REACT_APP_API_BASE_URL}`;

export function getAllProductsAPI(data) {
  return axios.get(
    `${URL}/products?page=${data.page}&limit=${data.limit}&search=${data.search}&category=${data.category}`,
  );
}

export function getProductDetails(id) {
  return axios.get(`${URL}/products/${id}`);
}
