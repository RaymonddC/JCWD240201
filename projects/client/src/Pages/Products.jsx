import NavBar from '../Components/Layout/Navbar';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLabels, getProducts } from '../Features/Product/ProductSlice';
import ProductCard from '../Components/Products/ProductCard';
import FilterBar from '../Components/Products/FilterBar';
import Footer from '../Components/Layout/Footer';
import useDebounce from '../Hooks/useDebounce';
import Pagination from '../Components/Layout/Pagination';
import { getAllCategories } from '../Features/Category/CategorySlice';
import { useSearchParams } from 'react-router-dom';

export default function Products() {
  const dispatch = useDispatch();
  const ProductsStore = useSelector((state) => state?.products?.products);
  const totalPages = ProductsStore?.totalPage;
  const limit = 20;
  const [searchParams, setSearchParams] = useSearchParams();
  let queryParams = {};
  const [page, setPage] = useState(searchParams.get('page') || 1);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [sortType, setSortType] = useState(searchParams.get('sortType') || '');
  const [sortOrder, setSortOrder] = useState(
    searchParams.get('sortOrder') || '',
  );
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const productList = ProductsStore?.data?.rows;
  const debouncedSearchValue = useDebounce(search, 1200);
  const CategoryStore = useSelector((state) => state?.categories?.categories);
  // console.log(productList);
  let productMap;
  const categoriesMap = CategoryStore?.map((value, index) => {
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
  if (category) {
    productMap = productList?.map((value, index) => {
      return (
        <div key={`product${index}`} className="py-3 mx-5 flex justify-center">
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
  }, []);
  useEffect(() => {
    if (page) {
      queryParams['page'] = page;
    }
    if (debouncedSearchValue) {
      queryParams['search'] = debouncedSearchValue;
    }
    if (sortType) {
      queryParams['sortType'] = sortType;
    }
    if (sortOrder) {
      queryParams['sortOrder'] = sortOrder;
    }
    if (category) {
      queryParams['category'] = category;
    }
    setSearchParams(queryParams);
    if (category) {
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
  }, [page, debouncedSearchValue, sortType, sortOrder, category]);
  return (
    <>
      <NavBar />
      <div className="sticky top-3 mb-3 z-10">
        <FilterBar
          setSearch={setSearch}
          setSortType={setSortType}
          setSortOrder={setSortOrder}
          sortBy={true}
        />
      </div>
      <div className="flex ">
        <div className="hidden w-52 md:block pl-3">
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
        <div className="flex justify-center w-full">
          <div className="flex flex-col max-w-fit justify-center ">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
              {productMap}
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
      <Footer />
    </>
  );
}
