import { TextField } from '@mui/material';
import React from 'react';

export const Input = (props) => {
  return (
    <>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        type="email"
        variant="outlined"
        value={props.value}
        onBlur={props.onBlur}
        onChange={props.onChange}
        className="pl-[20px] pr-[15px] py-[20px] bg-[#EEEEEE]  rounded-l w-full "
      />
    </>
  );
};
