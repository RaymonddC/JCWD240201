import axios from 'axios';

const URL = `${process.env.REACT_APP_API_BASE_URL}`;
const APIKey = `${process.env.REACT_APP_API_KEY}`;

export function getUserTransactions(token, values) {
  return axios.get(`${URL}/transactions`, {
    params: {
      searchStatusId: values?.selectedStatusId,
      search: values?.debouncedSearchValue,
      startDate: values?.date?.startDate,
      endDate: values?.date?.endDate,
      page: values?.page || 1,
      limitPage: values?.limitPage,
      sortType: values?.sortType,
      sortOrder: values?.sortOrder,
    },
    headers: {
      Authorization: `Bearer ${token}`,
      apiKey: APIKey,
    },
  });
}

export function getTransaction(token, id) {
  return axios.get(`${URL}/transactions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export function deleteTransaction(token, values) {
  return axios.delete(`${URL}/transactions/${values.id}`, {
    data: { ...values },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function updateUserTransactionHistoryAPI(token, data) {
  return axios.post(
    `${URL}/tx-histories`,
    { ...data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        apiKey: APIKey,
      },
    },
  );
}

export function uploadPaymentAPI(token, data) {
  return axios.post(
    `${URL}/transactions/upload`,
    { ...data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        apiKey: APIKey,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
}

export function handleMidtransPaymentAPI(token, values) {
  return axios.post(
    `${URL}/transactions/midtrans-payment`,
    { ...values },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}
