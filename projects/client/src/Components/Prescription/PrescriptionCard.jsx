import { useState } from 'react';
// import CopyPrescriptionModal from './CopyPrescriptionModal';
import { useNavigate } from 'react-router-dom';

export default function PrescriptionCard(props) {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  // console.log(props);

  return (
    <div className="rounded-xl border-2 border-black flex flex-col w-full max-w-[896px]">
      <div
        className={`${
          props?.data?.confirmation === null
            ? 'bg-primary'
            : props?.data?.confirmation === true
            ? 'bg-secondary'
            : 'bg-error'
        } rounded-t-lg flex justify-between p-2 text-white`}
      >
        <p>
          {props?.data?.confirmation === null
            ? 'New Prescription'
            : props?.data?.confirmation === true
            ? 'Accepted Prescription'
            : 'Rejected Prescription'}
        </p>
        <p>{props?.data?.createdAt}</p>
      </div>
      <div className="flex gap-4 p-4">
        <img
          className="w-[80px] aspect-square"
          src={`${process.env.REACT_APP_API_BASE_URL}/${props?.data?.prescription_image}`}
          alt="prescription_image"
        />
        <div>
          <p>{props?.data?.user?.full_name}</p>
          <button
            className={`btn btn-primary text-white ${
              props?.data?.confirmation !== null ? 'hidden' : ''
            }`}
            onClick={() => navigate(`/prescription/${props?.data?.id}`)}
          >
            Make Copy
          </button>
        </div>
      </div>
    </div>
  );
}
