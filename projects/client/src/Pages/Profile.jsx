import { useFormik } from 'formik';
import { MdPerson } from 'react-icons/md';

export default function Profile() {
  const formik = useFormik({
    initialValues: {
      full_name: '',
      phone_number: '',
      email: '',
      gender: '',
      birthdate: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  console.log(formik.values);
  return (
    <div className="flex sm:flex-col justify-center sm:items-center px-4 gap-4">
      <div className="flex flex-col items-center">
        <MdPerson className="sm:!w-[100px] sm:!h-[100px] lg:!w-[200px] lg:!h-[200px]" />
        <button className="text-[#00A8B5] font-bold">Change Profile</button>
        <p className="text-[14px]">File max size 1 MB</p>
        <p className="text-[14px]">
          File must be in .JPG, .PNG and .GIF format
        </p>
      </div>
      <form
        className="sm:w-full max-w-[770px] porse"
        onSubmit={formik.handleSubmit}
        noValidate
      >
        <label htmlFor="" className="text-[14px]">
          Full Name
        </label>
        <input
          name="full_name"
          id="full_name"
          className="h-[40px] w-full px-3 mb-2 border border-[#00A8B5] rounded-md select-none focus:outline-none text-[14px]"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.first_name}
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
        <label htmlFor="" className="text-[14px]">
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
        />
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
        <button type="submit" className="btn w-full bg-[#00A8B5] text-white">
          SAVE
        </button>
        <button className="btn btn-ghost w-full text-[#00A8B5]">BACK</button>
      </form>
    </div>
  );
}
