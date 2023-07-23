import { useRef } from 'react';

export default function InputAddressTextField(props) {
  const refTextArea = useRef();
  return (
    <>
      <label htmlFor={props.id} className="text-[14px]">
        {props.label}
      </label>
      <textarea
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
        className={
          props.errors && props.touched
            ? 'textarea textarea-error mb-2'
            : 'textarea textarea-primary mb-2'
        }
        onChange={props.handleChange}
        onBlur={props.onBlur}
        value={props.values}
        ref={refTextArea}
        maxLength="150"
      ></textarea>
      <div className="w-full flex justify-between">
        {props.errors && props.touched ? (
          <p className="text-error text-[14px]">{props.errors}</p>
        ) : (
          <span></span>
        )}
        <p className="text-[12px]">
          {refTextArea?.current?.value?.length
            ? refTextArea?.current?.value?.length
            : 0}
          /150
        </p>
      </div>
    </>
  );
}
