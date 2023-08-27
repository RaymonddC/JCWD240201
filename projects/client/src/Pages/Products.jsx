import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLabels, getProducts } from '../Features/Product/ProductSlice';
import ProductCard from '../Components/Products/ProductCard';
import FilterBar from '../Components/Products/FilterBar';
import useDebounce from '../Hooks/useDebounce';
import Pagination from '../Components/Layout/Pagination';
import { getAllCategories } from '../Features/Category/CategorySlice';
import { useSearchParams } from 'react-router-dom';
import ProductListSkl from '../Components/Skeleton/ProductListSkl';
import FilterBarDrawer from '../Components/Products/FilterBarDrawer';

export default function Products() {
  const dispatch = useDispatch();
  const ProductsStore = useSelector((state) => state?.products?.products);
  const totalPages = ProductsStore?.totalPage;
  const limit = 18;
  const [searchParams, setSearchParams] = useSearchParams();
  let queryParams = {};
  // console.log('<<<<',searchParams.get('page'))
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [sortType, setSortType] = useState(searchParams.get('sort-type') || '');
  const [sortOrder, setSortOrder] = useState(
    searchParams.get('sort-order') || '',
  );
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const productList = ProductsStore?.data?.rows;
  const debouncedSearchValue = useDebounce(search, 1200);
  const CategoryStore = useSelector((state) => state?.categories?.categories);
  const [minPrice, setMinPrice] = useState(
    searchParams.get('min-price') || '0',
  );
  const [maxPrice, setMaxPrice] = useState(
    searchParams.get('max-price') || '1000000',
  );
  const debouncedMinPrice = useDebounce(minPrice, 1200, 1);
  console.log(
    '🚀 ~ file: Products.jsx:38 ~ Products ~ debouncedMinPrice:',
    debouncedMinPrice,
  );
  const debouncedMaxPrice = useDebounce(maxPrice, 1200, 1);
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
  const getCat = async () => {
    await dispatch(getAllCategories());
  };
  const getProductsAsync = async () => {
    await dispatch(
      getProducts({
        page,
        limit,
        search: debouncedSearchValue,
        sortType,
        sortOrder,
        minPrice: debouncedMinPrice,
        maxPrice: debouncedMaxPrice,
      }),
    );
  };
  const getLabelsAsync = async () => {
    await dispatch(
      getLabels({
        page,
        limit,
        search: debouncedSearchValue,
        category,
        sortType,
        sortOrder,
      }),
    );
  };
  useEffect(() => {
    setPage(1);
  }, [debouncedSearchValue, sortType, sortOrder, category]);
  useEffect(() => {
    getCat();
  }, []);
  useEffect(() => {
    if (page) {
      queryParams['page'] = page;
    }
    if (debouncedSearchValue) {
      queryParams['search'] = debouncedSearchValue;
    }
    if (sortType) {
      queryParams['sort-type'] = sortType;
    }
    if (sortOrder) {
      queryParams['sort-order'] = sortOrder;
    }
    if (category) {
      queryParams['category'] = category;
    }
    setSearchParams(queryParams);
    if (debouncedSearchValue) {
      getProductsAsync();
      setCategory('');
    } else if (category) {
      getLabelsAsync();
    } else {
      getProductsAsync();
    }
  }, [
    page,
    debouncedSearchValue,
    sortType,
    sortOrder,
    category,
    debouncedMaxPrice,
    debouncedMinPrice,
  ]);
  return (
    <>
      <div className=" flex sticky top-3 mb-3 z-10 justify-center">
        {/* <FilterBar
          value={search}
          setSearch={setSearch}
          setSortType={setSortType}
          setSortOrder={setSortOrder}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          sortBy={true}
          priceRange={true}
          option={[
            { text: 'Name A to Z', sortType: 'name', sortOrder: 'ASC' },
            { text: 'Name Z to A', sortType: 'name', sortOrder: 'DESC' },
            {
              text: 'Price low to high',
              sortType: 'price',
              sortOrder: 'ASC',
            },
            {
              text: 'Price high to low',
              sortType: 'price',
              sortOrder: 'DESC',
            },
          ]}
        /> */}

        <FilterBarDrawer
          value={search}
          setSearch={setSearch}
          setSortType={setSortType}
          setSortOrder={setSortOrder}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          minPrice={minPrice}
          maxPrice={maxPrice}
          sortBy={true}
          priceRange={true}
          option={[
            { text: 'Name A to Z', sortType: 'name', sortOrder: 'ASC' },
            { text: 'Name Z to A', sortType: 'name', sortOrder: 'DESC' },
            {
              text: 'Price low to high',
              sortType: 'price',
              sortOrder: 'ASC',
            },
            {
              text: 'Price high to low',
              sortType: 'price',
              sortOrder: 'DESC',
            },
          ]}
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
            {!productMap?.length ? (
              <div className="flex py-10 w-full justify-center">
                <article className="prose">
                  <h4>--- No search result ---</h4>
                </article>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
                {productMap ? (
                  <>{productMap}</>
                ) : (
                  <ProductListSkl limit={limit} />
                )}
              </div>
            )}
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
    </>
  );
}
