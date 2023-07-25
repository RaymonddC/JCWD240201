import { useEffect, useRef, useState } from 'react';
import NavBar from '../Components/Layout/Navbar';
import {
  getQuestionDetail,
  postAnswer,
  updateAnswer,
} from '../Features/QnA/QnASlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../Features/Product/ProductSlice';
import axios from 'axios';
import { addToCartAsync } from '../Features/Cart/CartSlice';
import { toast } from 'react-hot-toast';

export default function ProductDetails() {
  const user = useSelector((state) => state?.user?.user);
  const role = user?.role_id;
  const userId = user?.id;
  const productsStore = useSelector((state) => state?.products?.products);
  const productName = productsStore?.data?.name;
  const productDescription = productsStore?.data?.description;
  const productDosing = productsStore?.data?.dosing;
  const productPrice = productsStore?.data?.price?.toLocaleString(['id']);
  console.log(productsStore?.data);
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const productId = Number(id);
  const [descTab, setDescTab] = useState('tab-active');
  const [dosingTab, setDosingTab] = useState('');
  let descActive = '';
  let dosingActive = '';

  console.log(user);

  const setActiveTab = (tab) => {
    if (tab === 'desc') {
      setDescTab('tab-active');
      setDosingTab('');
    } else if (tab === 'dosing') {
      setDescTab('');
      setDosingTab('tab-active');
    }
  };

  // const rajaOngkir = async () => {
  //   try {
  //     const response = await axios.get(
  //       'https://api.rajaongkir.com/starter/province',
  //       {
  //         headers: { key: 'c5a276b04ff81ac5bb2bd4ad3ed2d3fe' },
  //       },
  //     );
  //     console.log(response);
  //   } catch (error) {}
  // };

  const handleAddToCart = () => {
    if (Object.keys(user).length === 0) {
      return toast.error('Login First before adding product to cart');
      // return navigate('/login');
    }
    dispatch(addToCartAsync({ productId: productId }));
  };

  useEffect(() => {
    dispatch(getProductDetails({ id: productId }));
    // rajaOngkir()
  }, [dispatch, id, productId]);
  if (role === 1) {
    return <></>;
  } else {
    return (
      <>
        <NavBar />
        <div className="flex justify-center">
          <div className="grid md:grid-cols-[1fr,2fr] max-w-6xl">
            <div className="py-3 justify-self-center ">
              <div>
                <img
                  className="h-64 "
                  src="https://res-3.cloudinary.com/dk0z4ums3/image/upload/c_scale,h_750,w_750/v1/production/pharmacy/products/1643869601_tolak_angin_sidomuncul_12_sachet_15_ml"
                  alt=""
                />
              </div>
            </div>
            <div className="px-5 py-5 max-w-lg">
              <article className="prose">
                <h3>{productName}</h3>
                <h2>Rp. {productPrice}</h2>
              </article>
              <button
                onClick={() => {
                  handleAddToCart();
                }}
                className="btn  btn-accent my-3"
              >
                add to cart
              </button>
              <div>
              <article className="prose">
                <p>Labels</p>
                <p>Rp. {productPrice}</p>
              </article>
              </div>
              <div className="tabs justify-center py-5">
                <div
                  onClick={() => setActiveTab('desc')}
                  className={`tab tab-bordered ${descTab}`}
                >
                  Description
                </div>
                <div
                  onClick={() => setActiveTab('dosing')}
                  className={`tab tab-bordered ${dosingTab}`}
                >
                  Dosing
                </div>
              </div>
              {descTab === 'tab-active' ? (
                <div className="px-2 pb-5">{productDescription}</div>
              ) : (
                <div>{productDosing}</div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
