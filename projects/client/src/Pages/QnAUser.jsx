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
import FilterBarDrawer from '../Components/Products/FilterBarDrawer';

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
  const [sortType, setSortType] = useState(searchParams.get('sort-type') || '');
  const [sortOrder, setSortOrder] = useState(
    searchParams.get('sort-order') || '',
  );

  const questionCategoriesMap = questionCategories?.data?.map(
    (value, index) => {
      return (
        <div key={`cat${index}`} className="flex items-center">
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
    if (sortType) {
      queryParams['sort-type'] = sortType;
    }
    if (sortOrder) {
      queryParams['sort-order'] = sortOrder;
    }
    setSearchParams(queryParams);
    dispatch(
      getAnswers({
        page,
        limit,
        question_category_id: questionCategory,
        search: debouncedSearchValue,
        sortOrder,
        sortType,
      }),
    );
    dispatch(getQuestionCategory());
  }, [page, questionCategory, debouncedSearchValue, sortType, sortOrder]);
  useEffect(() => {
    setPage(1);
  }, [questionCategory]);

  return (
    <>
      {/* <FilterBar
      setSearch={setSearch}
      setSortType={setSortType}
      setSortOrder={setSortOrder}
      option={[
        {
          text: 'Oldest to latest',
          sortType: 'updatedAt',
          sortOrder: 'ASC',
        },
        {
          text: 'Latest to oldest',
          sortType: 'updatedAt',
          sortOrder: 'DESC',
        },
      ]}
    /> */}

      <div className="px-5">
        <div className="px-5 flex w-full justify-center">
          <div className="w-full max-w-3xl">
            <div className='pb-5'>
              <FilterBarDrawer
                value={search}
                setSearch={setSearch}
                setSortType={setSortType}
                setSortOrder={setSortOrder}
                option={[
                  {
                    text: 'Oldest to latest',
                    sortType: 'updatedAt',
                    sortOrder: 'ASC',
                  },
                  {
                    text: 'Latest to oldest',
                    sortType: 'updatedAt',
                    sortOrder: 'DESC',
                  },
                ]}
              />
            </div>
            <article className="prose">
              <h2>Dicussions</h2>
            </article>
            <div>
              <QuestionModal />
              <article className="prose">
                <h2>Categories:</h2>
              </article>
              <div className="flex justify-center items-center">
                <div className=" p-3 flex items-center overflow-auto">
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
              </div>
              <div>
                <div>
                  {QnAStore?.answers?.data?.rows ? (
                    !QnAStore?.answers?.data?.rows.length ? (
                      <div className="flex py-10 w-full justify-center">
                        <article className="prose">
                          <h4>--- No search result ---</h4>
                        </article>
                      </div>
                    ) : (
                      QnAStore?.answers?.data?.rows.map((value, index) => {
                        return (
                          <QuestionCard data={value} key={`question${index}`} />
                        );
                      })
                    )
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
