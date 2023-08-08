import { useEffect, useState } from 'react';
import ProductCardAdmin from '../Components/Products/ProductCardAdmin';
import { getProducts } from '../Features/Product/ProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import useDebounce from '../Hooks/useDebounce';
import FilterBar from '../Components/Products/FilterBar';
import Pagination from '../Components/Layout/Pagination';
import { useNavigate } from 'react-router-dom';
import UpdateStockModal from '../Components/Stocks/UpdateStockModal';

export default function StockPageAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [productId, setProductId] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
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
    dispatch(getProducts({ page, limit: 9, search: debouncedSearchValue }));
    setIsUpdated(false);
  }, [debouncedSearchValue, dispatch, page, isUpdated]);
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
