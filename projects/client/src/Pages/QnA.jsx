import { useEffect, useRef } from 'react';
import NavBar from '../Components/Layout/Navbar';
import { getQuestions, submitQuestion } from '../Features/QnA/QnASlice';
import { useDispatch, useSelector } from 'react-redux';
import QuestionCard from '../Components/QnA/QuestionCard';

export default function QnA() {
  const user = useSelector((state) => state?.user?.user);
  const question = useRef();
  const dispatch = useDispatch();
  const QnAStore = useSelector((state) => state?.QnA);

  useEffect(() => {
    dispatch(getQuestions());
    console.log('got questions', QnA);
  }, []);

  return (
    <>
      <NavBar />
      <div className="px-5">
        <div className="px-5 flex w-full justify-center">
          <div className="w-full max-w-3xl">
            <div>
              <div className="form-control py-5">
                <article className="prose">
                  <h2 className="label-text">Ask a question</h2>
                </article>
                <textarea
                  ref={question}
                  className="textarea my-5 textarea-bordered h-24"
                  placeholder="Type your question here..."
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    dispatch(
                      submitQuestion({
                        question: question.current.value,
                        user,
                      }),
                    );
                  }}
                  className="btn btn-accent"
                >
                  SUBMIT
                </button>
              </div>
              <div>
          <article className="prose">
            <h2>QnA</h2>
          </article>
          <div>
            {QnAStore?.questions?.data.map((value, index) => {
              // console.log(value)
              return <QuestionCard data={value} key={`question${index}`} />;
            })}
          </div>
        </div>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
}
