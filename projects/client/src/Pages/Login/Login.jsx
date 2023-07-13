import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { Paper, Box, Grid } from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';

import { Link, Navigate } from 'react-router-dom';
import { AuthForm } from '../../Components/AuthForm/AuthForm';

const defaultTheme = createTheme();

export const Login = () => {
  const user = useSelector((state) => state?.user?.user);

  const [isRegis, setIsRegis] = useState(
    window.location.pathname == '/register',
  );
  const dispatch = useDispatch();

  // useEffect(() => {
  //   setIsRegis(window.location.pathname == '/register');
  // }, [window.location.pathname]);

  // console.log(user);
  // if (!user || Object.keys(user).length !== 0) return <Navigate to={'/'} />;

  return (
    <Box
      sx={{
        maxHeight: '100vh',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              maxHeight: '100vh',
              height: '100vh',
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              {/* Logo Pharmacy */}
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isRegis ? 'Sign Up ' : 'Sign In '} to Pharmacy
            </Typography>

            <AuthForm isRegis={isRegis} />

            {isRegis ? (
              ''
            ) : (
              <Link to={'/'}>
                <button className="dark:bg-[black] dark:text-[white] border-black dark:border-white border bg-[white] text-[black] font-bold rounded-xl py-[10px] w-full my-[10px]">
                  Forgot Password?
                </button>
              </Link>
            )}

            <Link to={'/'}>
              <span className="text-[#808080] text-left">
                {isRegis ? 'Already have account?' : "Don't have an account?"}{' '}
              </span>
              <Link
                to={isRegis ? '/login' : '/register'}
                className="text-blue-500"
              >
                {isRegis ? 'Login' : 'Sign Up'}
              </Link>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
