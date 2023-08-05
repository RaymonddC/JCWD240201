import { useEffect, useRef, useState } from 'react';
import NavBar from '../Components/Layout/Navbar';
import {
  getAnswers,
  getQuestionCategory,
  submitQuestion,
} from '../Features/QnA/QnASlice';
import { useDispatch, useSelector } from 'react-redux';
import QuestionCard from '../Components/QnA/QuestionCard';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../Components/Layout/Pagination';
import QuestionModal from '../Components/QnA/QuestionModal';

export default function QnAUser() {
  const user = useSelector((state) => state?.user?.user);
  const disabled = Object.keys(user).length ? false : true;
  const placeholder = disabled
    ? 'Please login to ask a question'
    : 'Type your question here...';
  const [searchParams, setSearchParams] = useSearchParams();
  let queryParams = {};
  const question = useRef();
  const title = useRef();
  // let option = 0;
  const dispatch = useDispatch();
  const QnAStore = useSelector((state) => state?.QnA);
  const totalPages = QnAStore?.answers?.totalPage;
  const questionCategories = QnAStore?.categories;
  const [page, setPage] = useState(searchParams.get('page') || 1);
  const [questionCategory, setQuestionCategory] = useState(
    searchParams.get('category') || '',
  );

  const selectOptions = questionCategories?.data?.map((value, index) => {
    return (
      <option key={`opt${index}`} value={value.id}>
        {value.name}
      </option>
    );
  });
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

  const onSubmit = () => {
    const select = document.getElementById('category');
    const option = select.options[select.selectedIndex].value;
    console.log(option);

    dispatch(
      submitQuestion({
        title: title.current.value,
        question: question.current.value,
        question_category_id: Number(option),
        user,
      }),
    );
    title.current.value = '';
    question.current.value = '';
    select.selectedIndex = 0;
  };
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
  }, [page, questionCategory]);
  useEffect(() => {
    setPage(1);
  }, [questionCategory]);

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
              <QuestionModal></QuestionModal>
              <div className="form-control py-5">
                <article className="prose">
                  <h2 className="label-text">Ask a question</h2>
                </article>
                <div className="flex justify-between">
                  <input
                    type="text"
                    ref={title}
                    placeholder="Insert title here"
                    className="input input-bordered w-full max-w-xs"
                    disabled={disabled}
                  />
                  <select
                    name="category"
                    id="category"
                    className="select select-bordered "
                    disabled={disabled}
                  >
                    <option value={0} >Please select a category</option>
                    {selectOptions}
                  </select>
                </div>
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
                    onSubmit();
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
                  onClick={() => {
                    setQuestionCategory('');
                  }}
                  className="btn btn-outline btn-accent btn-xs mx-3"
                >
                  all
                </div>
                {questionCategoriesMap}
              </div>
              <div>
                <div>
                  {QnAStore?.answers?.data?.rows.map((value, index) => {
                    return (
                      <QuestionCard data={value} key={`question${index}`} />
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="my-5">
              <Pagination
                setPage={setPage}
                page={page}
                totalPages={totalPages}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
