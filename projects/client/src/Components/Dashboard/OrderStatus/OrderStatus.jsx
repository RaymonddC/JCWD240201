import React from 'react';
import { OrderCard } from './OrderCard';

export const OrderStatus = (props) => {
  return (
    <div className="penting">
      <p className="font-bold text-[20px] leading-6">Penting Hari Ini</p>
      <p className="text-[14px] leading-5">
        Aktivitas yang perlu kamu ketahui untuk menjaga kepuasan pelanggan
      </p>
      <div className="div grid grid-cols-3 gap-4 my-4">
        <OrderCard title="Pesanan Baru" />
        <OrderCard title="Menunggu Racikan" />
        <OrderCard title="Siap Dikirim" />
        <OrderCard title="Sedang Dikirim" />
        <OrderCard title="Selesai" />
        <OrderCard title="Dibatalkan" />
        <OrderCard title="Chat Baru" />
      </div>
    </div>
  );
};
