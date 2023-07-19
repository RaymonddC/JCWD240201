import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { MdPerson } from 'react-icons/md';
import { updateProfile } from '../../API/userAPI';
import { useDispatch } from 'react-redux';
import { keepLoginAsync } from '../../Features/User/UserSlice';
import { toast } from 'react-hot-toast';
import { validationUserEditModal } from '../../Helper/userHelper';
import InputUserText from './Input/InputUserText';
import InputUserRadio from './Input/InputUserRadio';
import InputUserDate from './Input/InputUserDate';
import InputUserFile from './Input/InputUserFile';

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
    validate: validationUserEditModal,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const result = await updateProfile(values);
        if (result.data.success) {
          toast.success(result.data.message);
          dispatch(keepLoginAsync());
          setOpen(false);
          setSubmitting(false);
        }
      } catch (error) {
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

  // console.log(formik.errors);

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
        readOnly
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
              <InputUserFile
                name="profile_image"
                id="profile_image"
                refProp={fileInputRef}
                onChange={(e) => {
                  formik.setFieldValue('profile_image', e.target.files[0]);
                }}
                label="Change Profile"
              />
              <p className="text-[14px]">File max size 1 MB</p>
              <p className="text-[14px]">
                File must be in .JPG, .JPEG and .PNG format
              </p>
            </div>
            <InputUserText
              id="full_name"
              label="Full Name"
              name="full_name"
              errors={formik?.errors?.full_name}
              handleChange={formik?.handleChange}
              values={formik?.values?.full_name}
            />
            <InputUserText
              id="phone_number"
              label="Phone Number"
              name="phone_number"
              errors={formik?.errors?.phone_number}
              handleChange={formik?.handleChange}
              values={formik?.values?.phone_number}
            />
            <label htmlFor="" className="text-[14px]">
              Gender
            </label>
            <div className="flex gap-4">
              <InputUserRadio
                formikValues={formik?.values?.gender}
                values="male"
                handleChange={formik?.handleChange}
                label="Male"
              />
              <InputUserRadio
                formikValues={formik?.values?.gender}
                values="female"
                handleChange={formik?.handleChange}
                label="Female"
              />
            </div>
            <p className="text-error text-[14px]">{formik?.errors?.gender}</p>
            <InputUserDate
              id="birthdate"
              label="Date of Birth"
              name="birthdate"
              errors={formik?.errors?.birthdate}
              handleChange={formik.handleChange}
              values={formik?.values?.birthdate}
            />
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
