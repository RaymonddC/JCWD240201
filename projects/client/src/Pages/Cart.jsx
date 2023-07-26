import React, { useEffect, useState } from 'react';
import CartCard from '../Components/Cart/CartCard';
import { useDispatch, useSelector } from 'react-redux';
import { checkoutAsync, getCartUserAsync } from '../Features/Cart/CartSlice';
import { Navigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state?.user);
  const { carts, totalCart, totalPrice, activeCart, discount } = useSelector(
    (state) => state?.cart,
  );
  const [isCheck, setIsCheck] = useState(false);
  // const [isForceCheck, setIsForceCheck] = useState(false);;

  useEffect(() => {
    dispatch(getCartUserAsync());
  }, []);

  useEffect(() => {
    if (activeCart === totalCart && totalCart !== 0) setIsCheck(true);
    else setIsCheck(false);
  }, [carts]);

  return (
    <div className="min-h-[50vh]">
      <p className="font-bold text-[24px] mb-9">Keranjang Saya</p>
      <div className="flex justify-between">
        <div
          className={`card card-compact w-[65%] bg-base-100 shadow-xl ${
            totalCart === 0 ? 'hidden' : ''
          } `}
        >
          <div className="card-body">
            <div className="selectAll flex gap-5 items-center justify-between">
              <input
                type="checkbox"
                className="h-3 w-3"
                onChange={() => setIsCheck(!isCheck)}
                checked={isCheck}
              />
              <p>Pilih Semua</p>
            </div>
            <div className="div">
              {/* {console.log(carts)} */}
              {carts.map((value, idx) => {
                return (
                  <CartCard
                    key={idx}
                    cart={value}
                    check={isCheck}
                    setCheck={setIsCheck}
                    // isForceCheck={isForceCheck}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className={`noCart ${totalCart === 0 ? '' : 'hidden'} `}>
          <div className="p">Start Add Product to cart</div>
        </div>
        <div className="card card-compact w-[30%] bg-base-100 shadow-xl h-fit fixed right-12  ">
          <div className="card-body">
            <div className="promo">promo</div>
            <div className="ringkasan">
              <p className="my-3 text-[24px] font-bold">Ringkasan Belanja</p>
            </div>
            <div className="details py-3 border-b border-[#D5D7DD]">
              <div className="detailPrice flex justify-between text-[16px]">
                <p>Total Harga ({activeCart} barang)</p>
                <span>Rp{totalPrice.toLocaleString(['id'])}</span>
              </div>
              <div className="detailDiscount flex justify-between text-[16px]">
                <p>Total Diskon Barang</p>
                <span>-Rp{discount.toLocaleString(['id'])}</span>
              </div>
            </div>
            <div className="lastPrice flex justify-between text-[24px] my-2 font-bold">
              <p>Total Harga</p>
              <span className="">
                Rp{(totalPrice - discount).toLocaleString(['id'])}
              </span>
            </div>
            <div className="orderNow pt-5">
              <button
                className="btn btn-md btn-primary w-full text-white"
                onClick={() => {
                  // checkoutAsync();
                }}
              >
                Bayar ({activeCart})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
