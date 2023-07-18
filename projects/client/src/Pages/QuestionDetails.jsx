import { useEffect, useRef, useState } from 'react';
import NavBar from '../Components/Layout/Navbar';
import { getAnswers, getQuestions, submitQuestion } from '../Features/QnA/QnASlice';
import { useDispatch, useSelector } from 'react-redux';
import QuestionCard from '../Components/QnA/QuestionCard';


export default function QuestionDetails(props) {
  // const date = props?.data?.createdAt.split('T')[0]
  const QnAStore = useSelector((state) => state?.QnA);
	const dispatch = useDispatch();
	// const questions = QnAStore
	useEffect(() => {
		// dispatch(getAnswers({ page, limit: 2 }));
    console.log(`QnAStore ${QnAStore.data}`);
  }, []);
  return (
    <>
      <div className="card card-compact w-full my-5 bg-base-100 shadow-xl hover:cursor-pointer" onClick={console.log('a')}>
        <div className="flex justify-end px-3">
          {/* <div className="label">{date}</div> */}
        </div>
        <div className="card-body ">
          <article className="prose">
            {/* <h4 className=" truncate">{props?.data.question.question}</h4> */}
          </article>
        </div>
      </div>
    </>
  );
}
