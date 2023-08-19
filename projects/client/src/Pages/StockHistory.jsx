import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import InputUserDate from '../Components/Profile/Input/InputUserDate';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SelectProduct from '../Components/Promotion/Input/SelectProduct';
import { useDispatch, useSelector } from 'react-redux';
import useDebounce from '../Hooks/useDebounce';
import { getProducts } from '../Features/Product/ProductSlice';
import SelectSortOrder from '../Components/Report/StockHistory/SelectSortOrder';
import { getStockHistoryAPI } from '../API/reportAPI';
import Pagination from '../Components/Layout/Pagination';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { validateFilterStockHistory } from '../Helper/stockHelper';

export default function StockHistory() {
  const dispatch = useDispatch();
  const ProductsStore = useSelector((state) => state?.products?.products);
  const limit = 4;
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  let queryParams = {};
  const [page, setPage] = useState(0);
  const productList = ProductsStore?.data?.rows;
  const debouncedSearchValue = useDebounce(search, 1200);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openProduct, setOpenProduct] = useState(false);
  let productMap;
  const [stockHistory, setStockHistory] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const allProducts = {
    name: 'All products',
    id: '',
  };
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 7);
  const endDate = new Date();

  const onSelectedProduct = (value) => {
    setSelectedProduct(value.name);
    formik.setFieldValue('product_id', value.id);
    setOpenProduct(false);
  };

  productMap = productList?.map((value, index) => {
    return (
      <>
        <div
          onClick={() => onSelectedProduct(value)}
          key={`product${index}`}
          className="py-3 flex border h-10 p-2 w-full bg-white hover:bg-slate-100 hover:cursor-pointer"
        >
          {value.name}
        </div>
      </>
    );
  });

  const formik = useFormik({
    initialValues: {
      page: 1,
      limit: 7,
      product_id: '',
      sortOrder: 'ASC',
      date_start: startDate.toISOString().split('T')[0],
      date_end: endDate.toISOString().split('T')[0],
    },
    validate: validateFilterStockHistory,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const result = await getStockHistoryAPI(values);
        setStockHistory(result?.data?.data?.rows);
        setTotalPages(result?.data?.totalPage);
        setSubmitting(false);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
  });

  useEffect(() => {
    if (debouncedSearchValue) {
      queryParams['search'] = debouncedSearchValue;
    }
    setSearchParams(queryParams);
    dispatch(getProducts({ page: 1, limit, search: debouncedSearchValue }));
  }, [debouncedSearchValue]);

  useEffect(() => {
    if (page) {
      formik.setFieldValue('page', page);
      formik?.handleSubmit();
    }
  }, [page]);
  return (
    <>
      <div className="font-bold text-xl">Stock History</div>
      <div className="collapse bg-base-200">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium flex justify-between">
          <div>Filter</div>
          <MdOutlineArrowDropDown size={30} />
        </div>
        <div className="collapse-content">
          <form onSubmit={formik.handleSubmit}>
            <div className="relative">
              <SelectProduct
                id="product"
                name="product_id"
                setSearch={setSearch}
                values={selectedProduct}
                onClick={() => setOpenProduct(!openProduct)}
                placeholder="Please select product"
                errors={formik?.errors?.product_id}
                label="Product"
                defaultValue={true}
              />
              <div className={openProduct ? 'absolute w-full' : 'hidden'}>
                <div
                  onClick={() => onSelectedProduct(allProducts)}
                  className="py-3 flex border h-10 p-2 w-full bg-white hover:bg-slate-100 hover:cursor-pointer"
                >
                  All products
                </div>
                {productMap}
              </div>
            </div>
            <div className="md:flex md:justify-evenly">
              <div className="flex justify-between gap-3">
                <div className="w-6/12 md:w-full">
                  <InputUserDate
                    id="date_start"
                    label="Date Start"
                    name="date_start"
                    errors={formik?.errors?.date_start}
                    handleChange={formik.handleChange}
                    values={formik?.values?.date_start}
                  />
                </div>
                <div className="w-6/12 md:w-full">
                  <InputUserDate
                    id="date_end"
                    label="Date End"
                    name="date_end"
                    errors={formik?.errors?.date_end}
                    handleChange={formik.handleChange}
                    values={formik?.values?.date_end}
                  />
                </div>
              </div>
              <div className="md:w-full md:ml-3">
                <SelectSortOrder
                  id="sortOrder"
                  name="sortOrder"
                  handleChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  errors={formik?.errors?.sortOrder}
                  value={formik?.values?.sortOrder}
                  placeholder="Please select one"
                  label="Sort by"
                  touched={formik.touched?.sortOrder}
                  selected="ASC"
                />
              </div>
            </div>
            <button
              disabled={!formik.isValid || formik.isSubmitting}
              type="submit"
              className="btn w-full bg-primary text-white"
            >
              SAVE
            </button>
          </form>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Date</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Unit</th>
              <th>Type</th>
              <th>Action</th>
              <th>Total Stock</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {stockHistory?.map((value) => {
              return (
                <tr>
                  <td>{value?.createdAt.split('T')[0]}</td>
                  <td>{value?.product?.name}</td>
                  <td>{value?.qty}</td>
                  <td>
                    {value?.unit
                      ? value?.product?.product_type?.type_name
                      : value?.product?.packaging_type?.type_name}
                  </td>
                  <td>{value?.stock_history_type?.type}</td>
                  <td>{value?.action}</td>
                  <td>{value?.total_stock}</td>
                  <td>{value?.notes}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {stockHistory.length > 0 ? (
        <div className="py-5">
          <Pagination
            setPage={setPage}
            page={page || 1}
            totalPages={totalPages}
          />
        </div>
      ) : null}
    </>
  );
}
