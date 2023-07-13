import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import defaultTheme from '../utils/theme';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { userVerification } from '../API/auth';

// TODO remove, this demo shouldn't need to reset the theme.

const theme = defaultTheme;

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();

  const verifiedAccount = async () => {
    try {
      let token = searchParams.get('token');
      await userVerification(token);
    } catch (error) {}
  };

  useEffect(() => {
    verifiedAccount();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{ width: 100, height: 100, m: 1, bgcolor: 'secondary.main' }}
          >
            <CheckIcon style={{ fontSize: '5rem' }} />
          </Avatar>
          <div className="text-3xl font-semibold my-5">Verified!</div>
          <div className="text-slate-400 font-medium mb-5">
            You have successfully verified account
          </div>
          <Button variant="contained" color="secondary" sx={{ color: 'white' }}>
            Ok
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
