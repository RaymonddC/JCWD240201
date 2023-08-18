import { useEffect, useState } from 'react';
import ProductCardAdmin from '../Components/Products/ProductCardAdmin';
import { getProducts } from '../Features/Product/ProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import useDebounce from '../Hooks/useDebounce';
import FilterBar from '../Components/Products/FilterBar';
import Pagination from '../Components/Layout/Pagination';
import { useNavigate, useSearchParams } from 'react-router-dom';
import UpdateStockModal from '../Components/Stocks/UpdateStockModal';

export default function StockPageAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  let queryParams = {};
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [productId, setProductId] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [sortType, setSortType] = useState(searchParams.get('sortType') || '');
  const [sortOrder, setSortOrder] = useState(
    searchParams.get('sortOrder') || '',
  );
  const ProductsStore = useSelector((state) => state?.products?.products);
  const totalPages = ProductsStore?.totalPage;
  const productList = ProductsStore?.data?.rows;
  const debouncedSearchValue = useDebounce(search);
  const productMap = productList?.map((value, index) => {
    return (
      <div key={`product${index}`} className="py-1 flex w-full justify-center">
        <ProductCardAdmin
          data={value}
          setProductId={setProductId}
          stockPage={true}
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
        limit: 9,
        search: debouncedSearchValue,
        sortOrder,
        sortType,
      }),
    );
    setIsUpdated(false);
  }, [debouncedSearchValue, dispatch, page, sortType, sortOrder, isUpdated]);
  return (
    <>
      <div className="relative">
        <div className="sticky top-3 mb-3">
          <FilterBar
            setSearch={setSearch}
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
            setSortType={setSortType}
            setSortOrder={setSortOrder}
            sortBy={true}
          />
        </div>
        <div>{productMap}</div>
        <div className="py-5">
          <Pagination setPage={setPage} page={page} totalPages={totalPages} />
        </div>
      </div>
      <UpdateStockModal productId={productId} isUpdated={setIsUpdated} />
    </>
  );
}
