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
  email: Yup.string().email('Invalid email').required('Required'),
});

export { LoginSchema, SignupSchema };
