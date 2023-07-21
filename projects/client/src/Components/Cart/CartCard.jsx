import React from 'react';

import Logo from '../../utils/images/logoHealthyMed.svg';

import { RiDeleteBin6Line } from 'react-icons/ri';

const CartCard = (props) => {
  console.log(props);
  return (
    <div className="div border-t border-[#D5D7DD] text-[16px] p-2">
      <div className="product flex justify-between ">
        <div className="check">
          <div className="select flex gap-5 items-center h-full">
            <input type="checkbox" className="h-3 w-3" />
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
            Rp {props.cart.product.price}
          </p>
          <p className={``}>Rp {props.cart.product.price}</p>
        </div>
      </div>
      <div className="action flex justify-end text-[#009B90] gap-3 items-center ">
        <span>Pindahkan Ke Wishlist</span>|
        <div className="delete flex items-center">
          <RiDeleteBin6Line size={'18px'} color="#009B90" />
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
