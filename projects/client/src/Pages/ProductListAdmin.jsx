import { useEffect, useState } from 'react';
import ProductCardAdmin from '../Components/Products/ProductCardAdmin';
import { getProducts } from '../Features/Product/ProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import useDebounce from '../Hooks/useDebounce';
import Pagination from '../Components/Layout/Pagination';
import DeleteModal from '../Components/Products/DeleteModal';
import { useSearchParams } from 'react-router-dom';
import DetailProductAdmin from '../Components/DetailProductModal/DetailProductModal';
import FilterBarDrawer from '../Components/Products/FilterBarDrawer';
import ProductCardAdminSkl from '../Components/Skeleton/ProductCardAdminSkl';

export default function ProductListAdmin() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  let queryParams = {};
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [sortType, setSortType] = useState(searchParams.get('sortType') || '');
  const [sortOrder, setSortOrder] = useState(
    searchParams.get('sortOrder') || '',
  );
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [productId, setProductId] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const ProductsStore = useSelector((state) => state?.products?.products);
  const totalPages = ProductsStore?.totalPage;
  const productList = ProductsStore?.data?.rows;
  const debouncedSearchValue = useDebounce(search);
  const limit = 9;
  const productMap = productList?.map((value, index) => {
    return (
      <div key={`product${index}`} className="py-1 flex w-full justify-center">
        <ProductCardAdmin
          data={value}
          setProductId={setProductId}
          detailProduct={true}
        />
      </div>
    );
  });
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

    setSearchParams(queryParams);
    dispatch(
      getProducts({
        page,
        limit,
        search: debouncedSearchValue,
        sortOrder,
        sortType,
      }),
    );
    setIsDeleted(false);
  }, [
    debouncedSearchValue,
    dispatch,
    page,
    isDeleted,
    sortType,
    sortOrder,
    category,
  ]);
  return (
    <>
      <article className="prose">
        <h2>Products</h2>
      </article>
      <div className="relative">
        <div className="sticky flex w-full justify-center top-3 mb-3 ">
          <div className=" w-full max-w-4xl">
            <FilterBarDrawer
              value={search}
              add={true}
              setSearch={setSearch}
              setSortType={setSortType}
              setSortOrder={setSortOrder}
              sortBy={true}
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
        </div>
        <div>
          {productMap ? productMap : <ProductCardAdminSkl limit={limit} />}
        </div>
        {productList?.length ? (
          <div className="py-5">
            <Pagination setPage={setPage} page={page} totalPages={totalPages} />
          </div>
        ) : (
          <div className="flex w-full justify-center py-5">
            --- No products found ---
          </div>
        )}
      </div>
      <DeleteModal productId={productId} isDeleted={setIsDeleted} />
      <DetailProductAdmin productId={productId} />
    </>
  );
}
