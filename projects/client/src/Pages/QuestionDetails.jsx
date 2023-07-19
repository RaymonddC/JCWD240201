import { useEffect, useRef, useState } from 'react';
import NavBar from '../Components/Layout/Navbar';
import { getQuestionDetail } from '../Features/QnA/QnASlice';
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
  const question = QnAStore?.questions?.question;
  const answer = QnAStore?.questions?.answers?.[0]?.answer;
  const answerText = useRef();
  const [newAnswer, setNewAnswer] = useState('');
  const [disabled, setDisabled] = useState(true);

  

  // const [question, setQuestion] = useState();
  // const[ answer , setAnswer] = useState();
  // console.log(user);

  useEffect(() => {
    dispatch(getQuestionDetail({ id: Number(id) }));
    console.log(answerText?.current?.value);
  }, [dispatch, id, answerText]);
  if (role === 2) {
    return (
      <>
        <NavBar />
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
  } else if (role === 1) {
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
          <div className="card card-compact w-full my-5 bg-base-100 shadow-xl">
            <div className="flex justify-end px-3">
              {/* <div className="label">{date}</div> */}
            </div>
            <div className="card-body ">
              <div>
                <article className="prose">
                  <h3> Answer:</h3>
                  <p>{answer}</p>
                </article>
              </div>
            </div>
          </div>
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
                // onClick={() => setDisabled(false)}
                className=" btn btn-primary"
              >
                post answer
              </button>
            </div>
          </>
        )}
      </>
    );
  }
}
