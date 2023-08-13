import React, { useState, useEffect, useRef } from 'react';

import { useDispatch } from 'react-redux';
import Logo from '../../utils/images/logoHealthyMed.svg';
import { Link } from 'react-router-dom';
import TransactionModal from './TransactionModal';
import InputUserFile from '../Profile/Input/InputUserFile';
import { toast } from 'react-hot-toast';
import {
  updateTransactionHistorySlice,
  uploadPaymentSlice,
} from '../../Features/Transaction/TransactionSlice';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

const TransactionCard = (props) => {
  const dispatch = useDispatch();

  const [openTransactionModal, setOpenTransactionModal] = useState(false);

  const paymentProofRef = useRef();
  const [paymentProofFile, setPaymentProofFile] = useState(null);
  const [disabled, setdisabled] = useState('dissabled');
  const dateTime = new Date(props.tx.createdAt);
  const date = dateTime
    .toLocaleDateString('EN-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    .split(',');

  const time = dateTime.toLocaleTimeString([], { hour12: false });
  const transactionStatusId =
    props?.tx?.transaction_histories[0]?.transaction_status_id;
  const transactionStatus =
    props?.tx?.transaction_histories[0]?.transaction_status?.status;
  // console.log(props);
  const transactionId = props?.tx?.id;
  const txDetail = props?.tx.transaction_details[0];
  const onSubmit = async () => {
    console.log(paymentProofFile.type.split('/')[1]);
    const imageType = paymentProofFile.type.split('/')[1];
    if (imageType !== 'jpeg' && imageType !== 'png' && imageType !== 'jpg') {
      return toast.error('Image type must be JPEG or JPG or PNG');
    }
    try {
      await dispatch(
        uploadPaymentSlice({
          transaction_status_id: transactionStatusId + 1,
          transaction_id: transactionId,
          payment_images: paymentProofFile,
        }),
      );
    } catch (error) {}
    // props?.setTogle(!props?.togle);
  };
  const confirm = async () => {
    try {
      await dispatch(
        updateTransactionHistorySlice({
          transaction_status_id: transactionStatusId + 1,
          transaction_id: transactionId,
        }),
      );
      props.setTogle(!props.togle);
    } catch (error) {}
  };

  return (
    <div className="div border-b border-[#D5D7DD] text-[16px] p-2 card card-compact bg-base-100 shadow-md my-2 ">
      <div className="headerStatus flex justify-between py-3 px-2">
        <p>
          {date[0]}, {date[1]} {date[2]}, {time} WIB
        </p>
        <p>{props.tx.transaction_histories[0].transaction_status.status}</p>
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
          <Link to={''}>
            <p>{txDetail.product_name}</p>
          </Link>
          <p>
            {txDetail.qty}{' '}
            {txDetail.product_id !== 1
              ? txDetail?.product?.packaging_type?.type_name
              : txDetail?.product?.product_type?.unit}
          </p>
          {props.tx.transaction_details.length <= 1 ? (
            ''
          ) : (
            <p>+ {props.tx.transaction_details.length - 1} produk lainnya</p>
          )}
        </div>
        <div className="price w-[20%] text-center">
          <p>Total Belanja</p>
          {/* <p>Rp. {props.tx.totalPrice}</p> */}
        </div>
      </div>
      <div className="action flex justify-end gap-5 items-center text-primary py-2">
        <button className="hover:bg-[#F6FAFB] p-1 px-2 rounded-lg">
          <label
            htmlFor="my_modal_6"
            onClick={() => setOpenTransactionModal(true)}
          >
            Lihat Detail Transaksi
          </label>
        </button>
        {transactionStatus === 'Waiting for payment' ||
        transactionStatusId === 1 ? (
          <>
            <button className="btn btn-sm btn-primary text-white">
              <input
                className="hidden"
                name="paymentProof"
                id="paymentProof"
                type="file"
                ref={paymentProofRef}
                onChange={(e) => {
                  setPaymentProofFile(e.target.files[0]);
                  setdisabled('');
                }}
              />
              <label htmlFor="paymentProof">Upload payment proof</label>
            </button>
            <button
              className="btn btn-sm btn-primary text-white "
              disabled={`${disabled}`}
              onClick={() => onSubmit()}
            >
              Submit
            </button>
          </>
        ) : transactionStatus === 'Waiting for confirmation' ||
          transactionStatusId === 2 ? (
          <button className="btn btn-sm btn-primary text-white">
            waiting confirmation
          </button>
        ) : transactionStatus === 'Process' || transactionStatusId === 3 ? (
          <button className="btn btn-sm btn-primary text-white">Process</button>
        ) : transactionStatus === 'On the way' || transactionStatusId === 4 ? (
          <>
            <button className="btn btn-sm btn-primary text-white">
              Lacak OTW
            </button>
            <button
              className="btn btn-sm btn-primary text-white"
              onClick={() => confirm()}
            >
              Confirm Arrival
            </button>
          </>
        ) : transactionStatus === 'Arrived' || transactionStatusId === 5 ? (
          <>
            <ConfirmationModal
              title="Confirmation"
              textLine1="Are you sure you want to confirm the arrival of this order?"
              label="CONFIRM ARRIVAL"
              labelStyle="text-white"
              styling="btn btn-primary btn-sm"
              confirm={confirm}
            />

            <button
              className="btn btn-sm btn-primary text-white"
              onClick={() => confirm()}
            >
              Confirm Arrival
            </button>
          </>
        ) : transactionStatus === 'Complete' || transactionStatusId === 6 ? (
          <div className="badge badge-primary">Completed</div>
        ) : (
          ''
        )}
      </div>
      {openTransactionModal ? (
        <TransactionModal
          openTransactionModal={openTransactionModal}
          closeModal={() => setOpenTransactionModal(false)}
          id={props?.tx.id}
        />
      ) : null}
    </div>
  );
};

export default TransactionCard;
