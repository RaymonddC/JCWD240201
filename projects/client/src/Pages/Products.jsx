import NavBar from '../Components/Layout/Navbar';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../Features/Product/ProductSlice';
import ProductCard from '../Components/Products/ProductCard';
import FilterBar from '../Components/Products/FilterBar';
import Footer from '../Components/Layout/Footer';
import useDebounce from '../Hooks/useDebounce';
import Pagination from '../Components/Layout/Pagination';

export default function Products() {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const ProductsStore = useSelector((state) => state?.products?.products);
  const totalPages = ProductsStore?.totalPage;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const productList = ProductsStore?.data?.rows;
  const debouncedSearchValue = useDebounce(search, 1500);
  const productMap = productList?.map((value, index) => {
    return (
      <div key={`product${index}`} className="py-3 flex justify-center">
        <ProductCard data={value} />
      </div>
    );
  });
  useEffect(() => {
    dispatch(getProducts({ page, limit: 20, search: debouncedSearchValue }));
  }, [page, dispatch, debouncedSearchValue]);
  return (
    <>
      <NavBar />
      <FilterBar setSearch={setSearch} />
      <div className="flex w-full justify-center ">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 px-6 w-[1200px]">
          {productMap}
        </div>
      </div>
      <div className="my-5">
        <Pagination setPage={setPage} page={page} totalPages={totalPages} />
      </div>
      <Footer />
    </>
  );
}
