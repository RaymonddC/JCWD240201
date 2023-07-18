import { useEffect, useRef, useState } from 'react';
import NavBar from '../Components/Layout/Navbar';
import {
  getAnswers,
  getQuestionDetail,
  getQuestions,
  submitQuestion,
} from '../Features/QnA/QnASlice';
import { useDispatch, useSelector } from 'react-redux';
import QuestionCard from '../Components/QnA/QuestionCard';
import { useParams } from 'react-router-dom';

export default function QuestionDetails() {
  // const date = props?.data?.createdAt.split('T')[0]
  const params = useParams();
  const { id } = params;
  const QnAStore = useSelector((state) => state?.QnA);
  const dispatch = useDispatch();
  // const [question, setQuestion] = useState();
  // const[ answer , setAnswer] = useState();
  const question = QnAStore?.questions?.question;
  const answer = QnAStore?.questions?.answers?.[0]?.answer;

  useEffect(() => {
    dispatch(getQuestionDetail({ id: Number(id) }));
    console.log(`QnAStore ${QnAStore?.questions?.answers?.[0]?.answer}`);
    // setQuestion(QnAStore?.questions?.question);
    // setAnswer(QnAStore?.questions?.answers[0]?.answer)
  }, []);
  return (
    <>
      <NavBar />
      <div className="card card-compact w-full my-5 bg-base-100 shadow-xl">
        <div className="flex justify-end px-3">
          {/* <div className="label">{date}</div> */}
        </div>
        <div className="card-body ">
          <article className="prose">
            <h3> Question: </h3>
            <p>{question}</p>
          </article>
        </div>
      </div>
      <div className="card card-compact w-full my-5 bg-base-100 shadow-xl">
        <div className="flex justify-end px-3">
          {/* <div className="label">{date}</div> */}
        </div>
        <div className="card-body ">
          <article className="prose">
            <h3> Answer:</h3>
            <p>{answer}</p>
          </article>
        </div>
      </div>
    </>
  );
}
