import NavBar from '../Components/Layout/Navbar';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLabels, getProducts } from '../Features/Product/ProductSlice';
import ProductCard from '../Components/Products/ProductCard';
import FilterBar from '../Components/Products/FilterBar';
import Footer from '../Components/Layout/Footer';
import useDebounce from '../Hooks/useDebounce';
import Pagination from '../Components/Layout/Pagination';
import { getAllCategories } from '../Features/Category/CategorySlice';

export default function Products() {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const ProductsStore = useSelector((state) => state?.products?.products);
  const totalPages = ProductsStore?.totalPage;
  const limit = 20;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sortType, setSortType] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [category, setCategory] = useState('');
  const productList = ProductsStore?.data?.rows;
  const debouncedSearchValue = useDebounce(search, 1500);
  const CategoryStore = useSelector((state) => state?.categories.categories);
  // console.log(CategoryStore?.data);
  let productMap;
  const categoriesMap = CategoryStore?.data?.map((value, index) => {
    return (
      <div key={`cat${index}`} className="w-full">
        <div
          onClick={() => setCategory(value.category_name)}
          className="btn btn-ghost btn-sm text-left"
        >
          {value.category_name}
        </div>
      </div>
    );
  });
  if (category && !debouncedSearchValue) {
    productMap = productList?.map((value, index) => {
      return (
        <div key={`product${index}`} className="py-3 flex justify-center">
          <ProductCard data={value.product} />
        </div>
      );
    });
  } else {
    productMap = productList?.map((value, index) => {
      return (
        <div key={`product${index}`} className="py-3 flex justify-center">
          <ProductCard data={value} />
        </div>
      );
    });
  }
  useEffect(() => {
    dispatch(getAllCategories());
    if (category && !debouncedSearchValue) {
      dispatch(
        getLabels({
          page,
          limit,
          search: debouncedSearchValue,
          category,
          sortType,
          sortOrder,
        }),
      );
    } else {
      dispatch(
        getProducts({
          page,
          limit,
          search: debouncedSearchValue,
          sortType,
          sortOrder,
        }),
      );
    }
  }, [page, dispatch, debouncedSearchValue, sortType, sortOrder, category]);
  return (
    <>
      <NavBar />
      <FilterBar
        setSearch={setSearch}
        setSortType={setSortType}
        setSortOrder={setSortOrder}
      />
      <div className="flex">
        <div className="hidden w-72 md:block pl-5">
          <article className="prose">
            <h3 className="pb-5">Categories</h3>
          </article>
          <div
            onClick={() => setCategory('')}
            className="btn btn-ghost btn-sm text-left"
          >
            All
          </div>
          {categoriesMap}
        </div>
        <div className="flex w-full justify-center ">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 w-full px-5">
            {productMap}
          </div>
        </div>
      </div>
      <div className="my-5">
        <Pagination setPage={setPage} page={page} totalPages={totalPages} />
      </div>
      <Footer />
    </>
  );
}
