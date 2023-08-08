import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateConfirmationPrescriptionCartSlice } from '../../Features/Cart/CartSlice';

export default function DeclinePrescriptionModal(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { id } = useParams();

  const reasonRef = useRef();

  const deleteHandler = async () => {
    if (!reasonRef?.current?.value) return toast.error('Please input a reason');
    dispatch(
      updateConfirmationPrescriptionCartSlice(
        id,
        false,
        navigate,
        reasonRef?.current?.value,
      ),
    );
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="btn btn-primary btn-outline"
      >
        Decline
      </button>

      <input
        readOnly
        checked={open}
        type="checkbox"
        id={`modal_delete_${props?.id}`}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box w-fit flex flex-col items-center">
          <h3 className="font-bold text-lg mb-4">Decline Prescription</h3>
          <p className="font-normal">
            Are you sure want to decline this prescription?
          </p>
          <p className="font-normal text-center">
            You cannot restore a prescription that has been decline.
          </p>
          <p>Reason why you want to decline this prescription</p>
          <input
            type="text"
            ref={reasonRef}
            className="input input-bordered input-primary w-full max-w-xs mt-1"
            placeholder="Input Reason"
          />
          <div className="modal-action">
            <button
              onClick={() => setOpen(false)}
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
