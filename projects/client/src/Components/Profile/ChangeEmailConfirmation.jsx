import { MdModeEdit } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { sendChangeEmailFormAPI } from '../../API/userAPI';

export default function ChangeEmailConfirmation(props) {
  const [openModal, setOpenModal] = useState(false);
  const [load, setLoad] = useState(false);
  const changeEmailHandler = async () => {
    try {
      setLoad(true);
      let token = localStorage.getItem('token');
      const result = await sendChangeEmailFormAPI(props?.email, token);
      if (result.data.success) {
        toast.success(result.data.message);
        setOpenModal(false);
        setLoad(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoad(false);
    }
  };
  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="md:text-[16px] text-[14px] text-primary cursor-pointer"
      >
        <MdModeEdit size={'21px'} />
      </button>

      <input
        readOnly
        checked={openModal}
        type="checkbox"
        id="email-confirmation"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box max-w-[320px]">
          <h3 className="font-bold text-lg text-center">Change Email</h3>
          <p className="py-1 text-center">Are you want to change Email?</p>
          <p className="pt-1 text-center">We will send you a form via email</p>
          <div className="modal-action flex justify-center">
            <button
              disabled={load}
              className="btn btn-outline btn-primary hover:!text-white"
              onClick={() => setOpenModal(false)}
            >
              No
            </button>
            <button
              disabled={load}
              className="btn btn-primary text-white"
              onClick={changeEmailHandler}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
