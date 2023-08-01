import { useEffect, useState } from 'react';

export default function SelectProduct(props) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    setValue(props.values);
  }, [props.values]);

  useEffect(() => {
    setValue(null);
  }, [value]);
  return (
    <>
      <label htmlFor={props.id} className="text-[14px]">
        {props.label}
      </label>
      <input
        name={props.name}
        placeholder={props?.placeholder ? props.placeholder : null}
        id={props.id}
        type="text"
        className="input w-full px-3 mb-2 border border-primary rounded-md select-none focus:outline-none text-[14px]"
        onChange={(e) => {
          if (e.target.value.length > 2 || e.target.value.length === 0)
            props?.setSearch(e.target.value);
        }}
        onClick={props.onClick}
        value={value}
        disabled={props.isDisabled}
      />
      {props.errors && props?.touched ? (
        <p className="text-error text-[14px]">{props.errors}</p>
      ) : null}
    </>
  );
}
