import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import Logo from '../../utils/images/Medicore.png';
import { Link } from 'react-router-dom';
import { BiReceipt } from 'react-icons/bi';
import TransactionModal from './TransactionModal';
import DeleteModal from '../DeleteModal/DeleteModal';
import { cancelTransaction, updateTransactionHistorySlice } from '../../Features/Transaction/TransactionSlice';
import { MdOutlineAttachment } from 'react-icons/md';
import AttachmentModal from './AttachmentModal';
import { TbTruckDelivery } from 'react-icons/tb';
import SendOrderModal from './SendOrderModal';
import moment from 'moment';
import CancelTransactionModal from './CancelTransactionModal';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

const TransactionCardAdmin = (props) => {
  const dispatch = useDispatch();
  const [openTransactionModal, setOpenTransactionModal] = useState(false);
  const [openDeleteModal, setOpenDeletemodal] = useState(false);
  const [openAttachmentModal, setOpenAttachmentModal] = useState(false);
  const [openSendOrderModal, setOpenSendOrderModal] = useState(false);
  const dateTime = new Date(props.tx.createdAt);
  const date = moment(dateTime);

  //   const actionDateTime = new Date(props.tx.createdAt);
  const txDetail = props.tx.transaction_details[0];
  const activeStatus = props?.tx?.transaction_histories?.map((value, index) => {
    if (value.is_active === true) {
      return value;
    }
  });
  const transactionStatus = activeStatus[0]?.transaction_status?.status;
const delivered= async()=>{
   await dispatch(
      updateTransactionHistorySlice({
        transaction_id: props.tx.id,
        transaction_status_id: 5,
      }),
    );
    props.setToggle();
}

  return (
    <div className="div border border-[#D5D7DD] text-[16px]  card card-compact bg-base-100 shadow-md my-2 ">
      <div className="headerStatus border-b flex justify-between py-3 px-5 items-center">
        <p>{date.format('MMM Do YYYY, HH:mm')}</p>
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
              ''
            )}
          </div>
        </div>
      </div>
      <div className="detailtx px-5">
        <div className="details flex justify-between py-3">
          <div className="product flex w-[70%] md:w-[35%] mr-2 border-r">
            <div className="img">
              <img
                className="h-20 w-20"
                src={
                  txDetail?.prescription_image ||
                  txDetail?.product?.product_images[0]?.image
                    ? `
                  ${process.env.REACT_APP_API_BASE_URL}/${
                    txDetail?.prescription_image ||
                    txDetail?.product?.product_images[0]?.image
                  }`
                    : Logo
                }
                alt={'Product'}
              />
            </div>
            <div className="detail flex-grow px-5">
              <Link to={`/products?search=${txDetail?.product_name}`}>
                <p>{txDetail?.product_name}</p>
              </Link>
              <p>
                {txDetail?.qty}{' '}
                {txDetail?.product_id !== 1
                  ? txDetail?.product?.packaging_type?.type_name
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
          <div className="userInfo md:flex w-[30%] md:w-[60%] gap-y-3 md:gap-1">
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
              <p className="uppercase">{props.tx.shipment}</p>
            </div>
          </div>
        </div>
        <div className="price sm:text-lg  text-center flex justify-between bg-[#F6FAFB] p-2">
          <div className="total md:flex items-center">
            <p className="font-bold">Total Price </p>
            <p className="text-sm">
              ({props.tx.transaction_details.length} Medicine)
            </p>
          </div>
          <p className="font-bold">
            Rp{' '}
            {(
              props.tx.total_price +
              props.tx.shipment_fee -
              props.tx.total_discount
            )?.toLocaleString(['id'])}
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
          ) : transactionStatus === 'On the way' ? (
            <ConfirmationModal
              title="Confirmation"
              textLine1="Are you sure you want to change this transaction status to 'delivered'?"
              label="confirm delivery"
              labelStyle="text-white"
              styling="btn btn-primary btn-sm "
              confirm={delivered}
            />
          ) : (
            ''
          )}

          {props?.tx?.transaction_histories[0]?.transaction_status?.status !==
            'Cancelled' &&
          props?.tx?.transaction_histories[0]?.transaction_status?.status !==
            'Complete' ? (
            // <CancelTransactionModal />
            <button
              className="btn btn-primary btn-outline btn-sm text-white "
              disabled={false}
              onClick={() => setOpenDeletemodal(true)}
            >
              Cancel Order
            </button>
          ) : (
            ''
          )}
          <div
            className={`flex justify-between  ${
              transactionStatus === 'Cancelled' ? 'flex-grow' : ''
            }`}
          >
            {transactionStatus === 'Cancelled' ? (
              <p className="text-primary">
                {!activeStatus[0]?.notes
                  ? `Cancelled by User`
                  : `You cancel this order: ${activeStatus[0].notes}`}
              </p>
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
          </div>
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
      <CancelTransactionModal
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
          setToggle={() => props.setToggle()}
        />
      ) : null}
      {openSendOrderModal ? (
        <SendOrderModal
          admin
          openSendOrderModal={openSendOrderModal}
          closeModal={() => setOpenSendOrderModal(false)}
          id={props?.tx.id}
          setToggle={() => props.setToggle()}
        />
      ) : null}
    </div>
  );
};

export default TransactionCardAdmin;
