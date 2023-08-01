import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import Select from '../Components/Products/Input/Select';
import InputUserText from '../Components/Profile/Input/InputUserText';
import { useEffect, useState } from 'react';
import { createPromotionAPI, getPromotionTypeAPI } from '../API/promotionAPI';
import SelectProduct from '../Components/Promotion/Input/SelectProduct';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useDebounce from '../Hooks/useDebounce';
import { getProducts } from '../Features/Product/ProductSlice';
import InputNumber from '../Components/Stocks/Input/InputNumber';
import InputUserDate from '../Components/Profile/Input/InputUserDate';
import { validatePromotion } from '../Helper/promotionHelper';

export default function AddPromotion() {
  const dispatch = useDispatch();
  const ProductsStore = useSelector((state) => state?.products?.products);
  const limit = 5;
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  let queryParams = {};
  const productList = ProductsStore?.data?.rows;
  const debouncedSearchValue = useDebounce(search, 1200);
  const [promotionType, setPromotionType] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openProduct, setOpenProduct] = useState(false);
  let productMap;

  const onSelectedProduct = (value) => {
    setSelectedProduct(value.name);
    formik.setFieldValue('product_id', value.id);
    setOpenProduct(false);
  };

  productMap = productList?.map((value, index) => {
    return (
      <div
        onClick={() => onSelectedProduct(value)}
        key={`product${index}`}
        className="py-3 flex border w-full bg-white hover:bg-slate-100 hover:cursor-pointer"
      >
        {value.name}
      </div>
    );
  });

  const formik = useFormik({
    initialValues: {
      product_id: '',
      promotion_type_id: '',
      discount: '',
      buy: '',
      get: '',
      minimum_transaction: '',
      maximum_discount_amount: '',
      date_start: '',
      date_end: '',
      limit: '',
    },
    validate: validatePromotion,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const dateError = { message: 'Date is not valid' };
        if (new Date(values.date_start) > new Date(values.date_end))
          throw dateError;
        const result = await createPromotionAPI(values);
        const errorMessage = { message: result.data.message };
        if (result.data.success) {
          toast.success(result.data.message);
          formik.resetForm();
          setSelectedProduct('');
          setSubmitting(false);
        } else {
          throw errorMessage;
        }
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
    if (debouncedSearchValue) {
      queryParams['search'] = debouncedSearchValue;
    }
    setSearchParams(queryParams);
    dispatch(getProducts({ page: 1, limit, search: debouncedSearchValue }));
  }, [debouncedSearchValue]);
  return (
    <>
      <div className="font-bold text-xl">Add Discount</div>
      <form onSubmit={formik.handleSubmit}>
        <Select
          id="promotion_type"
          name="promotion_type_id"
          handleChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          errors={formik?.errors?.promotion_type_id}
          value={formik?.values?.promotion_type_id}
          data={promotionType}
          placeholder="Please select primary unit"
          label="Primary Unit"
          touched={formik.touched?.promotion_type_id}
        />
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
            isDisabled={
              formik?.values?.promotion_type_id === '1' ||
              formik?.values?.promotion_type_id === '3'
                ? false
                : true
            }
          />
          <div className={openProduct ? 'absolute w-full' : 'hidden'}>
            {productMap}
          </div>
        </div>
        <div className="flex justify-between gap-3">
          <div className="w-6/12">
            <InputNumber
              id="discount"
              label="Discount"
              name="discount"
              errors={formik?.errors?.discount}
              handleChange={formik?.handleChange}
              values={formik?.values?.discount}
              touched={formik.touched?.discount}
              isDisabled={
                formik?.values?.promotion_type_id === '1' ||
                formik?.values?.promotion_type_id === '2'
                  ? false
                  : true
              }
            />
          </div>
          <div className="w-6/12">
            <InputNumber
              id="limit"
              label="Promotion Limit"
              name="limit"
              errors={formik?.errors?.limit}
              handleChange={formik?.handleChange}
              values={formik?.values?.limit}
              touched={formik.touched?.limit}
              isDisabled={formik?.values?.promotion_type_id ? false : true}
            />
          </div>
        </div>
        <div className="flex justify-between gap-3">
          <div className="w-6/12">
            <InputNumber
              id="buy"
              label="Buy"
              name="buy"
              errors={formik?.errors?.buy}
              handleChange={formik?.handleChange}
              values={formik?.values?.buy}
              touched={formik.touched?.buy}
              isDisabled={
                formik?.values?.promotion_type_id === '3' ? false : true
              }
            />
          </div>
          <div className="w-6/12">
            <InputNumber
              id="get"
              label="Get"
              name="get"
              errors={formik?.errors?.get}
              handleChange={formik?.handleChange}
              values={formik?.values?.get}
              touched={formik.touched?.get}
              isDisabled={
                formik?.values?.promotion_type_id === '3' ? false : true
              }
            />
          </div>
        </div>
        <div className="flex justify-between gap-3">
          <div className="w-6/12">
            <InputNumber
              id="min_transaction"
              label="Min. Transaction"
              name="minimum_transaction"
              errors={formik?.errors?.minimum_transaction}
              handleChange={formik?.handleChange}
              values={formik?.values?.minimum_transaction}
              touched={formik.touched?.minimum_transaction}
              isDisabled={
                formik?.values?.promotion_type_id === '2' ? false : true
              }
            />
          </div>
          <div className="w-6/12">
            <InputNumber
              id="maximum_discount_amount"
              label="Max. Discount Amount"
              name="maximum_discount_amount"
              errors={formik?.errors?.maximum_discount_amount}
              handleChange={formik?.handleChange}
              values={formik?.values?.maximum_discount_amount}
              touched={formik.touched?.maximum_discount_amount}
              isDisabled={
                formik?.values?.promotion_type_id === '1' ||
                formik?.values?.promotion_type_id === '2'
                  ? false
                  : true
              }
            />
          </div>
        </div>
        <div className="flex justify-between gap-3">
          <div className="w-6/12">
            <InputUserDate
              id="date_start"
              label="Promotion Start"
              name="date_start"
              errors={formik?.errors?.date_start}
              handleChange={formik.handleChange}
              values={formik?.values?.date_start}
              isDisabled={formik?.values?.promotion_type_id ? false : true}
            />
          </div>
          <div className="w-6/12">
            <InputUserDate
              id="date_end"
              label="Promotion End"
              name="date_end"
              errors={formik?.errors?.date_end}
              handleChange={formik.handleChange}
              values={formik?.values?.date_end}
              isDisabled={formik?.values?.promotion_type_id ? false : true}
            />
          </div>
        </div>
        <button
          disabled={
            !formik?.values?.promotion_type_id ||
            !formik.isValid ||
            formik.isSubmitting
          }
          type="submit"
          className="btn w-full bg-primary text-white"
        >
          SAVE
        </button>
      </form>
    </>
  );
}
