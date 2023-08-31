import { useState } from 'react';
// import CopyPrescriptionModal from './CopyPrescriptionModal';
import { useNavigate } from 'react-router-dom';

export default function PrescriptionCard(props) {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const dateTime = new Date(props?.data?.createdAt);
  const date = dateTime
    .toLocaleDateString('EN-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
    .split(',');

  const time = dateTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    // timeZoneName: 'short',
  });

  return (
    <div className="rounded-xl shadow-xl bg-white flex flex-col w-full max-w-[896px]">
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
            ? 'Waiting For Approval'
            : props?.data?.confirmation === true
            ? 'Accepted Prescription'
            : 'Rejected Prescription'}
        </p>
        <p>
          {date[0]}, {date[1]} {date[2]}, {time} WIB
        </p>
      </div>
      <div className="flex gap-4 p-4">
        <img
          className="w-[80px] aspect-square"
          src={`${process.env.REACT_APP_API_BASE_URL}/${props?.data?.prescription_image}`}
          alt="prescription_image"
        />
        <div className="w-full">
          <p>{props?.data?.user?.full_name}</p>
          <div className="w-full flex justify-end">
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
    </div>
  );
}
