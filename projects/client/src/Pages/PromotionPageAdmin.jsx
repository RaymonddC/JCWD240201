import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import Select from '../Components/Products/Input/Select';
import { getPromotionAPI, getPromotionTypeAPI } from '../API/promotionAPI';
import { useEffect, useState } from 'react';
import SelectSortOrder from '../Components/Report/StockHistory/SelectSortOrder';
import ProductDiscTable from '../Components/Promotion/Table/ProductDiscTable';
import { MdAdd } from 'react-icons/md';
import { validateGetPromotion } from '../Helper/promotionHelper';
import TransactionDiscTable from '../Components/Promotion/Table/TransactionDiscTable';
import BuyGetTable from '../Components/Promotion/Table/BuyGetTable';
import { useNavigate } from 'react-router-dom';

export default function PromotionPage() {
  const [promotionType, setPromotionType] = useState(null);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPromoType, setCurrentPromoType] = useState(null);
  const navigate = useNavigate();

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
  }, [formik?.values?.page]);
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
        <div className='grid grid-cols-2 gap-4 mb-6'>
          <button
            disabled={!formik.isValid || formik.isSubmitting}
            type="submit"
            className="btn btn-primary w-full text-white"
          >
            SEARCH
          </button>
          <button
            className="btn btn-primary w-full text-white"
            onClick={() => navigate('/promotions/new')}
          >
            Add new promo
          </button>
        </div>
      </form>
      <div className="mt-5">
        {currentPromoType === 1 && data.length > 0 ? (
          <ProductDiscTable
            setPage={setPage}
            page={page}
            totalPages={totalPages}
            data={data}
          />
        ) : currentPromoType === 2 && data.length > 0 ? (
          <TransactionDiscTable
            setPage={setPage}
            page={page}
            totalPages={totalPages}
            data={data}
          />
        ) : currentPromoType === 3 && data.length > 0 ? (
          <BuyGetTable
            setPage={setPage}
            page={page}
            totalPages={totalPages}
            data={data}
          />
        ) : null}
      </div>
    </>
  );
}
