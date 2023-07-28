import { useSelector } from 'react-redux';
import CardAddress from '../Address/CardAddress';
import AddressModal from '../Address/addressModal';
import { useState } from 'react';

export default function ModalSelectAddress(props) {
  const { address, loadAddress } = useSelector((state) => state.address);
  const [openAddressModal, setOpenAddressModal] = useState(false);

  return (
    <>
      {/* Put this part before </body> tag */}
      <input
        readOnly
        checked={props?.open}
        type="checkbox"
        id="my_modal_6"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box max-w-[600px]">
          <div className="flex flex-col justify-center mb-4">
            <h2 className="font-bold text-center text-[24px]">
              Select Shipment Address
            </h2>
            <button
              className="btn btn-primary w-full text-white"
              onClick={() => {
                props?.closeModal();
                props?.openAddAddress();
              }}
            >
              ADD NEW ADDRESS
            </button>
          </div>
          <div className="grid gap-4 h-[400px] overflow-y-scroll">
            {address.map((value) => {
              return (
                <CardAddress
                  checkoutPage
                  key={value.id}
                  closeSelectModal={() => props?.closeModal()}
                  data={value}
                  openEditAddress={() => props?.openEditAddress()}
                />
              );
            })}
          </div>

          <div className="modal-action">
            <button
              onClick={() => props?.closeModal()}
              htmlFor="my_modal_6"
              className="btn"
            >
              Close!
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
