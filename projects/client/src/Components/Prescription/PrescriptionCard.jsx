import { useState } from 'react';
import CopyPrescriptionModal from './CopyPrescriptionModal';

export default function PrescriptionCard(props) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="rounded-xl border-2 border-black flex flex-col w-full max-w-[896px]">
      <div className="bg-primary rounded-t-lg flex justify-between p-2 text-white">
        <p>New Prescription</p>
        <p>12 Juni 2023</p>
      </div>
      <div className="flex gap-4 p-4">
        <img
          className="w-[80px] aspect-square"
          src={`${process.env.REACT_APP_API_BASE_URL}/${props?.data?.prescription_image}`}
          alt="prescription_image"
        />
        <div>
          <p>buyer's name</p>
          <button
            className="btn btn-primary text-white"
            onClick={() => setOpenModal(true)}
          >
            Make Copy
          </button>
          {openModal ? (
            <CopyPrescriptionModal
              prescription_image={`${process.env.REACT_APP_API_BASE_URL}/${props?.data?.prescription_image}`}
              open={openModal}
              closeModal={() => setOpenModal(false)}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
