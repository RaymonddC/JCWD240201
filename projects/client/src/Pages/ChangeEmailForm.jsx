import { useRef } from 'react';
import { useState } from 'react';
import { MdKeyboardBackspace } from 'react-icons/md';
import { sendResetForm, sendVerificationEmail } from '../API/authAPI';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { updateEmailAPI } from '../API/userAPI';
import { useDispatch } from 'react-redux';
import { onSaveUser } from '../Features/User/UserSlice';

export default function ChangeEmailForm() {
  const _email = useRef();
  const navigate = useNavigate();
  const { token_email } = useParams();
  const [emailValidation, setEmailValidation] = useState(false);
  const [disable, setDisable] = useState(false);
  const dispatch = useDispatch();

  //email validation
  const onEmail = (email) => {
    const isEmail = new RegExp(/\S+@\S+.\S+/);
    if (isEmail.test(email)) {
      setEmailValidation(true);
    } else {
      setEmailValidation(false);
    }
  };
  // console.log(`Tokennya nih >>> ${token}`);

  //send reset password form
  const onSendRequest = async () => {
    try {
      setDisable(true);
      let token = localStorage.getItem('token');
      const result = await updateEmailAPI(
        _email?.current?.value,
        token,
        token_email,
      );
      const sendVerifyEmail = await sendVerificationEmail(
        _email?.current?.value,
      );

      if (result.data?.success && sendVerifyEmail?.data?.success) {
        if (token) {
          localStorage.removeItem('token');
          await dispatch(onSaveUser({}));
        }
        navigate('/login');
        toast.success(result.data?.message);
        _email.current.value = '';
        setDisable(false);
      }
    } catch (error) {
      setDisable(false);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <>
      <div className="flex gap-4 border-b-2 h-14 p-3">
        <div className="flex items-center">
          <MdKeyboardBackspace size={25} />
        </div>
        <div className="flex items-center font-semibold">
          Request Change Email
        </div>
      </div>
      <div className="lg:flex lg:justify-center lg:py-12 md:flex md:justify-center md:py-12">
        <div className="flex flex-col gap-4 p-4 lg:w-full lg:max-w-lg md:w-full md:max-w-lg">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Enter your new email</span>
            </label>
            <input
              type="text"
              placeholder="Email"
              className={
                emailValidation
                  ? 'input input-bordered w-full'
                  : 'input input-bordered input-error w-full'
              }
              ref={_email}
              onChange={(e) => onEmail(e?.target?.value)}
            />
            {emailValidation ? null : (
              <div className="label-text">Invalid email</div>
            )}
          </div>
          <button
            onClick={() => onSendRequest()}
            className="btn btn-primary w-full text-white"
            disabled={disable || !emailValidation ? true : false}
          >
            Send Request
          </button>
        </div>
      </div>
    </>
  );
}
