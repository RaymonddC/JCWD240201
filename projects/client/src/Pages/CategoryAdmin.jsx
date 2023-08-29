import { useEffect, useState } from 'react';
import useDebounce from '../Hooks/useDebounce';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllCategories,
  setSearch,
} from '../Features/Category/CategorySlice';
import CategoryCard from '../Components/Category/CategoryCard';
import CategoryModalForm from '../Components/Category/CategoryModalForm';
import { useSearchParams } from 'react-router-dom';

export default function CategoryAdmin() {
  const dispatch = useDispatch();
  const [openModalForm, setOpenModalForm] = useState(false);
  const [queryCategory, setQueryCategory] = useSearchParams();
  const { categories, search } = useSelector((state) => state.categories);
  const debouncedSearchValue = useDebounce(search, 1000);

  useEffect(() => {
    if (!search?.length) {
      dispatch(getAllCategories());
      setQueryCategory(``);
    } else if (search?.length >= 3) {
      dispatch(getAllCategories(search));
      setQueryCategory(`search=${search}`);
    }
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
      <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search Category"
          className="input input-bordered w-full md:w-96 mx-3"
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
        <button
          className="btn btn-primary"
          onClick={() => setOpenModalForm(true)}
        >
          ADD CATEGORY
        </button>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:place-items-center place-items-start">
        {categories?.map((value) => {
          return <CategoryCard key={value.id} data={value} />;
        })}
      </div>
    </div>
  );
}
