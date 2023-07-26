import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductDetailsAPI } from '../API/productAPI';

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
