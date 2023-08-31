import axios from 'axios';
const URL = `${process.env.REACT_APP_API_BASE_URL}`;
const APIKey = `${process.env.REACT_APP_API_KEY}`;

export function getAllProductsAPI(data) {
  return axios.get(`${URL}/products`, {
    params: { ...data },
    headers: { apikey: APIKey },
  });
}

export function getProductDetailsAPI(data) {
  return axios.get(`${URL}/products/${data.id}`, {
    headers: { apikey: APIKey },
  });
}

export function getAllLabelsAPI(data) {
  return axios.get(`${URL}/labels`, {
    params: {
      page: data?.page,
      limit: data?.limit,
      search: data?.search,
      category: data?.category,
      sortType: data?.sortType,
      sortOrder: data?.sortOrder,
    },
    headers: { apikey: APIKey },
  });
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
        apiKey: APIKey,
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
      apiKey: APIKey,
      authorization: `Bearer ${token}`,
    },
  });
}

export function getProductType() {
  const token = localStorage.getItem('token');
  return axios.get(`${URL}/products/types/admin`, {
    headers: {
      apiKey: APIKey,
      authorization: `Bearer ${token}`,
    },
  });
}

export function deleteProduct(productId) {
  const token = localStorage.getItem('token');
  return axios.delete(`${URL}/products/${productId}`, {
    headers: {
      apiKey: APIKey,
      authorization: `Bearer ${token}`,
    },
  });
}

export function updateProduct(values, productId) {
  const token = localStorage.getItem('token');
  return axios.put(
    `${URL}/products/${productId}`,
    {
      product_images: values?.image?.product,
      data: JSON.stringify(values.product),
      categoryId: JSON.stringify(values.category.category_id[0]),
    },
    {
      headers: {
        apiKey: APIKey,
        authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
}
