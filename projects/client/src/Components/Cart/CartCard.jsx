import React, { useState, useEffect } from 'react';

import Logo from '../../utils/images/logoHealthyMed.svg';

import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { deleteCartAsync } from '../../Features/Cart/CartSlice';

const CartCard = (props) => {
  const dispatch = useDispatch();
  const [isCheckCart, setIsCheckCart] = useState(props.check);

  useEffect(() => {
    if (props.check) {
      if (!isCheckCart) handleCheck();
      setIsCheckCart(true);
    }
  }, [props.check]);

  useEffect(() => {
    // if (isCheckCart) {
    //   props.setTotal(props.total + props.cart.qty);
    //   props.setTotalPrice(props.totalPrice + props.cart.product.price);
    // } else {
    //   props.setTotal(props.total - props.cart.qty);
    //   props.setTotalPrice(props.totalPrice - props.cart.product.price);
    // }
  }, [isCheckCart]);

  const handleCheck = () => {
    if (isCheckCart) {
      props.setCheck(false);
      props.setTotal(props.total - props.cart.qty);
      props.setTotalPrice(props.totalPrice - props.cart.product.price);
    } else {
      props.setTotal(props.total + props.cart.qty);
      props.setTotalPrice(props.totalPrice + props.cart.product.price);
    }
    setIsCheckCart(!isCheckCart);
  };
  return (
    <div className="div border-t border-[#D5D7DD] text-[16px] p-2">
      <div className="product flex justify-between ">
        <div className="check">
          <div className="select flex gap-5 items-center h-full">
            <input
              type="checkbox"
              className="h-3 w-3"
              checked={isCheckCart}
              onClick={handleCheck}
            />
          </div>
        </div>
        <div className="img">
          <img className="h-20 w-20" src={props.cart.img || Logo} alt={Logo} />
        </div>
        <div className="detail flex-grow px-5">
          <p>{props?.cart?.product?.name}</p>
          <p>
            {props.cart.qty}{' '}
            {props?.cart?.product?.packaging_type?.type_name || 'buah'}
          </p>
        </div>
        <div className="summary flex gap-2 leading-6 h-fit items-center">
          <p className={`text-[#737A8D] text-[14px] line-through`}>
            Rp {props.cart.product.price.toLocaleString(['id'])}
          </p>
          <p className={``}>
            Rp {props.cart.product.price.toLocaleString(['id'])}
          </p>
        </div>
      </div>
      <div className="action flex justify-end text-[#009B90] gap-3 items-center ">
        <span>Pindahkan Ke Wishlist</span>|
        <div className="delete flex items-center">
          <RiDeleteBin6Line
            size={'18px'}
            color="#009B90"
            onClick={() => {
              dispatch(deleteCartAsync({ id: props.cart.id }));
            }}
          />
        </div>
        <div className="join join-vertical lg:join-horizontal">
          <button className=" join-item bg-[#daf8ff] btn btn-sm text-[#009B90]">
            -
          </button>
          <button className=" join-item bg-[#daf8ff] btn btn-sm min-w-[50px] w-[10px] text-[#009B90]">
            {props.cart.qty}
          </button>
          <button className=" join-item bg-[#daf8ff] btn btn-sm text-[#009B90]">
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
