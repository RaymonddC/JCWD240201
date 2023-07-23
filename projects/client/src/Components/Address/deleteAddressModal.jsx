import { toast } from 'react-hot-toast';
import { deleteAddress } from '../../API/addressAPI';
import { useDispatch } from 'react-redux';
import { getUserAddressAsync } from '../../Features/Address/AddressSlice';
import { useState } from 'react';

export default function DeleteAddressModal(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const deleteHandler = async () => {
    try {
      const response = await deleteAddress(
        props.id,
        localStorage.getItem('token'),
      );

      console.log(response);

      if (response?.data?.success) {
        setOpen(false);
        toast.success(response.data.message);
        dispatch(getUserAddressAsync());
        console.log('hehe');
      }
      console.log('hehe');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-primary text-[15px] cursor-pointer"
      >
        Delete
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
          <h3 className="font-bold text-lg mb-4">Delete Address</h3>
          <p className="font-normal">
            Are you sure want to Delete This Address?
          </p>
          <p className="font-normal text-center">
            You cannot restore an address that <br />
            has been deleted.
          </p>
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
