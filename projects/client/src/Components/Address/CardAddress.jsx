import { useDispatch } from 'react-redux';
import { updateIsMain, updateIsSelected } from '../../API/addressAPI';
import { getUserAddressAsync } from '../../Features/Address/AddressSlice';
import { toast } from 'react-hot-toast';
import DeleteAddressModal from './deleteAddressModal';
import AddressModal from './addressModal';
import { useState } from 'react';
import ConfirmationMainAddressModal from './ConfirmationMainAddressModal';

export default function CardAddress(props) {
  const dispatch = useDispatch();
  const [openAddressModal, setOpenAddressModal] = useState(false);

  const selectHandler = async () => {
    try {
      const response = await updateIsSelected(
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
        props?.data?.is_selected
          ? 'p-4 flex flex-col lg:flex-row gap-2 justify-between border border-primary bg-green-50 rounded-lg'
          : 'p-4 flex flex-col lg:flex-row gap-2 justify-between border border-primary rounded-lg'
      }
    >
      <div>
        {props?.data?.is_main ? (
          <p className="text-primary font-bold">Main Address</p>
        ) : null}
        <h4 className="font-bold text-[18px] line-clamp-1">
          {props?.data?.reciever}
        </h4>
        <p>{props?.data?.phone_number}</p>
        <p className="line-clamp-1">{props?.data?.address}</p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-[14px] font-bold sm:items-center mt-2">
          <p
            onClick={() => setOpenAddressModal(true)}
            className="text-primary cursor-pointer"
          >
            Update
          </p>
          {!props?.data?.is_main && !props?.data?.is_selected ? (
            <>
              <ConfirmationMainAddressModal id={props?.data?.id} />
              <DeleteAddressModal id={props?.data?.id} />
            </>
          ) : !props?.data?.is_main && props?.data?.is_selected ? (
            <>
              <ConfirmationMainAddressModal selected id={props?.data?.id} />
              <DeleteAddressModal id={props?.data?.id} />
            </>
          ) : null}
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
        {props.data.is_selected ? null : (
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
