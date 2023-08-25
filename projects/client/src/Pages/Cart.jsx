import React, { useEffect, useState } from 'react';
import CartCard from '../Components/Cart/CartCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkoutAsync,
  getCartUserAsync,
  updateQtyAsync,
} from '../Features/Cart/CartSlice';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import {
  getProvinceAsync,
  getUserAddressAsync,
} from '../Features/Address/AddressSlice';
import AddressModal from '../Components/Address/addressModal';

import ProductCard from '../Components/Products/ProductCard';
import { getLabels } from '../Features/Product/ProductSlice';
import ProductListSkl from '../Components/Skeleton/ProductListSkl';

import toast from 'react-hot-toast';
import CartSummary from '../Components/Cart/CartSummary';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state?.user);
  const { address, loadAddress } = useSelector((state) => state.address);
  const [openAddressModal, setOpenAddressModal] = useState(false);

  const {
    carts,
    totalCart,
    totalPrice,
    activeCart,
    discount,
    amountPromotion,
  } = useSelector((state) => state?.cart);
  const [isCheck, setIsCheck] = useState(false);
  const [isForceCheck, setIsForceCheck] = useState(null);

  const ProductsStore = useSelector((state) => state?.products?.products);
  let productMap;
  if (totalCart === 0) {
    productMap = ProductsStore?.data?.rows?.map((value, index) => {
      return (
        <div key={`product${index}`} className="carousel-item ">
          <ProductCard data={value.product} />
        </div>
      );
    });
  }

  const handleQty = (e, calc, idx, checked) => {
    dispatch(
      updateQtyAsync({
        checked,
        newQty: Number(e?.currentTarget.value),
        calc,
        idx,
        carts,
      }),
    );
  };

  useEffect(() => {
    dispatch(getCartUserAsync());
    dispatch(getUserAddressAsync());
    dispatch(getProvinceAsync());
    if (totalCart === 0)
      dispatch(
        getLabels({
          page: 1,
          limit: 9,
          category: 'Jamu',
        }),
      );
  }, []);

  useEffect(() => {
    if (activeCart === totalCart && totalCart !== 0) setIsCheck(true);
    else setIsCheck(false);
  }, [carts, isCheck]);

  if (totalCart === 0) {
    return (
      <>
        <div className="text-lg font-bold">Start Add Product to cart</div>
        <div className=" mt-10 flex justify-end pr-[10%]">
          <article className="prose">
            <Link to="/products">
              <h3>See all</h3>
            </Link>
          </article>
        </div>
        <div className="flex flex-col mb-20 items-center justify-center">
          <div className="w-full flex pl-[15%] ">
            <article className="prose">
              <h3>Jamu</h3>
            </article>
          </div>
          <div className="flex overflow-auto w-[72%] p-4 space-x-4 rounded-box">
            {productMap ? <>{productMap}</> : <ProductListSkl limit={9} />}
          </div>
        </div>
      </>
    );
  }
  // console.log(carts);

  return (
    <div className="min-h-[50vh]">
      <p className="font-bold text-[24px] mb-9 hidden sm:block md:text-left text-center ">
        My Cart
      </p>
      <div className="flex justify-between">
        <div
          className={`card card-compact w-[100%] md:w-[65%] bg-base-100 shadow-xl mb-[7em] md:mb-0 max-w-[1000px] ${
            totalCart === 0 ? 'hidden' : ''
          } `}
        >
          <div className="card-body">
            <div className="selectAll flex gap-5 items-center justify-between">
              <input
                type="checkbox"
                className="h-3 w-3"
                onClick={() => {
                  setIsForceCheck(!isForceCheck);
                  console.log(isForceCheck);
                }}
                onChange={() => {
                  setIsCheck(!isCheck);
                }}
                checked={isCheck}
              />
              <p>Pilih Semua</p>
            </div>
            <div className="div">
              {carts.map((value, idx) => {
                return (
                  <CartCard
                    key={idx}
                    cart={value}
                    isCheck={isCheck}
                    setCheck={setIsCheck}
                    setQty={handleQty}
                    idx={idx}
                    isForceCheck={isForceCheck}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className={`noCart ${totalCart === 0 ? '' : 'hidden'} `}>
          <div className="p">Start Add Product to cart</div>
        </div>
        {/* //SummaryCard */}
        <CartSummary
          totalCart={totalCart}
          activeCart={activeCart}
          totalPrice={totalPrice}
          onSubmitText={'Proceed'}
          onSubmitFunc={() => {
            if (activeCart === 0)
              return toast.error('Select product to checkout');
            if (!address.length) return setOpenAddressModal(true);
            return navigate('/checkout');
          }}
        />
      </div>
      {openAddressModal ? (
        <AddressModal
          addAddress
          navigate={'/checkout'}
          openAddressModal={openAddressModal}
          closeModal={() => setOpenAddressModal(false)}
        />
      ) : null}
    </div>
  );
};

export default Cart;
