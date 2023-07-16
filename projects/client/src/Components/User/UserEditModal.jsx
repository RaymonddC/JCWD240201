import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { MdPerson } from 'react-icons/md';

export default function UserEditModal({ data }) {
  const [change, setchange] = useState();
  const formik = useFormik({
    initialValues: {
      full_name: '',
      phone_number: '',
      email: '',
      gender: '',
      birthdate: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.full_name) {
        errors.full_name = 'Full name is required';
      }
      if (!values.phone_number) {
        errors.phone_number = 'Phone number is required';
      }
      if (!values.email) {
        errors.email = 'Email is required';
      }
      if (!values.gender) {
        errors.gender = 'Gender is required';
      }
      if (!values.birthdate) {
        errors.birthdate = 'Birthdate is required';
      }
      return errors;
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      window.my_modal_3.close();
    },
  });
  console.log(formik.values);
  if (
    change === false &&
    (formik.values.full_name !== data?.full_name ||
      formik.values.phone_number !== data?.phone_number ||
      formik.values.gender !== data?.gender ||
      formik.values.birthdate !== data.birthdate)
  ) {
    setchange(true);
  }

  const closebtn = (e) => {
    e.preventDefault();
    // formik.resetForm();
    window.my_modal_3.close();
  };
  useEffect(() => {
    if (data.full_name) {
      formik.setValues({
        full_name: data.full_name,
        phone_number: data.phone_number,
        email: data.email,
        gender: data.gender,
        birthdate: data.birthdate,
      });
      setchange(false);
    }
  }, [data]);
  return (
    <>
      {/* You can open the modal using ID.showModal() method */}
      <button
        className="btn btn-outline border-[#00A8B5] text-[#00A8B5] hover:bg-[#00A8B5] hover:border-[#00A8B5]"
        onClick={() => window.my_modal_3.showModal()}
      >
        EDIT
      </button>
      <dialog id="my_modal_3" className="modal">
        <form
          className="modal-box max-w-[448px]"
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <div className="flex flex-col items-center">
            <MdPerson className="w-[100px] h-[100px]" />
            <button className="text-[#00A8B5] font-bold">Change Profile</button>
            <p className="text-[14px]">File max size 1 MB</p>
            <p className="text-[14px]">
              File must be in .JPG, .PNG and .GIF format
            </p>
          </div>
          <label htmlFor="" className="text-[14px]">
            Full Name
          </label>
          <input
            name="full_name"
            id="full_name"
            className="h-[40px] w-full px-3 mb-2 border border-[#00A8B5] rounded-md select-none focus:outline-none text-[14px]"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.full_name}
          />
          <label htmlFor="" className="text-[14px]">
            Phone Number
          </label>
          <input
            name="phone_number"
            id="phone_number"
            className="h-[40px] w-full px-3 mb-2 border border-[#00A8B5] rounded-md select-none focus:outline-none text-[14px]"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.phone_number}
          />
          {/* <label htmlFor="" className="text-[14px]">
            Email
          </label>
          <input
            name="email"
            id="email"
            className="h-[40px] w-full px-3 mb-2 border border-[#00A8B5] rounded-md select-none focus:outline-none text-[14px]"
            type="email"
            disabled
            onChange={formik.handleChange}
            value={formik.values.email}
          /> */}
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
          <label htmlFor="" className="text-[14px]">
            Date of Birth
          </label>
          <input
            name="birthdate"
            id="birthdate"
            className="h-[40px] w-full px-3 mb-2 border border-[#00A8B5] rounded-md select-none focus:outline-none text-[14px]"
            type="date"
            onChange={formik.handleChange}
            value={formik.values.birthdate}
          />
          <button
            disabled={change === false}
            type="submit"
            className="btn w-full bg-[#00A8B5] text-white"
          >
            SAVE
          </button>
          <button
            className="btn btn-ghost w-full text-[#00A8B5]"
            onClick={(e) => closebtn(e)}
          >
            Close
          </button>
          {/* <button className="btn btn-ghost w-full text-[#00A8B5]">BACK</button> */}
          {/* <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p> */}
        </form>
      </dialog>
    </>
  );
}
