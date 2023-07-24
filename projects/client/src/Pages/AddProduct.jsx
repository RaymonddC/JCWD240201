import { useFormik } from 'formik';
import { validateAddProduct } from '../Helper/productHelper';
import { addProduct, getProductType } from '../API/productAPI';
import { toast } from 'react-hot-toast';
import InputUserFile from '../Components/Profile/Input/InputUserFile';
import InputUserText from '../Components/Profile/Input/InputUserText';
import { useEffect, useState } from 'react';
import Select from '../Components/Products/Input/Select';
import { useDispatch, useSelector } from 'react-redux';
import { getPackaging, getType } from '../Features/Product/ProductSlice';

export default function AddProduct() {
  const dispatch = useDispatch();
  const packaging = useSelector((state) => state?.products?.packagingType);
  const productType = useSelector((state) => state?.products?.productType);
  const formik = useFormik({
    initialValues: {
      product: {
        name: '',
        packaging_type_id: 0,
        product_type_id: 0,
        net_content: '',
        description: '',
        dosing: '',
        BPOM_id: '',
        require_prescription: 0,
        price: 0,
      },
      category: {
        category_id: [],
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

  useEffect(() => {
    dispatch(getPackaging());
    dispatch(getType());
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
        <InputUserText
          id="net content"
          label="Net Content"
          name="product.net_content"
          errors={formik?.errors?.net_content}
          handleChange={formik?.handleChange}
          values={formik?.values?.product?.net_content}
          touched={formik.touched?.product?.net_content}
        />
        <InputUserText
          id="description"
          label="Description"
          name="product.description"
          errors={formik?.errors?.description}
          handleChange={formik?.handleChange}
          values={formik?.values?.product?.description}
          touched={formik.touched?.product?.description}
        />
        <InputUserText
          id="dosing"
          label="Dosing"
          name="product.dosing"
          errors={formik?.errors?.dosing}
          handleChange={formik?.handleChange}
          values={formik?.values?.product?.dosing}
          touched={formik.touched?.product?.dosing}
        />
        <InputUserText
          id="BPOM id"
          label="BPOM Id"
          name="product.BPOM_id"
          errors={formik?.errors?.BPOM_id}
          handleChange={formik?.handleChange}
          values={formik?.values?.product?.BPOM_id}
          touched={formik.touched?.product?.BPOM_id}
        />
        <InputUserText
          id="require prescription"
          label="Prescription"
          name="product.require_prescription"
          errors={formik?.errors?.require_prescription}
          handleChange={formik?.handleChange}
          values={formik?.values?.product?.require_prescription}
          touched={formik.touched?.product?.require_prescription}
        />
        <InputUserText
          id="price"
          label="Price"
          name="product.price"
          errors={formik?.errors?.price}
          handleChange={formik?.handleChange}
          values={formik?.values?.product?.price}
          touched={formik.touched?.product?.price}
        />
        {/* <InputUserText
          id="category"
          label="Category"
          name="product.category_id"
          errors={formik?.errors?.category_id}
          handleChange={formik?.handleChange}
          values={formik?.values?.product?.category_id}
          touched={formik.touched?.product?.category_id}
        /> */}
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
