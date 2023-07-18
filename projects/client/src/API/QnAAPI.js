import axios from 'axios';
const URL = `${process.env.REACT_APP_API_BASE_URL}`;
const APIKey = `${process.env.REACT_APP_API_KEY}`;

export function createQuestionAPI(data) {
  return axios.post(
    `${URL}/dicussions/questions`,
    { question: data.question, id: data.id },
    { headers: { Authorization: 'Bearer ' + data.token, apikey: APIKey } },
  );
}

export function getQuestionsAPI(data) {
  return axios.get(`${URL}/dicussions/questions`, {
    params: { page: data.page, limit: data.limit },
    headers: { Authorization: 'Bearer ' + data.token, apikey: APIKey },
  });
}
export function getAnswersAPI(data) {
  return axios.get(`${URL}/dicussions/answers`, {
    params: { page: data.page, limit: data.limit },
    headers: { Authorization: 'Bearer ' + data.token, apikey: APIKey },
  });
}
