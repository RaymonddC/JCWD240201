import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useDebounce from '../../Hooks/useDebounce';
import { getProducts } from '../../Features/Product/ProductSlice';
import Select from 'react-dropdown-select';

export default function InputDropdown(props) {
  const dispatch = useDispatch();
  const limit = 5;
  const ProductsStore = useSelector((state) => state?.products?.products);
  const [search, setSearch] = useState('');
  const debouncedSearchValue = useDebounce(search, 500);
  const inputSearch = useRef();

  useEffect(() => {
    dispatch(getProducts({ page: 1, limit, search: debouncedSearchValue }));
  }, [debouncedSearchValue]);

  return (
    <div className="w-full">
      <div className="max-w-[300px]">
        <Select
          options={ProductsStore?.data?.rows}
          ref={inputSearch}
          valueField="id"
          labelField="name"
          searchBy="name"
          searchFn={(value) => setSearch(value.state.search)}
          placeholder="Select Product"
          dropdownHeight="200px"
          onChange={(values) => console.log(values)}
        />
      </div>
      <div>
        <input
          type="number"
          placeholder="Type here"
          className="input input-bordered input-primary w-full max-w-xs"
        />
        <input
          type="number"
          placeholder="Type here"
          className="input input-bordered input-primary w-full max-w-xs"
        />
      </div>
    </div>
  );
}
