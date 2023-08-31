import { toast } from 'react-hot-toast';
import { deleteAddress } from '../../API/addressAPI';
import { useDispatch } from 'react-redux';
import { getUserAddressAsync } from '../../Features/Address/AddressSlice';
import { useState } from 'react';
import { deletePrescriptionCartProductSlice } from '../../Features/PrescriptionCart/PrescriptionCartSlice';
import { useParams } from 'react-router-dom';
import { MdDeleteOutline, MdModeEdit } from 'react-icons/md';

export default function DeletePrescriptionListModal(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { id } = useParams();

  const deleteHandler = async () => {
    dispatch(deletePrescriptionCartProductSlice(id, props?.id));
  };

  return (
    <>
      <MdDeleteOutline
        className="cursor-pointer"
        onClick={() => setOpen(true)}
        size="24px"
      />

      <input
        readOnly
        checked={open}
        type="checkbox"
        id={`modal_delete_${props?.id}`}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box w-fit flex flex-col items-center">
          <h3 className="font-bold text-lg mb-4">Delete Product from list</h3>
          <p className="font-normal">
            Are you sure want to Delete This Product from list?
          </p>
          {/* <p className="font-normal text-center">
            You cannot restore an address that has been deleted.
          </p> */}
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
