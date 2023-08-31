import { useEffect, useRef, useState } from 'react';
import { getAnswers, getQuestionCategory } from '../Features/QnA/QnASlice';
import { useDispatch, useSelector } from 'react-redux';
import QuestionCard from '../Components/QnA/QuestionCard';
import { Navigate, useLocation, useSearchParams } from 'react-router-dom';
import Pagination from '../Components/Layout/Pagination';
import QuestionModal from '../Components/QnA/QuestionModal';
import FilterBar from '../Components/Products/FilterBar';
import useDebounce from '../Hooks/useDebounce';
import QnACardSkl from '../Components/Skeleton/QnACardSkl';
import { getUserQuestionsAPI } from '../API/QnAAPI';
import MenuBarMobile from '../Components/Layout/MenuBarMobile';
import FilterBarDrawer from '../Components/Products/FilterBarDrawer';

export default function QuestionUser() {
  const user = useSelector((state) => state?.user?.user);
  let token = localStorage.getItem('token');
  const user_id = user.id;
  const location = useLocation();
  const pathname = location.pathname;
  const [searchParams, setSearchParams] = useSearchParams();
  let queryParams = {};
  const dispatch = useDispatch();
  const QnAStore = useSelector((state) => state?.QnA);
  const [totalPages, setTotalPages] = useState(null);
  const questionCategories = QnAStore?.categories;
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [questionCategory, setQuestionCategory] = useState(
    searchParams.get('category') || '',
  );
  const [questionList, setQuestioList] = useState(null);
  const debouncedSearchValue = useDebounce(search, 1200);
  const limit = 2;
  const [sortType, setSortType] = useState(searchParams.get('sort-type') || '');
  const [sortOrder, setSortOrder] = useState(
    searchParams.get('sort-order') || '',
  );

  const questionCategoriesMap = questionCategories?.data?.map(
    (value, index) => {
      return (
        <div key={`cat${index}`} className='flex items-center'>
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
  const getUserQuestionList = async (data) => {
    try {
      // if (user_id) {
      const response = await getUserQuestionsAPI(data);
      setTotalPages(response.data.totalPage);
      setQuestioList(response.data.data.rows);
      // }
    } catch (error) {}
  };

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
    getUserQuestionList({
      user_id,
      page,
      limit,
      question_category_id: questionCategory,
      search: debouncedSearchValue,
      sortOrder,
      sortType,
    });
    // dispatch(
    //   getAnswers({
    //     page,
    //     limit,
    //     question_category_id: questionCategory,
    //     search: debouncedSearchValue,
    //     sortOrder,
    //     sortType,
    //   }),
    // );
    dispatch(getQuestionCategory());
  }, [page, questionCategory, debouncedSearchValue, sortType, sortOrder]);
  useEffect(() => {
    setPage(1);
  }, [questionCategory]);
  if (!token) return <Navigate to={'/login'} />;

  return (
    <div className="w-full max-w-[736px] lg:max-w-[776px] lg:p-4 rounded-lg">
      <div className="flex justify-between mb-4">
        <div className="flex lg:h-[48px] items-center">
          <MenuBarMobile />
          <h3 className="text-[20px] lg:text-[23px] font-bold">
            Your Questions
          </h3>
        </div>
      </div>
      <div className="pb-5 w-full flex">
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

      <div className="">
        <div className=" flex w-full justify-center">
          <div className="w-full max-w-3xl">
            <div>
              {/* <QuestionModal /> */}
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
                  {questionList ? (
                    !questionList.length ? (
                      <div className="flex py-10 w-full justify-center">
                        <article className="prose">
                          <h4>--- No questions found ---</h4>
                        </article>
                      </div>
                    ) : (
                      questionList.map((value, index) => {
                        return (
                          <QuestionCard
                            data={value}
                            pathname={pathname}
                            key={`question${index}`}
                          />
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
    </div>
  );
}
