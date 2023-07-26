import React from 'react';
import { AnalyzeCard } from './AnalyzeCard';

export const Analysis = (props) => {
  return (
    <div>
      <p className="font-bold text-[20px] leading-6">Analisis Produk & Toko</p>
      <p className="text-[14px] leading-5">
        Update Terakhir: 20 Januari 2022, 14.30 WIB
      </p>
      <div className="div flex justify-between my-4">
        <AnalyzeCard title="Profit Hari Ini" />
        <AnalyzeCard title="Total Pemesanan Hari Ini " />
        <AnalyzeCard title="Sisa Stok Hari Ini" />
      </div>
    </div>
  );
};
