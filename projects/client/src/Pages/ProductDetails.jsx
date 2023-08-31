import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../Features/Product/ProductSlice';
import { addToCartAsync } from '../Features/Cart/CartSlice';
import { toast } from 'react-hot-toast';
import { MdOutlineWarningAmber } from 'react-icons/md';

export default function ProductDetails() {
  const user = useSelector((state) => state?.user?.user);
  const role = user?.role_id;
  const userId = user?.id;
  const productsStore = useSelector((state) => state?.products?.products);
  const productName = productsStore?.data?.name;
  const productDescription = productsStore?.data?.description;
  const productDosing = productsStore?.data?.dosing;
  const productPrice = productsStore?.data?.price?.toLocaleString(['id']);
  const productLabels = productsStore?.labels;
  const reqPrescription = productsStore?.data?.require_prescription;
  let image;
  productsStore?.data?.product_images
    ? (image = productsStore?.data?.product_images[0]?.image)
    : (image = '');
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const productId = Number(id);
  const [descTab, setDescTab] = useState('tab-active');
  const [dosingTab, setDosingTab] = useState('');
  const labelsMap = productLabels?.map((value, index) => {
    return (
      <div
        key={`label${index}`}
        className="badge badge-secondary badge-outline mr-3"
      >
        {value.product_category.category_name}
      </div>
    );
  });

  const setActiveTab = (tab) => {
    if (tab === 'desc') {
      setDescTab('tab-active');
      setDosingTab('');
    } else if (tab === 'dosing') {
      setDescTab('');
      setDosingTab('tab-active');
    }
  };

  const handleAddToCart = () => {
    if (reqPrescription) {
      return toast.error('This product requires prescription');
    }
    if (Object.keys(user).length === 0) {
      return toast.error('Login first before adding product to cart');
      // return navigate('/login');
    }
    dispatch(addToCartAsync({ productId: productId }));
  };

  useEffect(() => {
    dispatch(getProductDetails({ id: productId }));
  }, [dispatch, id, productId]);
  if (role === 1) {
    return <></>;
  } else {
    return (
      <>
        {/* <NavBar /> */}
        <div className="flex justify-center">
          <div className="grid md:grid-cols-[1fr,2fr] max-w-6xl">
            <div className="py-3 justify-self-center ">
              <div>
                <img
                  className="h-64 "
                  src={image ? `http://localhost:8000/${image}` : null}
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
                {reqPrescription ? 'prescription' : 'add to cart'}
              </button>
              <div>
                <article className="prose">
                  <div>Labels</div>
                  <div>{labelsMap}</div>
                </article>
              </div>
              {reqPrescription ? (
                <div className="alert alert-warning mt-5">
                  <MdOutlineWarningAmber size={25} />
                  <span>This product requires prescription</span>
                </div>
              ) : (
                <div className=""></div>
              )}
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
