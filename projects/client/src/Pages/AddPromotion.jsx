import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import Select from '../Components/Products/Input/Select';
import InputUserText from '../Components/Profile/Input/InputUserText';
import { useEffect, useState } from 'react';
import { getPromotionTypeAPI } from '../API/promotionAPI';

export default function AddPromotion() {
  const [promotionType, setPromotionType] = useState(null);

  const formik = useFormik({
    initialValues: {},
    // validate: validateAddProduct,
    onSubmit: async (values, { setSubmitting }) => {
      try {
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
  return (
    <>
      <div className="font-bold text-xl">Add Discount</div>
      <form onSubmit={formik.handleSubmit}>
        <Select
          id="primary unit"
          name="product.packaging_type_id"
          handleChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          errors={formik?.errors?.packaging_type_id}
          value={formik?.values?.product?.packaging_type_id}
          data={promotionType}
          placeholder="Please select primary unit"
          label="Primary Unit"
          touched={formik.touched?.product?.packaging_type_id}
        />
        <InputUserText
          id="name"
          label="Name"
          name="product.name"
          errors={formik?.errors?.name}
          handleChange={formik?.handleChange}
          values={formik?.values?.product?.name}
          touched={formik.touched?.product?.name}
          disabled={true}
        />
        <button
          disabled={!formik.isValid || formik.isSubmitting}
          type="submit"
          className="btn w-full bg-primary text-white"
        >
          SAVE
        </button>
      </form>
    </>
  );
}
