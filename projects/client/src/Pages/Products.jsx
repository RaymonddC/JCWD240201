import NavBar from '../Components/Layout/Navbar';
import { useEffect, useRef, useState } from 'react';
import { getQuestions } from '../Features/QnA/QnASlice';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../Features/Product/ProductSlice';
import ProductCard from '../Components/Products/ProductCard';
import FilterBar from '../Components/Products/FilterBar';
import Footer from '../Components/Layout/Footer';
import useDebounce from '../Hooks/useDebounce';

export default function Products() {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const ProductsStore = useSelector((state) => state?.products?.products);
  const totalPages = ProductsStore?.totalPage;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const productList = ProductsStore?.data?.rows;
  const debouncedSearchValue = useDebounce(search,1500);
  const setSearchValue = (data) => {
    setSearch(data);
  };
  const next = () => {
    const nextPage = page >= totalPages ? totalPages : page + 1;
    setPage(nextPage);
  };
  const prev = () => {
    const prevPage = page <= 1 ? 1 : page - 1;
    setPage(prevPage);
  };
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
      <div className="flex my-5 justify-center">
        <div className="join w-64 grid grid-cols-2">
          <button onClick={() => prev()} className="join-item btn btn-outline">
            {'<< Previous'}
          </button>
          <button onClick={() => next()} className="join-item btn btn-outline">
            {'Next >>'}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
