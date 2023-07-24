import { useFormik } from 'formik';
import { validateAddProduct } from '../Helper/productHelper';
import {
  addProduct,
  getPackagingType,
  getProductType,
} from '../API/productAPI';
import { toast } from 'react-hot-toast';
import InputUserFile from '../Components/Profile/Input/InputUserFile';
import InputUserText from '../Components/Profile/Input/InputUserText';
import { useEffect, useState } from 'react';
import Select from '../Components/Products/Input/Select';

export default function AddProduct() {
  const [packaging, setPackaging] = useState([]);
  const [productType, setProductType] = useState([]);
  const formik = useFormik({
    initialValues: {
      product: {
        name: '',
        packaging_type_id: 0,
        product_type_id: 0,
        net_content: 0,
        description: '',
        dosing: '',
        BPOM_id: '',
        require_prescription: 0,
        price: 0,
      },
      category: {
        id: [],
      },
      image: {
        product: '',
      },
    },
    validate: validateAddProduct,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const result = await addProduct(values);
        if (result.data.success) {
          toast.success(result.data.message);
          setSubmitting(false);
        }
      } catch (error) {}
    },
  });

  const getPackaging = async () => {
    const result = await getPackagingType();
    setPackaging(result.data.data);
  };

  const getType = async () => {
    const result = await getProductType();
    setProductType(result.data.data);
  };

  useEffect(() => {
    getPackaging();
    getType();
  }, []);
  return (
    <>
      <div className="font-bold text-xl">Add New Product</div>
      <form onSubmit={formik.handleSubmit}>
        <InputUserText
          id="name"
          label="Name"
          name="product.name"
          errors={formik?.errors?.name}
          handleChange={formik?.handleChange}
          values={formik?.values?.product?.name}
          touched={formik.touched?.product?.name}
        />
        <Select
          id="primary unit"
          name="product.packaging_type_id"
          handleChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          errors={formik?.errors?.packaging_type_id}
          value={formik?.values?.product?.packaging_type_id}
          data={packaging}
          placeholder="Please select primary unit"
          label="Primary Unit"
          touched={formik.touched?.product?.packaging_type_id}
        />
        <Select
          id="secondary unit"
          name="product.product_type_id"
          handleChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          errors={formik?.errors?.product_type_id}
          value={formik?.values?.product?.product_type_id}
          data={productType}
          placeholder="Please select secondary unit"
          label="Secondary Unit"
          touched={formik.touched?.product?.product_type_id}
        />
        <button
          disabled={formik.isSubmitting}
          type="submit"
          className="btn w-full bg-primary text-white"
        >
          SAVE
        </button>
      </form>
    </>
  );
}
