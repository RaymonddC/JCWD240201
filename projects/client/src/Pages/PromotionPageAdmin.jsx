import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import Select from '../Components/Products/Input/Select';
import { getPromotionAPI, getPromotionTypeAPI } from '../API/promotionAPI';
import { useEffect, useState } from 'react';
import SelectSortOrder from '../Components/Report/StockHistory/SelectSortOrder';
import ProductDiscTable from '../Components/Promotion/Table/ProductDiscTable';
import Pagination from '../Components/Layout/Pagination';
import { validateGetPromotion } from '../Helper/promotionHelper';
import TransactionDiscTable from '../Components/Promotion/Table/TransactionDiscTable';
import BuyGetTable from '../Components/Promotion/Table/BuyGetTable';

export default function PromotionPage() {
  const [promotionType, setPromotionType] = useState(null);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPromoType, setCurrentPromoType] = useState(null);

  const formik = useFormik({
    initialValues: {
      page: 1,
      limit: 7,
      promotionTypeId: 0,
      sortOrder: '',
    },
    validate: validateGetPromotion,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const result = await getPromotionAPI(values);
        setCurrentPromoType(result?.data?.data?.rows[0]?.promotion_type_id);
        setData(result?.data?.data?.rows);
        setTotalPages(result?.data?.totalPage);
        setSubmitting(false);
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  const getPromotionType = async () => {
    const result = await getPromotionTypeAPI();
    setPromotionType(result?.data?.data);
  };

  useEffect(() => {
    getPromotionType();
  }, []);

  useEffect(() => {
    if (page) {
      formik.setFieldValue('page', page);
      formik?.handleSubmit();
    }
  }, [page]);
  return (
    <>
      <div className="font-bold text-xl">Promotion</div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex justify-evenly gap-3">
          <div className="w-full">
            <Select
              id="promotion_type"
              name="promotionTypeId"
              handleChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              errors={formik?.errors?.promotionTypeId}
              value={formik?.values?.promotionTypeId}
              data={promotionType}
              placeholder="Please select promotion type"
              label="Promotion Type"
              touched={formik.touched?.promotionTypeId}
            />
          </div>
          <div className="w-full">
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
            />
          </div>
        </div>
        <button
          disabled={!formik.isValid || formik.isSubmitting}
          type="submit"
          className="btn w-full bg-primary text-white"
        >
          SEARCH
        </button>
      </form>
      <div className='mt-5'>
        {currentPromoType === 1 && data.length > 0 ? (
          <ProductDiscTable data={data} />
        ) : currentPromoType === 2 && data.length > 0 ? (
          <TransactionDiscTable data={data} />
        ) : currentPromoType === 3 && data.length > 0 ? (
          <BuyGetTable data={data} />
        ) : null}
        {data.length > 0 ? (
          <div className="py-5">
            <Pagination
              setPage={setPage}
              page={page || 1}
              totalPages={totalPages}
            />
          </div>
        ) : null}
      </div>
    </>
  );
}
