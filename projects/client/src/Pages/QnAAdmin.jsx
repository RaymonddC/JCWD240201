import { useEffect, useState } from 'react';
import { getQuestionCategory, getQuestions } from '../Features/QnA/QnASlice';
import { useDispatch, useSelector } from 'react-redux';
import QuestionCardAdmin from '../Components/QnA/QuestionCardAdmin';
import Pagination from '../Components/Layout/Pagination';
import FilterBar from '../Components/Products/FilterBar';
import { useSearchParams } from 'react-router-dom';
import useDebounce from '../Hooks/useDebounce';

export default function QnAAdmin() {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const QnAStore = useSelector((state) => state?.QnA);
  const questionList = QnAStore?.questions?.data?.rows;
  const questionMap = questionList?.map((value, index) => {
    return <QuestionCardAdmin data={value} key={`question${index}`} />;
  });
  const totalPages = QnAStore?.questions?.totalPage;
  const questionCategories = QnAStore?.categories;
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [questionCategory, setQuestionCategory] = useState(
    searchParams.get('category') || '',
  );
  const debouncedSearchValue = useDebounce(search, 1200);
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
    console.log(questionCategory)
    dispatch(getQuestionCategory());
    dispatch(
      getQuestions({
        page,
        limit: 2,
        question_category_id: questionCategory,
        search: debouncedSearchValue,
      }),
    );
  }, [page, dispatch, questionCategory]);

  return (
    <>
      <div className="px-5">
        <div className="px-5 flex w-full justify-center">
          <div className="w-full max-w-3xl">
            <div>
              <article className="prose">
                <h2>QnA</h2>
              </article>
              <FilterBar />
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
              <div>{questionMap}</div>
            </div>
            <Pagination setPage={setPage} page={page} totalPages={totalPages} />
            {/* <div className="flex justify-center">
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
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
