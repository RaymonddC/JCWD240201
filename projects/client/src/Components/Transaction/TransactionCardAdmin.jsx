import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import Logo from '../../utils/images/logoHealthyMed.svg';
import { Link } from 'react-router-dom';
import { BiReceipt } from 'react-icons/bi';
import TransactionModal from './TransactionModal';
import DeleteModal from '../DeleteModal/DeleteModal';
import { cancelTransaction } from '../../Features/Transaction/TransactionSlice';
import { MdOutlineAttachment } from 'react-icons/md';
import AttachmentModal from './AttachmentModal';
import { TbTruckDelivery } from 'react-icons/tb';
import SendOrderModal from './SendOrderModal';

const TransactionCardAdmin = (props) => {
  const dispatch = useDispatch();
  const [openTransactionModal, setOpenTransactionModal] = useState(false);
  const [openDeleteModal, setOpenDeletemodal] = useState(false);
  const [openAttachmentModal, setOpenAttachmentModal] = useState(false);
  const [openSendOrderModal, setOpenSendOrderModal] = useState(false);
  const dateTime = new Date(props.tx.createdAt);
  const date = dateTime
    .toLocaleDateString('EN-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
    .split(',');

  const time = dateTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    // timeZoneName: 'short',
  });

  //   const actionDateTime = new Date(props.tx.createdAt);
  const txDetail = props.tx.transaction_details[0];
  const activeStatus = props?.tx?.transaction_histories?.map((value, index) => {
    if (value.is_active === true) {
      return value;
    }
  });
  const transactionStatus = activeStatus[0]?.transaction_status?.status;
  // console.log(activeStatus);
  // console.log(transactionStatus);

  return (
    <div className="div border border-[#D5D7DD] text-[16px]  card card-compact bg-base-100 shadow-md my-2 ">
      <div className="headerStatus border-b flex justify-between py-3 px-5 items-center">
        <p>
          {date[0]}, {date[1]} {date[2]}, {time} WIB
        </p>
        <div className="flex items-center">
          <div className="badge badge-accent badge-lg p-2 mx-3">
            {transactionStatus}
          </div>
          <div className="div">
            {props.tx.transaction_histories[0].transaction_status.status ===
            'Waiting for payment' ? (
              <p className="">
                <span>Action required </span>
                <span className="bg-[#FFF6D3] rounded-lg p-1 px-2">
                  {dateTime.getHours() + 2}:{dateTime.getMinutes()} WIB
                  {/* {dateTime.()} */}
                </span>
              </p>
            ) : (
              <p>
                {props.tx.transaction_histories[0].transaction_status.status}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="detailtx px-5">
        <div className="details flex justify-between py-3">
          <div className="product flex w-[35%] mr-2 border-r">
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
                  ? txDetail.product.packaging_type.type_name
                  : txDetail?.product?.product_type?.unit}
              </p>
              {props.tx.transaction_details.length <= 1 ? (
                ''
              ) : (
                <p>
                  + {props.tx.transaction_details.length - 1} produk lainnya
                </p>
              )}
            </div>
          </div>
          <div className="userInfo flex w-[60%] gap-1">
            <div className="user w-[30%]">
              <p className="font-bold">Buyer</p>
              <p>{props.tx.user?.full_name}</p>
            </div>
            <div className="address w-[40%]">
              <p className="font-bold">Address</p>
              <p>{props.tx.address}</p>
            </div>
            <div className="kurir w-[30%]">
              <p className="font-bold">Expedition</p>
              <p>{props.tx.shipment}</p>
            </div>
          </div>
        </div>
        <div className="price text-lg  text-center flex justify-between bg-[#F6FAFB] p-2">
          <div className="total">
            <span className="font-bold">Total Price </span>
            <span className="text-sm">
              ({props.tx.transaction_details.length} Medicine)
            </span>
          </div>
          <p className="font-bold">
            Rp {props.tx.total_price?.toLocaleString(['id'])}
          </p>
        </div>
        <div className="action flex justify-end gap-5 items-center px-2 py-2">
          {transactionStatus === 'Waiting for confirmation' ? (
            <button className="flex items-center gap-1 hover:bg-[#F6FAFB] py-2 px-2 rounded-lg text-secondary">
              <MdOutlineAttachment size={'1.5em'} />
              <label
                className="font-bold"
                htmlFor="see_attachment"
                onClick={() => setOpenAttachmentModal(true)}
              >
                See Attachment
              </label>
            </button>
          ) : transactionStatus === 'Process' ? (
            <button className="flex items-center gap-1 hover:bg-[#F6FAFB] py-2 px-2 rounded-lg text-secondary">
              <TbTruckDelivery size={'1.5em'} />
              <label
                className="font-bold"
                htmlFor="send_order"
                onClick={() => setOpenSendOrderModal(true)}
              >
                Send Order
              </label>
            </button>
          ) : (
            ''
          )}
          <button className="flex items-center gap-1 hover:bg-[#F6FAFB] py-2 px-2 rounded-lg text-primary">
            <BiReceipt size={'1.5em'} />
            <label
              className="font-bold"
              htmlFor="my_modal_6"
              onClick={() => setOpenTransactionModal(true)}
            >
              Transaction Details
            </label>
          </button>
          {props?.tx?.transaction_histories[0]?.transaction_status?.status !==
          'Cancelled' ? (
            <button
              className="btn btn-sm btn-error text-white "
              disabled={false}
              onClick={() => setOpenDeletemodal(true)}
            >
              Cancel Order
            </button>
          ) : (
            ''
          )}
        </div>
      </div>
      {openTransactionModal ? (
        <TransactionModal
          admin
          openTransactionModal={openTransactionModal}
          closeModal={() => setOpenTransactionModal(false)}
          id={props?.tx.id}
        />
      ) : null}{' '}
      <DeleteModal
        open={openDeleteModal}
        closeModal={() => setOpenDeletemodal(false)}
        id={props?.tx?.id}
        model={'Transaction'}
        delFunc={cancelTransaction}
      />
      {openAttachmentModal ? (
        <AttachmentModal
          admin
          openAttachmentModal={openAttachmentModal}
          closeModal={() => setOpenAttachmentModal(false)}
          id={props?.tx.id}
          setToggle={()=>props.setToggle()}
        />
      ) : null}
      {openSendOrderModal ? (
        <SendOrderModal
          admin
          openSendOrderModal={openSendOrderModal}
          closeModal={() => setOpenSendOrderModal(false)}
          id={props?.tx.id}
        />
      ) : null}
    </div>
  );
};

export default TransactionCardAdmin;
