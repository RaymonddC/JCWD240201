import { toast } from 'react-hot-toast';
import { deleteAddress } from '../../API/addressAPI';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAddressAsync } from '../../Features/Address/AddressSlice';
import { useState } from 'react';
import { deletePrescriptionCartProductSlice } from '../../Features/PrescriptionCart/PrescriptionCartSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { MdDeleteOutline, MdModeEdit } from 'react-icons/md';
import ProductListCard from './ProductListCard';
import { updateConfirmationPrescriptionCartSlice } from '../../Features/Cart/CartSlice';

export default function AcceptSummaryModal(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const { prescriptionCartProductList } = useSelector(
    (state) => state.PrescriptionCart,
  );

  const acceptHandler = async () => {
    dispatch(updateConfirmationPrescriptionCartSlice(id, true));
    setOpen(false);
    navigate('/prescription');
  };

  return (
    <>
      <button
        disabled={!prescriptionCartProductList.length ? true : false}
        onClick={() => setOpen(true)}
        className="btn btn-primary text-white"
      >
        Accept
      </button>

      <input
        readOnly
        checked={open}
        type="checkbox"
        id={`modal_delete_${props?.id}`}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box max-w-[900px] flex flex-col items-center">
          <h3 className="font-bold text-lg mb-4">Accept Product list</h3>
          <p className="font-normal">
            Are you sure want to Accept Product list?
          </p>
          <div className="w-full overflow-x-auto">
            <table className="min-w-full table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {prescriptionCartProductList?.length ? (
                  prescriptionCartProductList?.map((value, index) => {
                    return (
                      <ProductListCard key={index} data={value} disableAction />
                    );
                  })
                ) : (
                  <tr>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="modal-action">
            <button
              onClick={() => setOpen(false)}
              className="btn btn-outline border-primary hover:border-primary hover:bg-primary"
            >
              Cancel
            </button>
            <button
              onClick={acceptHandler}
              className="btn bg-primary text-white hover:bg-primary"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
