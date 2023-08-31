import React, { useEffect } from 'react';
import { OrderCard } from './OrderCard';
import { useSelector } from 'react-redux';

export const OrderStatus = (props) => {
  const { transactionStatusTotal } = useSelector((state) => state.dashboard);

  console.log(transactionStatusTotal);

  return (
    <div className="penting">
      <p className="font-bold text-[20px] leading-6">Penting Hari Ini</p>
      <p className="text-[14px] leading-5">
        Aktivitas yang perlu kamu ketahui untuk menjaga kepuasan pelanggan
      </p>
      <div className="div grid grid-cols-3 gap-4 my-4">
        {/* <OrderCard title="Pesanan Baru" />
        <OrderCard title="Menunggu Racikan" />
        <OrderCard title="Siap Dikirim" />
        <OrderCard title="Sedang Dikirim" />
        <OrderCard title="Selesai" />
        <OrderCard title="Dibatalkan" />
        <OrderCard title="Chat Baru" /> */}

        {transactionStatusTotal.map((value, index) => {
          return (
            <OrderCard title={value.status} total={value.total} key={index} />
          );
        })}
      </div>
    </div>
  );
};
