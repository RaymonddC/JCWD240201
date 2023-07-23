import { useDispatch } from 'react-redux';
import { updateIsMain } from '../../API/addressAPI';
import { getUserAddressAsync } from '../../Features/Address/AddressSlice';
import { toast } from 'react-hot-toast';
import DeleteAddressModal from './deleteAddressModal';
import AddressModal from './addressModal';
import { useState } from 'react';

export default function CardAddress(props) {
  const dispatch = useDispatch();
  const [openAddressModal, setOpenAddressModal] = useState(false);

  const selectHandler = async () => {
    try {
      const response = await updateIsMain(
        props?.data?.id,
        localStorage.getItem('token'),
      );
      if (response.data.success) {
        dispatch(getUserAddressAsync());
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className={
        props?.data?.is_main
          ? 'p-4 flex flex-col lg:flex-row gap-2 justify-between border border-primary bg-green-50 rounded-lg'
          : 'p-4 flex flex-col lg:flex-row gap-2 justify-between border border-primary rounded-lg'
      }
    >
      <div>
        <h4 className="font-bold text-[18px] line-clamp-1">
          {props?.data?.reciever}
        </h4>
        <p>{props?.data?.phone_number}</p>
        <p>{props?.data?.address}</p>
        <div className="flex gap-2 font-bold">
          <p
            onClick={() => setOpenAddressModal(true)}
            className="text-primary text-[15px] cursor-pointer"
          >
            Update
          </p>
          <DeleteAddressModal id={props?.data?.id} />
        </div>
        {openAddressModal ? (
          <AddressModal
            openAddressModal={openAddressModal}
            closeModal={() => setOpenAddressModal(false)}
            data={props?.data}
          />
        ) : null}
      </div>
      <div className="grid place-items-center">
        {props.data.is_main ? null : (
          <button
            onClick={selectHandler}
            className="w-full btn btn-active btn-primary text-white"
          >
            Select
          </button>
        )}
      </div>
    </div>
  );
}
