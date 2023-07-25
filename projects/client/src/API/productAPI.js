import axios from 'axios';
const URL = `${process.env.REACT_APP_API_BASE_URL}`;
const apiKey = `${process.env.REACT_APP_API_KEY}`;

export function getAllProductsAPI(data) {
  return axios.get(
    `${URL}/products?page=${data.page}&limit=${data.limit}&search=${data.search}&category=${data.category}`,
  );
}

export function getProductDetails(id) {
  return axios.get(`${URL}/products/${id}`);
}

export function addProduct(values) {
  const token = localStorage.getItem('token');
  return axios.post(
    `${URL}/products/`,
    {
      product_images: values.image.product,
      data: JSON.stringify(values.product),
      productCategories: JSON.stringify(values.category.category_id),
    },
    {
      headers: {
        apiKey: apiKey,
        authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
}

export function getPackagingType() {
  const token = localStorage.getItem('token');
  return axios.get(`${URL}/products/packaging/types`, {
    headers: {
      apiKey: apiKey,
      authorization: `Bearer ${token}`,
    },
  });
}

export function getProductType() {
  const token = localStorage.getItem('token');
  return axios.get(`${URL}/products/types/admin`, {
    headers: {
      apiKey: apiKey,
      authorization: `Bearer ${token}`,
    },
  });
}
export function deleteProduct(productId) {
  const token = localStorage.getItem('token');
  return axios.delete(
    `${URL}/products/:${productId}`,
    {},
    {
      headers: {
        apiKey: apiKey,
        authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
}
