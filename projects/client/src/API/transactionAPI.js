import axios from 'axios';

const URL = `${process.env.REACT_APP_API_BASE_URL}`;

export function getUserTransactions(token, values) {
  console.log(values);
  return axios.get(`${URL}/transactions`, {
    params: {
      searchStatusId: values?.selectedStatusId,
      search: values.debouncedSearchValue,
      startDate: values.date?.startDate,
      endDate: values.date?.endDate,
      page: values.page,
      limitPage: values.limitPage,
      sortType: values.sortType,
      sortOrder: values.sortOrder,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
