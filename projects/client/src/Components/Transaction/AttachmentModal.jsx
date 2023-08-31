import React, { useEffect, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTransactionSlice,
  updateTransactionHistorySlice,
} from '../../Features/Transaction/TransactionSlice';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import TransactionStatusCard from './TransactionStatusCard';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { MdZoomIn, MdZoomOut } from 'react-icons/md';
import { TbZoomReset } from 'react-icons/tb';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

const AttachmentModal = (props) => {
  const dispatch = useDispatch();
  const { transaction } = useSelector((state) => state.transaction);
  const image = transaction?.image;
  const [openStatus, setOpenStatus] = useState(false);
  const [notes, setNotes] = useState('');
  const acceptPayment = async () => {
    await dispatch(
      updateTransactionHistorySlice({
        transaction_id: props.id,
        transaction_status_id: 3,
      }),
    );
    props.setToggle();
    props.closeModal();
  };
  const rejectPayment = async () => {
    await dispatch(
      updateTransactionHistorySlice({
        transaction_id: props.id,
        transaction_status_id: 1,
        notes,
      }),
    );
    props.setToggle();
    props.closeModal();
  };

  useEffect(() => {
    dispatch(getTransactionSlice({ id: props.id }));
  }, []);

  const dateTime = new Date(transaction?.createdAt);
  const date = dateTime.toLocaleString('EN-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  // .split('');

  return (
    <div>
      <input
        readOnly
        checked={props.openAttachmentModal}
        type="checkbox"
        id="see_attachment"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box px-0 pt-0 text-sm relative">
          <div className="head flex justify-between z-[1] pb-2 px-6 pt-6 border-b sticky top-0 bg-white">
            <p className="text-[15px] font-bold">
              {
                transaction.image?.split('\\')[
                  transaction.image?.split('\\').length - 1
                ]
              }
            </p>
            <label
              htmlFor="see_attachment"
              className="items-center flex"
              onClick={props.closeModal}
            >
              <GrClose size={'24px'} />
            </label>
          </div>
          <div>
            <TransformWrapper
              initialScale={1}
              initialPositionX={1}
              initialPositionY={1}
            >
              {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <div className="w-full relative flex justify-center">
                  <div className="w-[70%]">
                    <TransformComponent style={{ width: '100%' }}>
                      <img
                        className="w-full"
                        src={`${process.env.REACT_APP_API_BASE_URL}/${image}`}
                        alt="test"
                      />
                    </TransformComponent>
                    <div className="absolute bottom-2 left-20 flex gap-2">
                      <button
                        className="btn btn-circle btn-sm"
                        onClick={() => zoomOut()}
                      >
                        <MdZoomOut size="24px" />
                      </button>
                      <button
                        className="btn btn-circle btn-sm"
                        onClick={() => resetTransform()}
                      >
                        <TbZoomReset size="24px" />
                      </button>
                      <button
                        className="btn btn-circle btn-sm"
                        onClick={() => zoomIn()}
                      >
                        <MdZoomIn size="24px" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </TransformWrapper>
            <div className="flex flex-col items-center gap-5 pt-5">
              <ConfirmationModal
                title="Confirmation"
                textLine1="Are you sure you want to accept this payment?"
                label="accept"
                labelStyle="text-white"
                styling="btn btn-primary w-[80%] "
                confirm={acceptPayment}
              />

              <ConfirmationModal
                title="reject"
                textLine1="Are you sure you want to reject this payment?"
                label="decline"
                styling="btn btn-outline btn-error w-[80%]"
                inputBox={true}
                setNotes={setNotes}
                confirm={rejectPayment}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttachmentModal;
