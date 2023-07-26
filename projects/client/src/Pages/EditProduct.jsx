import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductDetailsAPI, updateProduct } from '../API/productAPI';
import { useFormik } from 'formik';
import { validateAddProduct } from '../Helper/productHelper';
import { toast } from 'react-hot-toast';

export default function EditProduct() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('productId');
  const [image, setImage] = useState(null)

  const getCurrentData = async () => {
    try {
      const getToken = localStorage.getItem('token')
      const data = {id: productId, token: getToken}
      const result = await getProductDetailsAPI(data)
      setImage(result?.data?.image?.image)
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
    validate: validateAddProduct,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const result = await updateProduct(values);
        const errorMessage = { message: result.data.message };
        if (result.data.success) {
          toast.success(result.data.message);
          setSubmitting(false);
        }
        throw errorMessage;
      } catch (error) {
        toast.success(error.message);
      }
    },
  });

  useEffect(() => {
    getCurrentData()
  }, [])
  return (
    <>
      <div className="font-bold text-xl">Edit Product</div>
      <img className='w-3/12' src={`http://localhost:8000/${image}`} alt="product_image" />
    </>
  );
}
