import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { MdPerson } from 'react-icons/md';
import { updateProfile } from '../../API/userAPI';
import { useDispatch } from 'react-redux';
import { keepLoginAsync } from '../../Features/User/UserSlice';
import { toast } from 'react-hot-toast';
import { validationUserEditModal } from '../../Helper/userHelper';

export default function UserEditModal({ data }) {
  const [open, setOpen] = useState(false);
  const [disabled, setdisabled] = useState(true);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      full_name: '',
      phone_number: '',
      gender: '',
      birthdate: '',
      profile_image: '',
    },
    validate: (values) => {
      validationUserEditModal(values);
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const result = await updateProfile(values);
        console.log(result);
        if (result.status === 200) {
          toast.success(result.data.message);
          dispatch(keepLoginAsync());
          setOpen(false);
          setSubmitting(false);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    },
  });

  if (
    disabled === true &&
    (formik.values.full_name !== data?.full_name ||
      formik.values.phone_number !== data?.phone_number ||
      formik.values.gender !== data?.gender ||
      formik.values.birthdate !== data.birthdate ||
      formik.values.profile_image)
  ) {
    setdisabled(false);
  }

  const CloseBtn = (e) => {
    e.preventDefault();
    setOpen(false);
    if (disabled === false) {
      formik.setValues({
        full_name: data.full_name,
        phone_number: data.phone_number,
        gender: data.gender,
        birthdate: data.birthdate,
      });
      formik.setFieldValue('profile_image', '');
      setdisabled(true);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  useEffect(() => {
    if (data.full_name) {
      formik.setValues({
        full_name: data.full_name,
        phone_number: data.phone_number,
        gender: data.gender,
        birthdate: data.birthdate,
        profile_image: '',
      });
      setdisabled(true);
    }
  }, [data]);
  return (
    <>
      <button
        className="btn btn-outline border-[#00A8B5] text-[#00A8B5] hover:bg-[#00A8B5] hover:border-[#00A8B5]"
        onClick={() => setOpen(true)}
      >
        EDIT
      </button>
      <input
        checked={open}
        type="checkbox"
        id="my_modal_6"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box max-w-[448px]">
          <form className="" onSubmit={formik.handleSubmit} noValidate>
            <div className="flex flex-col items-center">
              {formik?.values?.profile_image ? (
                <img
                  className="w-[100px] h-[100px] rounded-full"
                  src={URL.createObjectURL(formik.values.profile_image)}
                  alt="profile"
                />
              ) : data?.profile_image ? (
                <img
                  className="w-[100px] h-[100px] rounded-full"
                  src={`${process.env.REACT_APP_API_BASE_URL}/${data?.profile_image}`}
                  alt="profile"
                />
              ) : (
                <MdPerson className="w-[100px] h-[100px]" />
              )}

              <input
                className="hidden"
                type="file"
                name="profile_image"
                id="profile_image"
                ref={fileInputRef}
                onChange={(e) => {
                  formik.setFieldValue('profile_image', e.target.files[0]);
                }}
              />
              <label
                htmlFor="profile_image"
                className="text-[#00A8B5] font-bold"
              >
                Change Profile
              </label>
              <p className="text-[14px]">File max size 1 MB</p>
              <p className="text-[14px]">
                File must be in .JPG, .JPEG and .PNG format
              </p>
            </div>
            <label htmlFor="full_name" className="text-[14px]">
              Full Name
            </label>
            <input
              name="full_name"
              id="full_name"
              className={
                formik.errors.full_name
                  ? 'input input-error w-full px-3 mb-2 border rounded-md select-none focus:outline-none text-[14px]'
                  : 'input w-full px-3 mb-2 border border-[#00A8B5] rounded-md select-none focus:outline-none text-[14px]'
              }
              type="text"
              onChange={formik.handleChange}
              value={formik.values.full_name}
            />
            <p className="text-error text-[14px]">
              {formik?.errors?.full_name}
            </p>
            <label htmlFor="" className="text-[14px]">
              Phone Number
            </label>
            <input
              name="phone_number"
              id="phone_number"
              className={
                formik.errors.phone_number
                  ? 'input input-error w-full px-3 mb-2 border rounded-md select-none focus:outline-none text-[14px]'
                  : 'input w-full px-3 mb-2 border border-[#00A8B5] rounded-md select-none focus:outline-none text-[14px]'
              }
              type="text"
              onChange={formik.handleChange}
              value={formik.values.phone_number}
            />
            <p className="text-error text-[14px]">
              {formik?.errors?.phone_number}
            </p>
            <label htmlFor="" className="text-[14px]">
              Gender
            </label>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <input
                  id="gender"
                  type="radio"
                  name="gender"
                  className="radio border-[#00A8B5] checked:bg-[#00A8B5]"
                  checked={formik.values.gender === 'male'}
                  onChange={formik.handleChange}
                  value="male"
                />
                <span>Male</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="gender"
                  type="radio"
                  name="gender"
                  className="radio border-[#00A8B5] checked:bg-[#00A8B5]"
                  checked={formik.values.gender === 'female'}
                  onChange={formik.handleChange}
                  value="female"
                />
                <span>Female</span>
              </div>
            </div>
            <p className="text-error text-[14px]">{formik?.errors?.gender}</p>
            <label htmlFor="" className="text-[14px]">
              Date of Birth
            </label>
            <input
              className={
                formik.errors.birthdate
                  ? 'input input-error w-full px-3 mb-2 border rounded-md select-none focus:outline-none text-[14px]'
                  : 'input w-full px-3 mb-2 border border-[#00A8B5] rounded-md select-none focus:outline-none text-[14px]'
              }
              name="birthdate"
              id="birthdate"
              placeholder="Date of Birth"
              type="date"
              onChange={formik.handleChange}
              value={formik.values.birthdate}
            />
            <p className="text-error text-[14px]">
              {formik?.errors?.birthdate}
            </p>
            <button
              disabled={disabled || !formik.isValid || formik.isSubmitting}
              type="submit"
              className="btn w-full bg-[#00A8B5] text-white"
            >
              SAVE
            </button>
            <button
              className="btn btn-ghost w-full text-[#00A8B5]"
              onClick={(e) => CloseBtn(e)}
            >
              Close
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
