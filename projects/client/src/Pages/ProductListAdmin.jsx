import { useEffect, useState } from 'react';
import ProductCardAdmin from '../Components/Products/ProductCardAdmin';
import { getProducts } from '../Features/Product/ProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import useDebounce from '../Hooks/useDebounce';
import FilterBar from '../Components/Products/FilterBar';

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
      <div key={`productAdmin${index}`} className="py-3 flex w-full justify-center">
        <ProductCardAdmin data={value} />
      </div>
    );
  });
  useEffect(() => {
    dispatch(getProducts({ page, limit: 20, search: debouncedSearchValue }));
  }, [debouncedSearchValue, dispatch, page]);
  return (
    <>
    <div className=' sticky top-5'>
		<FilterBar/>

    </div>
      {productMap}
    </>
  );
}
