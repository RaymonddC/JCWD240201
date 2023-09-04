import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ModalSelectAddress from './ModalSelectAddress';
import AddressModal from '../Address/addressModal';
import {
  getCityUserSlice,
  getProvinceAsync,
  getUserAddressAsync,
} from '../../Features/Address/AddressSlice';

export default function CheckoutAddress() {
  const { editAddressData, selectedAddress, cityUser } = useSelector(
    (state) => state.address,
  );
  const dispatch = useDispatch();
  const [openSelectAddress, setOpenSelectAddress] = useState(false);
  const [openEditAddress, setopenEditAddress] = useState(false);
  const [openAddAddress, setopenAddAddress] = useState(false);

  useEffect(() => {
    dispatch(getUserAddressAsync());
    dispatch(getProvinceAsync());
  }, []);

  useEffect(() => {
    dispatch(getCityUserSlice(selectedAddress?.id));
  }, [selectedAddress]);

  return (
    <div className="shadow-md p-4 rounded-xl bg-base-100">
      <h2 className="w-full font-bold text-[18px] pb-2 border-b-2 border-[#D5D7DD]">
        Shipping Address
      </h2>
      <div className="py-2 border-b-2 border-[#D5D7DD]">
        <p>
          {selectedAddress?.receiver}
          {selectedAddress?.is_main ? (
            <span className="text-primary font-bold ml-2">Main</span>
          ) : null}
        </p>
        <p>{selectedAddress?.phone_number}</p>
        <p>
          {selectedAddress?.address}{' '}
          {selectedAddress?.notes ? `(${selectedAddress?.notes})` : null}
        </p>
        <p>
          {selectedAddress?.city_name}, {selectedAddress?.province_name}
        </p>
      </div>
      <div className="pt-2">
        <button
          onClick={() => setOpenSelectAddress(true)}
          className="btn btn-primary text-white"
        >
          Choosee Other Address
        </button>
      </div>
      <ModalSelectAddress
        open={openSelectAddress}
        closeModal={() => setOpenSelectAddress(false)}
        openAddAddress={() => setopenAddAddress(true)}
        openEditAddress={() => setopenEditAddress(true)}
      />
      {openAddAddress ? (
        <AddressModal
          addAddress
          checkoutPage
          openAddressModal={openAddAddress}
          closeModal={() => setopenAddAddress(false)}
          openSelectAddress={() => setOpenSelectAddress(true)}
        />
      ) : null}
      {openEditAddress ? (
        <AddressModal
          checkoutPage
          openAddressModal={openEditAddress}
          closeModal={() => setopenEditAddress(false)}
          openSelectAddress={() => setOpenSelectAddress(true)}
          data={editAddressData}
        />
      ) : null}
    </div>
  );
}
