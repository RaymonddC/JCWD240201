import { useEffect, useState } from 'react';
import ProductCardAdmin from '../Components/Products/ProductCardAdmin';
import { getProducts } from '../Features/Product/ProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import useDebounce from '../Hooks/useDebounce';
import FilterBar from '../Components/Products/FilterBar';
import Pagination from '../Components/Layout/Pagination';

export default function ProductListAdmin() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const ProductsStore = useSelector((state) => state?.products?.products);
  const totalPages = ProductsStore?.totalPage;
  const productList = ProductsStore?.data?.rows;
  const debouncedSearchValue = useDebounce(search);
  const productMap = productList?.map((value, index) => {
    return (
      <div key={`product${index}`} className="py-1 flex w-full justify-center">
        <ProductCardAdmin data={value} />
      </div>
    );
  });
  useEffect(() => {
    dispatch(getProducts({ page, limit: 9, search: debouncedSearchValue }));
  }, [debouncedSearchValue, dispatch, page]);
  return (
    <>
      <div className="sticky top-3 mb-3">
        <FilterBar setSearch={setSearch} />
      </div>
      <div>{productMap}</div>
      <div className="py-5">
        <Pagination setPage={setPage} page={page} totalPages={totalPages} />
      </div>
    </>
  );
}
