import React from 'react';

import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';

export const InputPassword = (props) => {
  const [showPass, setShowPass] = React.useState(false);
  return (
    <>
      <div className={`form-control w-full relative ${props.hidden} `}>
        <div className="icon" onClick={() => setShowPass(!showPass)}>
          {showPass ? (
            <MdOutlineVisibility className="absolute right-[10px] xl:right-[15px] top-[55px] xl:top-[50px] z-30 text-[1em] xl:text-[1.5em]" />
          ) : (
            <MdOutlineVisibilityOff className="absolute right-[10px] xl:right-[15px] top-[55px] xl:top-[50px] z-30 text-[1em] xl:text-[1.5em]" />
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
          ref={props.defineRef}
        ></input>
        {props.errors && props.touched ? (
          <div className="error text-right">{props.errors}</div>
        ) : null}
      </div>
    </>
  );
};
