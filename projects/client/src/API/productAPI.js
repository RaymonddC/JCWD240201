import axios from 'axios';
const URL = `${process.env.REACT_APP_API_BASE_URL}`;
const apiKey = `${process.env.REACT_APP_API_KEY}`;
const token = localStorage.getItem('token')

export function getAllProductsAPI(data) {
  return axios.get(
    `${URL}/products?page=${data.page}&limit=${data.limit}&search=${data.search}&category=${data.category}`,
  );
}

export function getProductDetails(id) {
  return axios.get(`${URL}/products/${id}`);
}

export function addProduct(values) {
  return axios.post(
    `${URL}/products/`,
    {
      product_images: values.image.product,
      data: JSON.stringify(values.product),
      productCategories: values.category.id
    },
    {
      headers: {
        apiKey: apiKey,
        authorization: `Bearer ${token}`
      },
    },
  );
}
