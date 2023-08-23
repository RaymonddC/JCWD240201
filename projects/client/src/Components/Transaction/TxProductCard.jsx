import React from 'react';
import Logo from '../../utils/images/Medicore.png';

const TxProductCard = (props) => {
  return (
    <div className="flex border border-slate-200 p-3">
      <div className="prod w-2/3 flex border-r mr-2">
        <div className="img">
          <img
            className="h-11 w-11"
            src={props?.cart?.img || Logo}
            alt={Logo}
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
        <button className="border rounded-lg border-primary py-1">
          Buy Again
        </button>
      </div>
    </div>
  );
};

export default TxProductCard;
