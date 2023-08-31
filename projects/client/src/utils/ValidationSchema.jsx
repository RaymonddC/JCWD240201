import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  usernameOrEmail: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

const SignupSchema = Yup.object().shape({
  usernameOrEmail: Yup.string().required('Required'),
  password: Yup.string()
    .matches(/[A-Z]/, 'Password at least have one uppercase char')
    .matches(/.*[0-9].*/, 'Password at least have 1 number')
    .matches(/.*\W.*/, 'Password at least have 1 special char (@,!,#, etc).')
    .min(8, 'Use 8 characters or more for your password')
    .required('Password is required'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match',
  ),
  email: Yup.string()
    .email('Invalid email')
    .matches(/\S+@\S+\.\S+/, 'Invalid Email')
    .required('Required'),
  phoneNumber: Yup.number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(1000000, 'Phone Number at least 8 digit')
    .required('A phone number is required'),
});

export { LoginSchema, SignupSchema };
