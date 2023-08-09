import axios from 'axios';

const URL = `${process.env.REACT_APP_API_BASE_URL}`;
const APIKey = `${process.env.REACT_APP_API_KEY}`;

export function getUserTransactions(token, values) {
  console.log(values);
  return axios.get(`${URL}/transactions`, {
    params: {
      searchStatusId: values.selectedStatusId,
      search: values.debouncedSearchValue,
      startDate: values.date.startDate,
      endDate: values.date.endDate,
    },
    headers: {
      Authorization: `Bearer ${token}`,
      apiKey: APIKey,
    },
  });
}

export function updateUserTransactionHistoryAPI(token, data) {
  return axios.post(
    `${URL}/tx-histories`,
    {
      transaction_id: data.transaction_id,
      transaction_status_id: data.transaction_status_id,
    },
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
