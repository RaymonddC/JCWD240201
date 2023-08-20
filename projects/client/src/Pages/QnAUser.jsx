import { useEffect, useRef, useState } from 'react';
import { getAnswers, getQuestionCategory } from '../Features/QnA/QnASlice';
import { useDispatch, useSelector } from 'react-redux';
import QuestionCard from '../Components/QnA/QuestionCard';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../Components/Layout/Pagination';
import QuestionModal from '../Components/QnA/QuestionModal';
import FilterBar from '../Components/Products/FilterBar';
import useDebounce from '../Hooks/useDebounce';
import QnACardSkl from '../Components/Skeleton/QnACardSkl';

export default function QnAUser() {
  const user = useSelector((state) => state?.user?.user);
  const [searchParams, setSearchParams] = useSearchParams();
  let queryParams = {};
  const dispatch = useDispatch();
  const QnAStore = useSelector((state) => state?.QnA);
  const totalPages = QnAStore?.answers?.totalPage;
  const questionCategories = QnAStore?.categories;
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [questionCategory, setQuestionCategory] = useState(
    searchParams.get('category') || '',
  );
  const debouncedSearchValue = useDebounce(search, 1200);
  const limit = 2;

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
    if (debouncedSearchValue) {
      queryParams['search'] = debouncedSearchValue;
    }
    setSearchParams(queryParams);
    dispatch(
      getAnswers({
        page,
        limit,
        question_category_id: questionCategory,
        search: debouncedSearchValue,
      }),
    );
    dispatch(getQuestionCategory());
  }, [page, questionCategory, debouncedSearchValue]);
  useEffect(() => {
    setPage(1);
  }, [questionCategory]);

  return (
    <>
      <FilterBar setSearch={setSearch} />

      <div className="px-5">
        <div className="px-5 flex w-full justify-center">
          <div className="w-full max-w-3xl">
            <article className="prose">
              <h2>Dicussions</h2>
            </article>
            <div>
              <QuestionModal />
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
                  {QnAStore?.answers?.data?.rows ? (
                    QnAStore?.answers?.data?.rows.map((value, index) => {
                      return (
                        <QuestionCard data={value} key={`question${index}`} />
                      );
                    })
                  ) : (
                    <QnACardSkl limit={limit} />
                  )}
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
