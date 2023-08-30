import React, { useEffect, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionSlice } from '../../Features/Transaction/TransactionSlice';
import TxProductCard from './TxProductCard';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import TransactionStatusCard from './TransactionStatusCard';
import moment from 'moment';

const TransactionModal = (props) => {
  const dispatch = useDispatch();

  const { transaction } = useSelector((state) => state.transaction);

  const [openStatus, setOpenStatus] = useState(false);
  const txActiveStatus = transaction.transaction_histories?.slice(-1)[0];
  useEffect(() => {
    dispatch(getTransactionSlice({ id: props.id }));
  }, []);

  const dateTime = new Date(transaction?.createdAt);
  const date = moment(dateTime);

  return (
    <div>
      <input
        readOnly
        checked={props.openTransactionModal}
        type="checkbox"
        id="my_modal_6"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box px-0 pt-0 text-sm relative overflow-y">
          <div className="head flex justify-between pb-2 px-6 pt-6 border-b sticky top-0 bg-white">
            <p className="text-[24px] font-bold">Detail Transaction</p>
            <label
              htmlFor="my_modal_6"
              className="items-center flex"
              onClick={props.closeModal}
            >
              <GrClose size={'24px'} />
            </label>
          </div>
          <div className="details  bg-slate-200">
            <div className="status mb-1 py-2 bg-white px-6">
              <div className="transStatus  py-2 border-b text-base">
                <div className="status flex justify-between">
                  <p className="font-bold">
                    {
                     txActiveStatus?.transaction_status?.status
                    }
                  </p>
                  <button
                    className="text-primary flex items-center gap-1"
                    onClick={() => setOpenStatus(!openStatus)}
                  >
                    {openStatus ? (
                      <>
                        See Less
                        <AiOutlineUp />
                      </>
                    ) : (
                      <>
                        See Details
                        <AiOutlineDown />
                      </>
                    )}
                  </button>
                </div>
                <div
                  className={`status border rounded-lg p-4 mt-2 flex flex-col gap-2 ${
                    openStatus ? '' : 'hidden'
                  }`}
                >
                  {transaction.transaction_histories?.map((value) => {
                    return (
                      <TransactionStatusCard
                        key={'txHistory' + value.id}
                        txHistory={value}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="detStatus py-2">
                <div className="invoice flex justify-between pb-1">
                  <p>Invoice Number</p>
                  <p>INV/20230426/MPL/21231313{transaction.id}</p>
                </div>
                <div className="buyDate flex justify-between">
                  <p>Transaction Date</p>
                  <p>{date.format('MMM DD, YYYY, HH:mm')}</p>
                </div>
              </div>
            </div>
            {props.admin ? (
              <div className="custInfo bg-white py-4 px-6 mb-1">
                <p className="font-bold pb-2 text-base">Customer info</p>
                <div className="ship grid grid-cols-4 gap-x-2 gap-y-3">
                  <div className="flex justify-between ">
                    <p>Buyer</p>
                    <p>:</p>
                  </div>
                  <p className="col-span-3">{transaction.user?.full_name}</p>
                  <div className="flex justify-between ">
                    <p>Email</p>
                    <p>:</p>
                  </div>
                  <p className="col-span-3">{transaction.user?.email}</p>
                  <div className="flex justify-between ">
                    <p>Phone number</p>
                    <p>:</p>
                  </div>
                  <p className="col-span-3">{transaction.user?.phone_number}</p>
                </div>
              </div>
            ) : (
              ''
            )}
            <div className="product bg-white py-2 px-6 mb-1">
              <p className="font-bold text-base">Product Details</p>
              <div className="products">
                <div className="grid gap-2 py-2">
                  {transaction.transaction_details?.map((value) => {
                    return <TxProductCard txDet={value} />;
                  })}
                </div>
                {/* <TxProductCard /> */}
                {/* <p>+1 More Item(s)</p>
                <p>See Less</p> */}
              </div>
            </div>
            <div className="shipment bg-white py-2 px-6 mb-1">
              <p className="font-bold py-2 text-base">Shipping info</p>
              <div className="ship grid grid-cols-4 gap-x-2 gap-y-3">
                <div className="flex justify-between ">
                  <p>Shipment</p>
                  <p>:</p>
                </div>
                <p className="col-span-3 uppercase">{transaction.shipment}</p>
                <div className="flex justify-between ">
                  <p>Resi Number</p>
                  <p>:</p>
                </div>
                <p className="col-span-3">TKP01-5X8ETD7</p>
                <div className="flex justify-between ">
                  <p>Address</p>
                  <p>:</p>
                </div>
                <div className="col-span-3">
                  <p className="font-bold">{transaction.receiver}</p>
                  <p>{transaction.phone_number}</p>
                  <p>{transaction.address}</p>
                </div>
              </div>
            </div>
            <div className="payment bg-white py-2 px-6 mb-1">
              <p className="font-bold text-base">Payment Details</p>
              <div className="method flex py-1  justify-between">
                <p>Payment Method</p>
                <p className="uppercase">
                  {transaction?.payment_method || 'Waiting'}
                </p>
              </div>
              <div className="calc border-y py-2 my-1">
                <div className="totalPrice flex justify-between">
                  <div className="items md:flex">
                    <p>Total Price </p>
                    <p>(10 items)</p>
                  </div>
                  <p>Rp{transaction.total_price?.toLocaleString(['id'])}</p>
                </div>
                <div className="shipment flex justify-between">
                  <p>Total Shipment Fee</p>
                  <p>Rp{transaction.shipment_fee?.toLocaleString(['id'])}</p>
                </div>
                <div className="discShipment flex justify-between">
                  <p>Discount</p>
                  <p>
                    -Rp{transaction.total_discount?.toLocaleString(['id']) || 0}
                  </p>
                </div>
              </div>
              <div className="total flex font-bold text-base justify-between py-1">
                <p>Total Transaction</p>
                <p>
                  Rp
                  {(
                    transaction.shipment_fee +
                    transaction.total_price -
                    transaction.total_discount
                  )?.toLocaleString(['id'])}
                </p>
              </div>
              <div className="discount bg-slate-200 rounded-lg p-2 my-1 border border-slate-400">
                <p className="">
                  Discount Rp
                  {transaction.total_discount?.toLocaleString(['id']) || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
