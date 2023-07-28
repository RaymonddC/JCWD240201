import { useSelector } from 'react-redux';
import { useState } from 'react';
import ModalSelectAddress from './ModalSelectAddress';
import AddressModal from '../Address/addressModal';

export default function CheckoutAddress() {
  const { address, editAddressData } = useSelector((state) => state.address);
  const [openSelectAddress, setOpenSelectAddress] = useState(false);
  const [openEditAddress, setopenEditAddress] = useState(false);
  const [openAddAddress, setopenAddAddress] = useState(false);

  return (
    <div>
      <h2 className="w-full font-bold text-[18px] pb-2 border-b-2 border-[#DBDEE2]">
        Shipping Address
      </h2>
      {address?.map((value) => {
        if (value.is_selected) {
          return (
            <div key={value.id} className="py-2 border-b-2 border-[#DBDEE2]">
              <p>
                {value.reciever}{' '}
                {value?.is_main ? (
                  <span className="text-primary font-bold ml-2">Main</span>
                ) : null}
              </p>
              <p>{value.phone_number}</p>
              <p>{value.address}</p>
              {/* <p>{`${value.city_id}, ${value.province_id}`}</p> */}
            </div>
          );
        }
      })}
      <div className="py-4 border-b-2 border-[#DBDEE2]">
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
