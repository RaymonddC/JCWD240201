import React from 'react';
import { useDispatch } from 'react-redux';
import { newActivePromo } from '../../Features/Cart/CartSlice';

const PromotionCard = (props) => {
  // const dateTime = new Date(props.promotion.date_end);
  // const date = dateTime
  //   .toLocaleDateString('EN-us', {
  //     weekday: 'long',
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric',
  //   })
  //   .split(',');
  console.log(props.id, props.promotion.id);
  return (
    <div
      className={`promo border  rounded-lg p-3 ${
        props.id === props.promotion.id ? 'bg-green-50 border-primary' : ''
      }`}
      onClick={() =>
        props.setSelectedPromo({
          id: props.promotion.id,
          amount: props.promotion.totalDiscount,
        })
      }
    >
      <p className="font-bold text-lg">
        Discount {props.promotion.discount}% (Rp
        {props.promotion.totalDiscount?.toLocaleString(['id'])})
      </p>
      <div className="block md:flex">
        {props.promotion.minimum_transaction ? (
          <p>
            min. transaction: Rp
            {(props.promotion.minimum_transaction || 0).toLocaleString([
              'id',
            ])}{' '}
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
      <p>Ends in 2h50m</p>
    </div>
  );
};

export default PromotionCard;
