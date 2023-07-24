import { useFormik } from 'formik';
import { validateAddProduct } from '../Helper/productHelper';
import { addProduct } from '../API/productAPI';
import { toast } from 'react-hot-toast';
import InputUserFile from '../Components/Profile/Input/InputUserFile';
import InputUserText from '../Components/Profile/Input/InputUserText';

export default function AddProduct() {
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
        />
        <InputUserText
          id="primary unit"
          label="Primary Unit"
          name="product.packaging_type"
          errors={formik?.errors?.name}
          handleChange={formik?.handleChange}
          values={formik?.values?.product?.name}
        />
      </form>
    </>
  );
}
