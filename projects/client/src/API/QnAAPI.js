import axios from 'axios';
const URL = `${process.env.REACT_APP_API_BASE_URL}`;
const APIKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImFjY2Vzcy1jb25maXJtIiwiaWF0IjoxNjg5MTQ4NTc3fQ.sjK_BgX2XeIcj2qdk16kGOY8kLp1QnaPrQ9z1r_Q5B4';

export function createQuestionAPI(data) {
  console.log('datapost', data);
  return axios.post(
    `${URL}/qna/questions`,
    { question: data.question, id: data.id },
    {
      headers: {
        Authorization: 'Bearer ' + data.token,
        apiKey: APIKey,
      },
    },
  );
}

export function getQuestionsAPI(data) {
  // console.log(URL);
  return axios.get(
    `${URL}/qna/questions`,
    { params: { page: data.page, limit: data.limit } },
    { headers: { apiKey: APIKey } },
  );
}
