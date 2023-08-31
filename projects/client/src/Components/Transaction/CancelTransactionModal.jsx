import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import React, { useRef } from 'react';

export default function CancelTransactionModal(props) {
  const dispatch = useDispatch();

  const reasonRef = useRef();
  const deleteHandler = async () => {
    try {
      if (!reasonRef?.current?.value)
        return toast.error('Please input a reason');
      await dispatch(
        props.delFunc({ id: props.id, notes: reasonRef?.current?.value }, () =>
          props.closeModal(),
        ),
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <input
        readOnly
        checked={props?.open}
        type="checkbox"
        id={`modal_delete_${props?.id}`}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box w-fit flex flex-col items-center">
          <h3 className="font-bold text-lg mb-4">Cancel Order</h3>
          <p className="font-normal">Are you sure want to cancel this order?</p>
          <p className="font-normal text-center">
            You cannot restore an order that has been cancel.
          </p>
          <p>{''}</p>
          <input
            type="text"
            ref={reasonRef}
            className="input input-bordered input-primary w-full max-w-xs mt-1"
            placeholder="Input Cancel Reason"
          />
          <div className="modal-action">
            <button
              onClick={() => props.closeModal()}
              className="btn btn-outline border-primary hover:border-primary hover:bg-primary"
            >
              Cancel
            </button>
            <button
              onClick={deleteHandler}
              className="btn bg-primary text-white hover:bg-primary"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
