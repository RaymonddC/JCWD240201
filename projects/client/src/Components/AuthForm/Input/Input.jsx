import React from 'react';

export const Input = (props) => {
  return (
    <>
      <div className={`form-control w-full ${props.hidden} `}>
        <label className="label">
          <span className="label-text">{props.label}</span>
        </label>
        <input
          name={props.name}
          type={props.type}
          placeholder={props.label}
          className="input input-bordered w-full h-[3em]"
          value={props.value}
          onBlur={props.onBlur}
          onChange={props.onChanged}
        />
        {props.errors && props.touched ? (
          <div className="error text-right">{props.errors}</div>
        ) : null}
      </div>
    </>
  );
};
