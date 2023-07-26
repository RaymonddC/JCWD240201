import { useEffect, useRef, useState } from 'react';
import NavBar from '../Components/Layout/Navbar';
import {
  getQuestionDetail,
  postAnswer,
  updateAnswer,
} from '../Features/QnA/QnASlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function QuestionDetails() {
  const user = useSelector((state) => state?.user?.user);
  const role = user?.role_id;
  const userId = user?.id;
  const QnAStore = useSelector((state) => state?.QnA);
  const dispatch = useDispatch();
  const params = useParams();
  const date = QnAStore?.questions?.createdAt?.split('T')[0];
  const { id } = params;
  const questionId = Number(id);
  const question = QnAStore?.questions?.question;
  const answer = QnAStore?.questions?.answers?.[0]?.answer;
  const answerId = QnAStore?.questions?.answers?.[0]?.id;
  const answerText = useRef();
  const [disabled, setDisabled] = useState(true);

  // const [question, setQuestion] = useState();
  // const[ answer , setAnswer] = useState();
  console.log(user);

  useEffect(() => {
    dispatch(getQuestionDetail({ id: Number(id) }));
    console.log(answerText?.current?.value);
  }, [dispatch, id, answerText]);
  if (role === 1) {
    return (
      <>
        <div className="card card-compact w-full my-5 bg-base-100 shadow-xl">
          <div className="flex justify-end px-3">
            <div className="label">{date}</div>
          </div>
          <div className="card-body ">
            <article className="prose">
              <h3> Question: </h3>
              <p>{question}</p>
            </article>
          </div>
        </div>
        {answer ? (
          <>
            <div className="w-full">
              <textarea
                ref={answerText}
                className="textarea w-full my-5 textarea-bordered h-24"
                disabled={disabled}
                defaultValue={answer}
              ></textarea>
            </div>
            <div className="flex justify-end">
              {disabled ? (
                <button
                  onClick={() => setDisabled(false)}
                  className=" btn btn-primary"
                >
                  edit
                </button>
              ) : (
                <button
                  onClick={() => {
                    setDisabled(true);
                    if (answerText.current.value !== answer) {
                      dispatch(
                        updateAnswer({
                          id: answerId,
                          answer: answerText.current.value,
                          question_id: questionId,
                          user_id: userId,
                        }),
                      );
                    }
                  }}
                  className=" btn btn-primary"
                >
                  save
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="w-full">
              <textarea
                ref={answerText}
                className="textarea w-full my-5 textarea-bordered h-24"
                placeholder="not yet answered"
                // disabled={disabled}
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() =>
                  dispatch(
                    postAnswer({
                      answer: answerText.current.value,
                      question_id: questionId,
                      user_id: userId,
                    }),
                  )
                }
                className=" btn btn-primary"
              >
                post answer
              </button>
            </div>
          </>
        )}
      </>
    );
  } else {
    return (
      <>
        <NavBar />
        <div className='flex flex-col items-center w-full'>
          <div className="card card-compact max-w-3xl w-full my-5 bg-base-100 shadow-xl">
            <div className="flex justify-end px-3">
              <div className="label">{date}</div>
            </div>
            <div className="card-body ">
              <article className="prose">
                <h3> Question: </h3>
                <p>{question}</p>
              </article>
            </div>
          </div>
          <div className="card card-compact max-w-3xl w-full my-5 bg-base-100 shadow-xl">
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
        </div>
      </>
    );
  }
}
