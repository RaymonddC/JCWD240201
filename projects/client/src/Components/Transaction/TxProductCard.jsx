import React from 'react';
import Logo from '../../utils/images/Medicore.png';
import { toast } from 'react-hot-toast';
import { addToCartAsync } from '../../Features/Cart/CartSlice';
import { useDispatch } from 'react-redux';

const TxProductCard = (props) => {
  const dispatch = useDispatch();
  const handleAddToCart = (id) => {
    if (props.txDet.prescription_image) {
      return toast.error('This product requires prescription');
    }
    // if (Object.keys(user).length === 0) {
    //   return toast.error('Login first before adding product to cart');
    //   // return navigate('/login');
    // }
    dispatch(addToCartAsync({ productId: props.txDet.product_id }));
  };

  return (
    <div className="flex border border-slate-200 p-3">
      <div className="prod w-2/3 flex border-r mr-2">
        <div className="img">
          <img
            className="h-11 w-11"
            src={
              props.txDet.prescription_image ||
              props.txDet.product?.product_images[0]?.image
                ? `
              ${process.env.REACT_APP_API_BASE_URL}/${
                props.txDet.prescription_image ||
                props.txDet.product?.product_images[0]?.image
              }`
                : Logo
            }
            alt={'Product'}
          />
        </div>
        <div className="prodDetail w-4/5 mx-3">
          <p>{props.txDet.product_name}</p>
          <p className="text-xs text-slate-500">
            {props.txDet.qty} x Rp
            {props.txDet.price?.toLocaleString(['id'])}
          </p>
        </div>
      </div>
      <div className="linktoProd w-1/3 flex flex-col gap-2">
        <div className="price text-end">
          <p>Total Price</p>
          <p>
            Rp{(props.txDet.price * props.txDet.qty).toLocaleString(['id'])}
          </p>
        </div>
        <button
          className={`border rounded-lg border-primary py-1 ${
            props.txDet.prescription_image ? 'hidden' : ''
          }`}
          onClick={() => {
            handleAddToCart();
          }}
        >
          Buy Again
        </button>
      </div>
    </div>
  );
};

export default TxProductCard;
