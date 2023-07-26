import axios from 'axios';
const URL = `${process.env.REACT_APP_API_BASE_URL}`;
const APIKey = `${process.env.REACT_APP_API_KEY}`;

export function createQuestionAPI(data) {
  return axios.post(
    `${URL}/discussions/questions`,
    { question: data.question, id: data.id },
    { headers: { Authorization: 'Bearer ' + data.token, apikey: APIKey } },
  );
}

export function getQuestionsAPI(data) {
  return axios.get(`${URL}/discussions/questions`, {
    params: { page: data.page, limit: data.limit },
    headers: { Authorization: 'Bearer ' + data.token, apikey: APIKey },
  });
}
export function getQuestionDetailsAPI(data) {
  return axios.get(`${URL}/discussions/questions/${data.id}`, {
    headers: { Authorization: 'Bearer ' + data.token, apikey: APIKey },
  });
}
export function getAnswersAPI(data) {
  return axios.get(`${URL}/discussions/answers`, {
    params: { page: data.page, limit: data.limit },
    headers: { Authorization: 'Bearer ' + data.token, apikey: APIKey },
  });
}
export function postAnswerAPI(data) {
  return axios.post(
    `${URL}/discussions/answers`,
    {
      answer: data.answer,
      question_id: data.question_id,
      user_id: data.user_id,
    },
    { headers: { Authorization: 'Bearer ' + data.token, apikey: APIKey } },
  );
}
export function updateAnswerAPI(data) {
  return axios.put(
    `${URL}/discussions/answers`,
    {
      id: data.id,
      answer: data.answer,
      question_id: data.question_id,
      user_id: data.user_id,
    },
    { headers: { Authorization: 'Bearer ' + data.token, apikey: APIKey } },
  );
}
