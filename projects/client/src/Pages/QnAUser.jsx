import { useEffect, useRef, useState } from 'react';
import NavBar from '../Components/Layout/Navbar';
import { getQuestions, submitQuestion } from '../Features/QnA/QnASlice';
import { useDispatch, useSelector } from 'react-redux';
import QuestionCard from '../Components/QnA/QuestionCard';

export default function QnAUSer() {
  const user = useSelector((state) => state?.user?.user);
  const disabled = user?false:true
  const placeholder = user?'Type your question here...': 'Please login to ask a question'
  console.log(user)
  const question = useRef();
  const dispatch = useDispatch();
  const QnAStore = useSelector((state) => state?.QnA);
  console.log('QnAStore', QnAStore.questions?.data?.rows);
  const totalPages = QnAStore?.questions?.totalPage;
  const [page, setPage] = useState(1);
  const next = () => {
    const nextPage = page >= totalPages ? totalPages : (page + 1);
    console.log(nextPage);
    setPage(nextPage);
  };
  const prev = () => {
    const prevPage = page <= 1 ? 1 : (page - 1);
    console.log(prevPage)
    setPage(prevPage);
  };

  useEffect(() => {
    dispatch(getQuestions({ page, limit: 2 }));
  }, [page]);

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
                  placeholder={placeholder}
                  disabled={disabled}
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
                  {QnAStore?.questions?.data?.rows.map((value, index) => {
                    // console.log(value)
                    return (
                      <QuestionCard data={value} key={`question${index}`} />
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="join w-64 grid grid-cols-2">
                <button
                  onClick={() => prev()}
                  className="join-item btn btn-outline"
                >
                  {'<< Previous'}
                </button>
                <button
                  onClick={() => next()}
                  className="join-item btn btn-outline"
                >
                  {'Next >>'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
