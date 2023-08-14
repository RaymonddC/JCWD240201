import React, { useEffect, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTransactionSlice,
  updateTransactionHistorySlice,
} from '../../Features/Transaction/TransactionSlice';
import TxProductCard from './TxProductCard';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import TransactionStatusCard from './TransactionStatusCard';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { MdZoomIn, MdZoomOut } from 'react-icons/md';
import { TbZoomReset } from 'react-icons/tb';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

const SendOrderModal = (props) => {
  const dispatch = useDispatch();

  const sendOrder = () => {
    dispatch(
      updateTransactionHistorySlice({
        transaction_id: props.id,
        transaction_status_id: 4,
      }),
    );
  };

  useEffect(() => {
    dispatch(getTransactionSlice({ id: props.id }));
  }, []);
  return (
    <div>
      <input type="checkbox" id="send_order" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Send Order</h3>
          <p className="py-4">Are you sure want to deliver this order?</p>
          <div className="modal-action">
            <label
              htmlFor="send_order"
              className="btn btn-outline border-primary hover:border-primary hover:bg-primary"
            >
              Close
            </label>
            <label
              htmlFor="send_order"
              className="btn btn-primary text-white"
              onClick={() => sendOrder()}
            >
              Deliver
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendOrderModal;
