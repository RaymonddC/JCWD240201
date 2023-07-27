import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProvinceAsync,
  getUserAddressAsync,
} from '../Features/Address/AddressSlice';

export default function Checkout() {
  const dispatch = useDispatch();
  const { carts, totalCart, totalPrice, activeCart, discount } = useSelector(
    (state) => state?.cart,
  );
  const { address, loadAddress } = useSelector((state) => state.address);

  useEffect(() => {
    dispatch(getUserAddressAsync());
  }, []);

  return (
    <div className="flex justify-between">
      <div>
        {carts?.map((value) => {
          if (value?.is_check) {
            return (
              <div key={value?.id}>
                <p>{value?.product?.name}</p>
              </div>
            );
          }
        })}
        {loadAddress === false && !address.length ? (
          <div className="flex flex-col items-center">
            <h3 className="text-[18px] font-bold">
              Oops! You haven't set an address yet
            </h3>
            <p>Please set your address by clicking Add Address</p>
          </div>
        ) : null}
      </div>
      <div
        className={`card card-compact w-full bottom-0 fixed md:sticky md:top-0 md:bottom-[15vh] lg:top-[11em] md:w-[30%] bg-base-100 shadow-xl h-fit  md:right-12  ${
          totalCart === 0 ? 'hidden' : ''
        }`}
      >
        <div className="card-body">
          <div className="promo">promo</div>
          <div className="summary hidden md:block">
            <div className="ringkasan ">
              <p className="md:my-3 text-[1em] md:text-[2em] font-bold leading-7">
                Ringkasan Belanja
              </p>
            </div>
            <div className="details py-3 border-b border-[#D5D7DD]">
              <div className="detailPrice flex justify-between text-[16px]">
                <p>
                  Total Harga <br /> ({activeCart} barang)
                </p>
                <span>Rp{totalPrice.toLocaleString(['id'])}</span>
              </div>
              <div className="detailDiscount flex justify-between text-[16px]">
                <p>Total Diskon Barang</p>
                <span>-Rp{discount.toLocaleString(['id'])}</span>
              </div>
            </div>
          </div>
          <div className="total flex md:block items-center">
            <div className="lastPrice md:flex flex-grow justify-between  my-2 ">
              <p className="md:font-bold text-[0.8em] md:text-[1.5em] lg:text-[2em]">
                Total Harga
              </p>
              <span className="font-bold text-[1em] md:text-[1.5em] lg:text-[2em]">
                Rp{(totalPrice - discount).toLocaleString(['id'])}
              </span>
            </div>
            <div className="orderNow  md:pt-5">
              <button
                className="btn btn-sm md:btn-md  btn-primary w-full text-white"
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
}
