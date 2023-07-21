import React, { useEffect, useState } from 'react';
import CartCard from '../Components/Cart/CartCard';
import { useDispatch, useSelector } from 'react-redux';
import { getCartUserAsync } from '../Features/Cart/CartSlice';
import { Navigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state?.user);
  const { carts, total, totalPrice } = useSelector((state) => state?.cart);
  const [isCheck, setIsCheck] = useState(true);
  const [totalNow, setTotalNow] = useState(total);
  const [totalPriceNow, setTotalPriceNow] = useState(totalPrice);
  const [discountNow, setDiscountNow] = useState(10);
  useEffect(() => {
    dispatch(getCartUserAsync());
  }, []);

  // useEffect(() => {
  //   console.log(totalNow, total);
  //   if (totalNow === total) setIsCheck(true);
  // }, [totalNow]);

  if (Object.keys(user).length === 0) return <Navigate to={'/'} />;

  return (
    <div className="">
      <p className="font-bold text-[24px] mb-9">Keranjang Saya</p>
      <div className="flex justify-between">
        <div className="card card-compact w-[65%] bg-base-100 shadow-xl ">
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
              {console.log(carts)}
              {carts.map((value) => {
                return (
                  <CartCard
                    cart={value}
                    check={isCheck}
                    setCheck={setIsCheck}
                    total={totalNow}
                    setTotal={setTotalNow}
                    totalPrice={totalPriceNow}
                    setTotalPrice={setTotalPriceNow}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="card card-compact w-[30%] bg-base-100 shadow-xl h-fit fixed right-12  ">
          <div className="card-body">
            <div className="promo">promo</div>
            <div className="ringkasan">
              <p className="my-3 text-[24px] font-bold">Ringkasan Belanja</p>
            </div>
            <div className="details py-3 border-b border-[#D5D7DD]">
              <div className="detailPrice flex justify-between text-[16px]">
                <p>Total Harga ({totalNow} barang)</p>
                <span>Rp{totalPriceNow.toLocaleString(['id'])}</span>
              </div>
              <div className="detailDiscount flex justify-between text-[16px]">
                <p>Total Diskon Barang</p>
                <span>-Rp{discountNow.toLocaleString(['id'])}</span>
              </div>
            </div>
            <div className="lastPrice flex justify-between text-[24px] my-2 font-bold">
              <p>Total Harga</p>
              <span className="">
                Rp{(totalPriceNow - discountNow).toLocaleString(['id'])}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
