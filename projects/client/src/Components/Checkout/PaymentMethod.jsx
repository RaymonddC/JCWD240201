import React from 'react';
import { useDispatch } from 'react-redux';

export default function PaymentMethod(props) {
  return (
    <div className="shadow-md p-4 rounded-xl">
      <h2 className="w-full font-bold text-[18px] pb-2 border-b-2 border-[#D5D7DD]">
        Payment Method
      </h2>
      <div className="py-2 border-b-2 border-[#D5D7DD]">
        <h3>Payment Option</h3>
        <select
          className="select select-bordered w-full max-w-xs"
          onChange={(e) => props.setPaymentMethod(e.target.value)}
        >
          <option hidden>Choose Payment</option>
          <option value="manual">Manual Transfer (Upload Payment Proof)</option>
          <option value="paymentGateway">
            Online Payment (Virtual Account, E-wallet, bank transfer, etc..)
          </option>
        </select>
      </div>
    </div>
  );
}
