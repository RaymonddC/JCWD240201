import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { newActivePromo } from '../../Features/Cart/CartSlice';
import { toast } from 'react-hot-toast';
import moment from 'moment';

const PromotionCard = (props) => {
  const currentDate = new Date();
  const expiredDate = new Date(props.promotion.date_end);
  const endPromo = moment([
    expiredDate.getFullYear(),
    expiredDate.getMonth(),
    expiredDate.getDate(),
  ]).fromNow();

  useEffect(() => {
    if (
      props.id === props.promotion.id &&
      props.totalPrice < props.promotion.minimum_transaction
    )
      props.setSelectedPromo({
        id: null,
        amount: 0,
        minPrice: 0,
        maxPromo: null,
        promoDisc: null,
      });
  }, []);

  return (
    <button
      className={`promo border  rounded-lg p-3 flex flex-col
      ${
        props.totalPrice < props.promotion.minimum_transaction ||
        expiredDate < currentDate
          ? 'bg-gray-300 text-gray-500 cursor-default'
          : ''
      }
       ${props.id === props.promotion.id ? 'bg-green-50 border-primary' : ''}`}
      onClick={() => {
        if (props.totalPrice < props.promotion.minimum_transaction)
          return toast.error('minimum transaction');
        props.setSelectedPromo({
          id: props.promotion.id,
          amount: props.promotion.totalDiscount,
          minPrice: props.promotion.minimum_transaction,
          maxPromo: props.promotion.maximum_discount_amount,
          promoDisc: props.promotion.discount,
        });
      }}
    >
      <p className="font-bold text-lg">
        Discount {props.promotion.discount}% (Rp
        {props.promotion.totalDiscount?.toLocaleString(['id'])})
      </p>
      <div className="block md:flex gap-0.5">
        {props.promotion.minimum_transaction ? (
          <p>
            min. transaction: Rp
            {(props.promotion.minimum_transaction || 0).toLocaleString(['id'])}
          </p>
        ) : (
          ''
        )}
        {props.promotion.maximum_discount_amount ? (
          <p>
            (max. Rp
            {(props.promotion.maximum_discount_amount || 0).toLocaleString([
              'id',
            ])}
            )
          </p>
        ) : (
          ''
        )}
      </div>
      {/* <p>Ends in {dateTime}</p> */}
      <p>Ends {endPromo}</p>
    </button>
  );
};

export default PromotionCard;
