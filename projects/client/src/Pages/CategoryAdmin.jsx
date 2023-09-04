import { useEffect, useState } from 'react';
import useDebounce from '../Hooks/useDebounce';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../Features/Category/CategorySlice';
import CategoryCard from '../Components/Category/CategoryCard';
import CategoryModalForm from '../Components/Category/CategoryModalForm';
import { useSearchParams } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import CategoryCardSkl from '../Components/Skeleton/CategoryCardSkl';

export default function CategoryAdmin() {
  const dispatch = useDispatch();
  const [openModalForm, setOpenModalForm] = useState(false);
  let queryParams = {};
  const [queryCategory, setQueryCategory] = useSearchParams();
  const [search, setSearch] = useState(queryCategory.get('search') || '');
  const { categories, loadCategory } = useSelector((state) => state.categories);
  const debouncedSearchValue = useDebounce(search, 1000);

  useEffect(() => {
    if (search) queryParams['search'] = search;
    setQueryCategory(queryParams);
    if (!search?.length) dispatch(getAllCategories());
    if (search?.length > 2) dispatch(getAllCategories(debouncedSearchValue));
  }, [debouncedSearchValue]);

  useEffect(() => {
    if (!search?.length && queryCategory.get('search')?.length >= 3) {
      dispatch(getAllCategories(queryCategory.get('search')));
      dispatch(setSearch(queryCategory.get('search')));
    }
  }, []);

  return (
    <div>
      <article className="prose">
        <h2>Category</h2>
      </article>
      {openModalForm ? (
        <CategoryModalForm
          isOpen={openModalForm}
          closeModal={() => setOpenModalForm(false)}
        />
      ) : null}
      <div className="relative mt-2">
        <div className="sticky flex w-full justify-center top-3 mb-8 z-10">
          <input
            type="text"
            placeholder="Search Category"
            className="input input-bordered w-full md:w-96 mx-3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="self-center ml-3">
            <div
              className="flex justify-center items-center bg-primary w-10 h-10 lg:w-12 lg:h-12 rounded-full hover:cursor-pointer"
              onClick={() => setOpenModalForm(true)}
            >
              <MdAdd size={40} color="white" />
            </div>
          </div>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:place-items-center place-items-start">
          {loadCategory ? (
            <CategoryCardSkl limit={12} />
          ) : (
            categories?.map((value) => {
              return <CategoryCard key={value.id} data={value} />;
            })
          )}
        </div>
      </div>
    </div>
  );
}
