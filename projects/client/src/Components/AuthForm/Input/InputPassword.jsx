import { TextField } from '@mui/material';
import React from 'react';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

export const InputPassword = (props) => {
  const [showPass, setShowPass] = React.useState(false);
  return (
    <>
      <div className={`form-control w-full relative ${props.hidden} `}>
        <div className="icon" onClick={() => setShowPass(!showPass)}>
          {showPass ? (
            <VisibilityOutlinedIcon className="absolute right-[20px] top-[50px] z-30" />
          ) : (
            <VisibilityOffOutlinedIcon className="absolute right-[20px] top-[50px] z-30" />
          )}
        </div>
        <label className="label">
          <span className="label-text">{props.label}</span>
        </label>
        <input
          name={props.name}
          type={showPass ? 'text' : 'password'}
          placeholder={props.label}
          className="input input-bordered w-full h-[3em]"
          value={props.value}
          onBlur={props.onBlur}
          onChange={props.onChanged}
        ></input>
        {props.errors && props.touched ? (
          <div className="error text-right">{props.errors}</div>
        ) : null}
      </div>
    </>
  );
};
