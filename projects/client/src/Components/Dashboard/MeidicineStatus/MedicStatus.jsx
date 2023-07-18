import React from 'react';

export const MedicStatus = (props) => {
  return (
    <div className="kadaluarsa flex flex-col">
      <p className="font-bold text-[20px] leading-6">Kedaluwarsa Obat</p>
      <p className="text-[14px] leading-5">
        Cek tanggal kedaluwarsa untuk mengorganisir stok obat
      </p>
      <div className="card card-compact w-full bg-base-100 shadow-xl my-4">
        {/* <div className="bg flex flex-col "> */}
        <div className="card-body flex flex-row justify-between items-center">
          <div className="div">
            <p className="card-title">Telah Kadaluarsa</p>
          </div>
          <div className="right text-[red]">
            <p className="card-title">17</p>
          </div>
        </div>
        <div className="card-body flex flex-row justify-between items-center">
          <div className="div">
            <p className="card-title">Kedaluwarsa Bulan Ini</p>
          </div>
          <div className="right text-[#FFDE6B]">
            <p className="card-title">5</p>
          </div>
        </div>
        <div className="card-body flex flex-row justify-between items-center">
          <div className="div">
            <p className="card-title">Kedaluwarsa 3 Bulan Kedepan</p>
          </div>
          <div className="right text-[#21CDC0]">
            <p className="card-title">3</p>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};
