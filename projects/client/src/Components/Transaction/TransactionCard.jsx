import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import Logo from '../../utils/images/logoHealthyMed.svg';
import { Link } from 'react-router-dom';

const TransactionCard = (props) => {
  const dispatch = useDispatch();

  return (
    <div className="div border-t border-[#D5D7DD] text-[16px] p-2 card card-compact bg-base-100 shadow-md my-2">
      <div className="headerStatus flex justify-between py-3">
        <p>Jumat, 5 April 2022, 15:45</p>
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
            <p>Bisolvon</p>
          </Link>
          <p>1 Strip</p>
          <p>produk lainnya</p>
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
