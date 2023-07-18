import axios from 'axios';
const URL = `${process.env.REACT_APP_API_BASE_URL}`;
const APIKey = `${process.env.REACT_APP_API_KEY}`;

export function createQuestionAPI(data) {
  console.log('datapost', data);
  return axios.post(
    `${URL}/qna/questions`,
    { question: data.question, id: data.id },
    { headers: { Authorization: 'Bearer ' + data.token, apikey: APIKey } },
  );
}

export function getQuestionsAPI(data) {
  console.log('apikey', APIKey);
  return axios.get(`${URL}/qna/questions`, {
    params: { page: data.page, limit: data.limit },
    headers: { Authorization: 'Bearer ' + data.token, apikey: APIKey },
  });
}
