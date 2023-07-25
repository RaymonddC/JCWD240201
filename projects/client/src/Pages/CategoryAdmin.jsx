import { useEffect, useState } from 'react';
import useDebounce from '../Hooks/useDebounce';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllCategories,
  setSearch,
} from '../Features/Category/CategorySlice';
import CategoryCard from '../Components/Category/CategoryCard';
import CategoryModalForm from '../Components/Category/CategoryModalForm';

export default function CategoryAdmin() {
  const dispatch = useDispatch();
  const [openModalForm, setOpenModalForm] = useState(false);
  const { categories, search } = useSelector((state) => state.categories);
  // const [search, setSearch] = useState();
  const debouncedSearchValue = useDebounce(search, 1000);

  useEffect(() => {
    if (search?.length >= 3) {
      console.log('Ngesearch nih bos');
      dispatch(getAllCategories(search));
    }
    if (!search?.length) {
      console.log('Jalan nih pertama kali');
      dispatch(getAllCategories());
    }
  }, [debouncedSearchValue]);

  return (
    <div>
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
          className="input input-bordered input-success w-full max-w-xs"
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
