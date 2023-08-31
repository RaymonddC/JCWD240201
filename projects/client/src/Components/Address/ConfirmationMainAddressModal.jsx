import { toast } from 'react-hot-toast';
import {
  deleteAddress,
  updateIsMain,
  updateIsSelected,
} from '../../API/addressAPI';
import { useDispatch } from 'react-redux';
import { getUserAddressAsync } from '../../Features/Address/AddressSlice';
import { useState } from 'react';

export default function ConfirmationMainAddressModal(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const isMainhandler = async () => {
    try {
      const response = await updateIsMain(
        props.id,
        localStorage.getItem('token'),
      );

      if (response?.data?.success) {
        setOpen(false);
        toast.success(response.data.message);
        dispatch(getUserAddressAsync());
        if (props?.checkoutPage) {
          props?.closeModalSelect();
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const isMainAndSelecthandler = async () => {
    try {
      const changeIsMain = await updateIsMain(
        props.id,
        localStorage.getItem('token'),
      );
      const changeIsSelected = await updateIsSelected(
        props.id,
        localStorage.getItem('token'),
      );

      if (changeIsMain?.data?.success && changeIsSelected?.data?.success) {
        setOpen(false);
        toast.success(changeIsMain.data.message);
        dispatch(getUserAddressAsync());
        if (props?.checkoutPage) {
          props?.closeModalSelect();
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {props?.selected ? (
        <button
          onClick={() => setOpen(true)}
          className="w-fit text-primary cursor-pointer"
        >
          Make it main
        </button>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="w-fit text-primary cursor-pointer text-left"
        >
          Make it main & select
        </button>
      )}

      <input
        readOnly
        checked={open}
        type="checkbox"
        id={`modal_delete_${props?.id}`}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box w-fit flex flex-col items-center">
          <h3 className="font-bold text-lg mb-4">Make the main address?</h3>
          <p className="font-normal text-center w-full">
            Are you sure want to make this Address main?
          </p>
          <p className="font-normal text-center w-full">
            You can only choose one main address
          </p>
          <div className="mt-4 flex gap-2 flex-col-reverse sm:flex-row">
            <button
              onClick={() => setOpen(false)}
              className="btn btn-outline border-primary hover:border-primary hover:bg-primary"
            >
              Cancel
            </button>
            <button
              onClick={props?.selected ? isMainhandler : isMainAndSelecthandler}
              className="btn bg-primary text-white hover:bg-primary"
            >
              Make this main address
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
