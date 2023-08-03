import { useEffect, useRef, useState } from 'react';
import NavBar from '../Components/Layout/Navbar';
import {
  getAnswers,
  getQuestionCategory,
  questionCategory,
  submitQuestion,
} from '../Features/QnA/QnASlice';
import { useDispatch, useSelector } from 'react-redux';
import QuestionCard from '../Components/QnA/QuestionCard';
import { useSearchParams } from 'react-router-dom';

export default function QnAUser() {
  const user = useSelector((state) => state?.user?.user);
  const disabled = Object.keys(user).length ? false : true;
  const placeholder = disabled
    ? 'Please login to ask a question'
    : 'Type your question here...';
  const [searchParams, setSearchParams] = useSearchParams();
  let queryParams = {};
  const question = useRef();
  const dispatch = useDispatch();
  const QnAStore = useSelector((state) => state?.QnA);
  const totalPages = QnAStore?.answers?.totalPage;
  const questionCategories = QnAStore?.categories;
  const [page, setPage] = useState(searchParams.get('page') || 1);
  const [questionCategory, setQuestionCategory] = useState(
    searchParams.get('category') || '',
  );
  console.log(QnAStore?.answers?.data);
  const next = () => {
    const nextPage = page >= totalPages ? totalPages : page + 1;
    setPage(nextPage);
  };
  const prev = () => {
    const prevPage = page <= 1 ? 1 : page - 1;
    setPage(prevPage);
  };
  const questionCategoriesMap = questionCategories?.data?.map(
    (value, index) => {
      return (
        <div key={`cat${index}`}>
          <div
            onClick={() => setQuestionCategory(value.id)}
            className="btn btn-outline btn-accent btn-xs mx-3"
          >
            {value.name}
          </div>
        </div>
      );
    },
  );
  useEffect(() => {
    if (page) {
      queryParams['page'] = page;
    }
    if (questionCategory) {
      queryParams['category'] = questionCategory;
    }
    setSearchParams(queryParams);
    dispatch(
      getAnswers({ page, limit: 2, question_category_id: questionCategory }),
    );
    dispatch(getQuestionCategory());
  }, [dispatch, page, questionCategory]);

  return (
    <>
      <NavBar />
      <div className="px-5">
        <div className="px-5 flex w-full justify-center">
          <div className="w-full max-w-3xl">
            <article className="prose">
              <h2>QnA</h2>
            </article>
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
                  className={`btn ${disabled ? 'btn-disabled' : 'btn-accent'}`}
                >
                  SUBMIT
                </button>
              </div>
              <article className="prose">
                <h2>Categories:</h2>
              </article>
              <div className="flex justify-center items-center">
                <div
                  onClick={() => setQuestionCategory('')}
                  className="btn btn-outline btn-accent btn-xs mx-3"
                >
                  all
                </div>
                {questionCategoriesMap}
              </div>
              <div>
                <div>
                  {QnAStore?.answers?.data?.rows.map((value, index) => {
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
