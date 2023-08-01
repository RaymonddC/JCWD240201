import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import Logo from '../../utils/images/logoHealthyMed.svg';
import { Link } from 'react-router-dom';

const TransactionCard = (props) => {
  const dispatch = useDispatch();
  const dateTime = new Date(props.tx.createdAt);
  const date = dateTime
    .toLocaleDateString('EN-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    .split(',');

  const time = dateTime.toLocaleTimeString();

  const txDetail = props.tx.transaction_details[0];

  return (
    <div className="div border-t border-[#D5D7DD] text-[16px] p-2 card card-compact bg-base-100 shadow-md my-2 ">
      <div className="headerStatus flex justify-between py-3">
        <p>
          {date[0]}, {date[1]} {date[2]}, {time} WIB
        </p>
        <p>Menunggu</p>
      </div>
      <div className="product flex justify-between  border border-x-0 py-3">
        <div className="img">
          <img
            className="h-20 w-20"
            src={props?.cart?.img || Logo}
            alt={Logo}
          />
        </div>
        <div className="detail flex-grow px-5">
          <Link>
            <p>{txDetail.product_name}</p>
          </Link>
          <p>{txDetail.qty} Strip</p>
          {props.tx.transaction_details.length <= 1 ? (
            ''
          ) : (
            <p>+ {props.tx.transaction_details.length - 1} produk lainnya</p>
          )}
        </div>
        <div className="price w-[20%] text-center">
          <p>Total Belanja</p>
          <p>Rp. 100.000</p>
        </div>
      </div>
      <div className="action flex justify-end gap-5 items-center text-primary py-2">
        <p>Lihat Detail Transaksi</p>
        <button className="btn btn-sm btn-primary text-white">Lacak</button>
      </div>
    </div>
  );
};

export default TransactionCard;
