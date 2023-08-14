import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getProductDetailsAPI, updateProduct } from '../API/productAPI';
import { useFormik } from 'formik';
import {
  validateAddProduct,
  validateEditProduct,
} from '../Helper/productHelper';
import { toast } from 'react-hot-toast';
import InputProductImage from '../Components/Products/Input/InputFile';
import Multiselect from 'multiselect-react-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import InputUserText from '../Components/Profile/Input/InputUserText';
import SelectPrescription from '../Components/Products/Input/SelectPrescription';
import Select from '../Components/Products/Input/Select';
import { getPackaging, getType } from '../Features/Product/ProductSlice';
import { getAllCategories } from '../Features/Category/CategorySlice';
import { useNavigate } from 'react-router-dom';

export default function EditProduct() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('productId');
  const [image, setImage] = useState(null);
  const [product, setProduct] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(null);
  // const [isChange, setIsChange] = useState(false);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const category = useSelector((state) => state?.categories?.categories);
  const packaging = useSelector((state) => state?.products?.packagingType);
  const productType = useSelector((state) => state?.products?.productType);

  const getCurrentData = async () => {
    try {
      const getToken = localStorage.getItem('token');
      const data = { id: productId, token: getToken };
      const result = await getProductDetailsAPI(data);
      const categories = result?.data?.labels.map((value) => {
        return value.product_category;
      });
      setImage(result?.data?.image?.image);
      setProduct(result?.data?.data);
      setSelectedCategories(categories);
    } catch (error) {}
  };

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
        price: 0,
      },
      category: {
        category_id: [],
      },
      image: {
        product: '',
      },
    },
    validate: validateEditProduct,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const result = await updateProduct(values, productId);
        const errorMessage = { message: result.data.message };
        if (result.data.success) {
          toast.success(result.data.message);
          setSubmitting(false);
          navigate('/products');
        } else {
          throw errorMessage;
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  const [selectedOptions, setSelectedOptions] = useState([]);
  // const [removedOptions, setRemovedOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const defaultCategories = () => {
    const categories = selectedCategories?.map((value) => {
      return value.id;
    });
    setSelectedOptions(selectedCategories);
    setSelectedCategory(categories);
  };
  const onSelectOptions = (selectedList, selectedItem) => {
    setSelectedOptions([...selectedOptions, selectedItem]);
    setSelectedCategory([...selectedCategory, selectedItem.id]);
    // setIsChange(true);
  };
  const onRemoveOptions = (selectedList, removedItem) => {
    // setRemovedOptions([...removedOptions, removedItem]);
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
    // setIsChange(true);
  };

  const setDefaultValue = () => {
    formik.setValues({
      product: {
        name: product?.name,
        packaging_type_id: product?.packaging_type_id,
        product_type_id: product?.product_type_id,
        net_content: product?.net_content,
        description: product?.description,
        dosing: product?.dosing,
        weight: product?.weight,
        BPOM_id: product?.BPOM_id,
        require_prescription: product?.require_prescription,
        price: product?.price,
      },
    });
    // setIsChange(false);
  };

  const onInputImage = (image) => {
    formik.setFieldValue('image.product', image);
    // setIsChange(true)
  };

  useEffect(() => {
    getCurrentData();
    dispatch(getPackaging());
    dispatch(getType());
    dispatch(getAllCategories());
  }, []);

  useEffect(() => {
    setDefaultValue();
  }, [product]);

  useEffect(() => {
    defaultCategories();
  }, [selectedCategories]);

  useEffect(() => {
    if (formik?.values?.category?.category_id !== selectedCategories) {
      formik.setFieldValue('category.category_id', [selectedCategory]);
    }
  }, [selectedCategory]);
  return (
    <>
      <div className="font-bold text-xl">Edit Product</div>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid lg:grid-cols-2 gap-4">
          <div>
            <InputUserText
              id="name"
              label="Name"
              name="product.name"
              errors={formik?.errors?.name}
              handleChange={formik.handleChange}
              values={formik?.values?.product?.name}
              touched={formik.touched?.product?.name}
            />
            <Select
              id="primary unit"
              name="product.packaging_type_id"
              handleChange={formik.handleChange}
              onBlur={formik?.handleBlur}
              errors={formik?.errors?.packaging_type_id}
              value={formik?.values?.product?.packaging_type_id}
              data={packaging}
              placeholder="Please select primary unit"
              label="Primary Unit"
              touched={formik.touched?.product?.packaging_type_id}
              selected={product?.packaging_type_id}
            />
            <Select
              id="secondary unit"
              name="product.product_type_id"
              handleChange={formik.handleChange}
              onBlur={formik?.handleBlur}
              errors={formik?.errors?.product_type_id}
              value={formik?.values?.product?.product_type_id}
              data={productType}
              placeholder="Please select secondary unit"
              label="Secondary Unit"
              touched={formik.touched?.product?.product_type_id}
              selected={product?.product_type_id}
            />
            <InputUserText
              id="net content"
              label="Net Content"
              name="product.net_content"
              errors={formik?.errors?.net_content}
              handleChange={formik.handleChange}
              values={formik?.values?.product?.net_content}
              touched={formik.touched?.product?.net_content}
            />
            <InputUserText
              id="description"
              label="Description"
              name="product.description"
              errors={formik?.errors?.description}
              handleChange={formik.handleChange}
              values={formik?.values?.product?.description}
              touched={formik.touched?.product?.description}
            />
            <InputUserText
              id="dosing"
              label="Dosing"
              name="product.dosing"
              errors={formik?.errors?.dosing}
              handleChange={formik.handleChange}
              values={formik?.values?.product?.dosing}
              touched={formik.touched?.product?.dosing}
            />
            <InputUserText
              id="weight"
              label="Weight"
              name="product.weight"
              errors={formik?.errors?.weight}
              handleChange={formik.handleChange}
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
              handleChange={formik.handleChange}
              values={formik?.values?.product?.BPOM_id}
              touched={formik.touched?.product?.BPOM_id}
            />
            <SelectPrescription
              id="prescreption"
              name="product.require_prescription"
              handleChange={formik.handleChange}
              onBlur={formik?.handleBlur}
              errors={formik?.errors?.require_prescription}
              value={formik?.values?.product?.require_prescription}
              placeholder="Need Prescription"
              label="Prescription"
              touched={formik.touched?.product?.require_prescription}
              selected={product?.require_prescription}
            />
            <InputUserText
              id="price"
              label="Price"
              name="product.price"
              errors={formik?.errors?.price}
              handleChange={formik.handleChange}
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
                selectedValues={selectedCategories}
              />
            </div>
            <div>
              <InputProductImage
                name="image.product"
                id="product_image"
                onChange={(e) => {
                  onInputImage(e.target.files[0]);
                }}
                label="Product Image"
                refProp={fileInputRef}
              />
            </div>
            {formik?.values?.image?.product ? (
              <img
                className="w-6/12"
                src={URL.createObjectURL(formik.values.image.product)}
                alt="product_image"
              />
            ) : (
              <img
                className="w-6/12"
                src={`http://localhost:8000/${image}`}
                alt="product_image"
              />
            )}
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
            disabled={!formik.isValid || formik.isSubmitting}
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
