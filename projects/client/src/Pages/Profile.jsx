import PersonIcon from '@mui/icons-material/Person';
// import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import defaultTheme from '../utils/theme';
import { ThemeProvider } from '@mui/material/styles';

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
  return (
    <div className="flex sm:flex-col justify-center sm:items-center px-4">
      <div className="flex flex-col items-center">
        <PersonIcon
          className="sm:!w-[100px] sm:!h-[100px] lg:!w-[200px] lg:!h-[200px]"
          sx={{
            background: 'grey',
            color: 'white',
            borderRadius: '100%',
          }}
        />
        <button className="text-[#00A8B5] font-bold">Change Profile</button>
        <p className="text-[14px]">File max size 1 MB</p>
        <p className="text-[14px]">
          File must be in .JPG, .PNG and .GIF format
        </p>
      </div>
      <form className="sm:w-full" onSubmit={formik.handleSubmit} noValidate>
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
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <label htmlFor="" className="text-[14px]">
          Gender
        </label>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="gender"
          id="gender"
          defaultValue="male"
          onChange={formik.handleChange}
          value={formik.values.gender}
        >
          <FormControlLabel
            color="secondary"
            value="male"
            control={
              <Radio
                sx={{
                  color: '#00A8B5',
                  '&.Mui-checked': {
                    color: '#00A8B5',
                  },
                }}
              />
            }
            label="Male"
          />
          <FormControlLabel
            value="female"
            control={
              <Radio
                sx={{
                  color: '#00A8B5',
                  '&.Mui-checked': {
                    color: '#00A8B5',
                  },
                }}
              />
            }
            label="Female"
          />
        </RadioGroup>
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
        <ThemeProvider theme={defaultTheme}>
          <Button
            fullWidth
            variant="contained"
            color="button"
            sx={{ color: '#ffffff' }}
            type="submit"
          >
            SAVE
          </Button>
          <Button fullWidth sx={{ color: '#00A8B5' }}>
            BACK
          </Button>
        </ThemeProvider>
      </form>
    </div>
  );
}
