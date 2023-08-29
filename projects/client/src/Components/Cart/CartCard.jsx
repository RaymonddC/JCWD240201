import React, { useState, useEffect } from 'react';

import Logo from '../../utils/images/Medicore.png';

import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import {
  deleteCartAsync,
  updateCartAsync,
} from '../../Features/Cart/CartSlice';
import { toast } from 'react-hot-toast';
import useDebounce from '../../Hooks/useDebounce';
import DeleteModal from '../DeleteModal/DeleteModal';
import { Link } from 'react-router-dom';

const CartCard = (props) => {
  const dispatch = useDispatch();
  const [isCheckCart, setIsCheckCart] = useState(props.cart.is_check);
  const stock = props.cart.product?.closed_stocks[0]?.total_stock;
  const isRacik = props?.cart?.product?.id === 1;
  const debouncedQtyValue = useDebounce(props.cart.qty, 500, 0);
  const [openDeleteModal, setOpenDeletemodal] = useState(false);

  const discount = () => {
    let discount = 0,
      buy = 0,
      get = 0;
    props?.cart?.product?.promotions?.some((promo) => {
      if (promo?.discount)
        discount = props.cart.product.price * (promo.discount / 100);

      buy = promo?.buy;
      get = promo?.get;

      return promo.discount || promo.buy || promo.get;
    });
    return { discount, buy, get };
  };
  const [disc, setDisc] = useState(discount());

  useEffect(() => {
    if (props.isForceCheck !== null) setIsCheckCart(props.isCheck);
  }, [props.isForceCheck]);

  useEffect(() => {
    props.setQty(null, null, props.idx, isCheckCart);
    if (!isCheckCart) props.setCheck(false);
  }, [isCheckCart]);

  useEffect(() => {
    dispatch(
      updateCartAsync({
        cartId: props.cart.id,
        qty: debouncedQtyValue,
        isCheck: isCheckCart,
        stock,
      }),
    );
    // };
  }, [debouncedQtyValue, isCheckCart]);

  return (
    <div className="div border-t border-[#D5D7DD] text-[16px] p-2">
      <DeleteModal
        open={openDeleteModal}
        closeModal={() => setOpenDeletemodal(false)}
        id={props?.cart?.id}
        model={'Cart'}
        delFunc={deleteCartAsync}
      />
      <div className="product flex justify-between ">
        <div className="check">
          <div className="cursor-default flex gap-5 items-center h-full p-3 pr-5">
            <input
              type="checkbox"
              className="h-3 w-3 cursor-pointer"
              checked={props.cart.is_check}
              onClick={() => setIsCheckCart(!isCheckCart)}
              readOnly
              disabled={!props.cart.confirmation}
            />
          </div>
        </div>

        <Link to={`/products/${props.cart.product_id}`}>
          <div className="img">
            <img
              className="h-20 w-20"
              src={
                props.cart.prescription_image ||
                props.cart.product.product_images[0]?.image
                  ? `
              ${process.env.REACT_APP_API_BASE_URL}/${
                props.cart.prescription_image ||
                props.cart.product.product_images[0]?.image
              }`
                  : Logo
              }
              alt={'Product'}
            />
          </div>
        </Link>
        <div className="cartDetail lg:flex flex-grow pl-3">
          <div className="detail flex-grow pb-2">
            <Link to={`/products/${props.cart.product_id}`}>
              <p>{props?.cart?.product?.name}</p>
            </Link>
            <p>
              {props.cart.qty}{' '}
              {props?.cart?.product?.packaging_type?.type_name || 'buah'}
            </p>
            {disc.buy ? (
              <>
                <span className="text-primary">
                  Buy {disc.buy} Get {disc.get}
                </span>
                <p className="text-warning">*only applied once/transaction</p>
              </>
            ) : (
              ''
            )}
            {props.cart.product.price === 0
              ? console.log(
                  props.cart.confirmation,
                  props.cart.confirmation === false,
                  !props.cart.confirmation,
                )
              : ''}
            {Number(props.cart.product.price) === 0 ? (
              props.cart.confirmation === false ? (
                <>
                  <p className="text-error">Prescription Rejected</p>
                  <p className="text-error font-bold">
                    Reason: {props.cart.notes}
                  </p>
                </>
              ) : (
                <p className="text-warning">Waiting for Confirmation</p>
              )
            ) : (
              <p></p>
            )}
          </div>
          <div className="summary flex gap-2 leading-6 h-fit items-center">
            <p
              className={`text-[#737A8D] text-[14px] line-through ${
                (props.cart.disc || 0) === 0 ? 'hidden' : ''
              }`}
            >
              Rp {props.cart.product.price.toLocaleString(['id'])}
            </p>
            <p className={``}>
              Rp{' '}
              {(props.cart.product.price - props.cart?.disc).toLocaleString([
                
                'id',
              ])
              }
            </p>
          </div>
        </div>
      </div>
      <div className="action flex justify-end text-[#009B90] gap-3 items-center py-1">
        <div className={`join join-horizontal ${isRacik ? 'hidden' : ''}`}>
          <button
            className=" join-item bg-[#daf8ff] btn btn-sm text-[#009B90]"
            disabled={isRacik}
            onClick={(e) => {
              props.cart.qty <= 1
                ? setOpenDeletemodal(true)
                : props.setQty(e, '-', props.idx);
            }}
          >
            -
          </button>
          <input
            className="join-item bg-[#daf8ff] min-w-[50px] w-[10px] text-[#009B90] text-center"
            type="number"
            disabled={isRacik}
            onChange={(e) => {
              Number(e.currentTarget.value) === 0
                ? setOpenDeletemodal(true)
                : props.setQty(e, null, props.idx);
            }}
            value={props.cart.qty}
          />
          <button
            className={`join-item bg-[#daf8ff] btn btn-sm text-[#009B90`}
            disabled={isRacik}
            onClick={(e) => props.setQty(e, '+', props.idx)}
          >
            +
          </button>
        </div>
        <div className="delete flex items-center">
          <RiDeleteBin6Line
            size={'18px'}
            color="#009B90"
            onClick={() => {
              setOpenDeletemodal(true);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CartCard;
