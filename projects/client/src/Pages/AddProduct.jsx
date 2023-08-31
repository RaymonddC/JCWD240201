import { useFormik } from 'formik';
import { validateAddProduct } from '../Helper/productHelper';
import { addProduct } from '../API/productAPI';
import { toast } from 'react-hot-toast';
import InputUserText from '../Components/Profile/Input/InputUserText';
import { useEffect, useState } from 'react';
import Select from '../Components/Products/Input/Select';
import { useDispatch, useSelector } from 'react-redux';
import { getPackaging, getType } from '../Features/Product/ProductSlice';
import Multiselect from 'multiselect-react-dropdown';
import { getAllCategories } from '../Features/Category/CategorySlice';
import SelectPrescription from '../Components/Products/Input/SelectPrescription';
import InputProductImage from '../Components/Products/Input/InputFile';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const packaging = useSelector((state) => state?.products?.packagingType);
  const productType = useSelector((state) => state?.products?.productType);
  const category = useSelector((state) => state?.categories?.categories);
  const formik = useFormik({
    initialValues: {
      product: {
        name: '',
        packaging_type_id: 0,
        product_type_id: 0,
        net_content: '',
        description: '',
        dosing: '',
        weight: '',
        BPOM_id: '',
        require_prescription: null,
        price: '',
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
        const errorMessage = { message: result.data.message };
        if (result.data.success) {
          toast.success(result.data.message);
          setSubmitting(false);
          navigate('/products');
        } else {
          throw errorMessage;
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
  });

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [removedOptions, setRemovedOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const onSelectOptions = (selectedList, selectedItem) => {
    setSelectedOptions([...selectedOptions, selectedItem]);
    setSelectedCategory([...selectedCategory, selectedItem.id]);
  };
  const onRemoveOptions = (selectedList, removedItem) => {
    setRemovedOptions([...removedOptions, removedItem]);
    let selectedItems = [...selectedOptions];
    let selectedCategories = [...selectedCategory];
    selectedItems.map((value, index) => {
      if (value.id === removedItem.id) {
        selectedItems.splice(index, 1);
      }
    });
    selectedCategories.map((value, index) => {
      if (value === removedItem.id) {
        selectedCategories.splice(index, 1);
      }
    });
    setSelectedOptions(selectedItems);
    setSelectedCategory(selectedCategories);
  };

  useEffect(() => {
    dispatch(getPackaging());
    dispatch(getType());
    dispatch(getAllCategories());
    formik.setFieldValue('category.category_id', [...selectedCategory]);
  }, [selectedOptions]);
  return (
    <>
      <article className="prose">
        <h2>Add New Product</h2>
      </article>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid lg:grid-cols-2 gap-4">
          <div>
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
              id="weight"
              label="Weight"
              name="product.weight"
              errors={formik?.errors?.weight}
              handleChange={formik?.handleChange}
              values={formik?.values?.product?.weight}
              touched={formik.touched?.product?.weight}
            />
          </div>
          <div>
            <InputUserText
              id="BPOM id"
              label="BPOM Id"
              name="product.BPOM_id"
              errors={formik?.errors?.BPOM_id}
              handleChange={formik?.handleChange}
              values={formik?.values?.product?.BPOM_id}
              touched={formik.touched?.product?.BPOM_id}
            />
            <SelectPrescription
              id="prescreption"
              name="product.require_prescription"
              handleChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              errors={formik?.errors?.require_prescription}
              value={formik?.values?.product?.require_prescription}
              placeholder="Need Prescreption>"
              label="Prescription"
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
            <div>
              <label htmlFor={category} className="text-[14px]">
                Categories
              </label>
              <Multiselect
                id="category"
                name="category.category_id"
                displayValue="category_name"
                placeholder="Select Options"
                onKeyPressFn={function noRefCheck() {}}
                onRemove={onRemoveOptions}
                onSearch={function noRefCheck() {}}
                onSelect={onSelectOptions}
                options={category ? category : []}
                className="w-full mb-2 border border-primary rounded-md select-none focus:outline-none text-[14px]"
                label="test"
              />
              {formik?.errors?.category &&
              formik.touched?.category?.category_id ? (
                <p className="text-error text-[14px]">
                  {formik?.errors?.category}
                </p>
              ) : null}
            </div>
            <div className="my-1">
              <InputProductImage
                name="image.product"
                id="product_image"
                onChange={(e) => {
                  formik.setFieldValue('image.product', e.target.files[0]);
                }}
                label="Product Image"
                touched={formik.touched?.image?.product}
                errors={formik?.errors?.product}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 my-6 mb-6">
          <button
            className="btn w-full bg-primary text-white"
            onClick={() => navigate('/products')}
          >
            Cancel
          </button>
          <button
            disabled={formik.isSubmitting}
            type="submit"
            className="btn w-full bg-primary text-white"
          >
            SAVE
          </button>
        </div>
      </form>
    </>
  );
}
