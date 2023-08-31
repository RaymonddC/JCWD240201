export default function InputUserText(props) {
  return (
    <>
      <label htmlFor={props.id} className="text-[14px]">
        {props.label}
      </label>
      <input
        name={props.name}
        placeholder={props?.placeholder ? props.placeholder : ''}
        id={props.id}
        onBlur={props?.onBlur}
        className={
          props?.errors && props?.touched
            ? 'input input-error w-full px-3 mb-2 border rounded-md select-none focus:outline-none text-[14px]'
            : 'input w-full px-3 mb-2 border border-primary rounded-md select-none focus:outline-none text-[14px]'
        }
        type="text"
        onChange={props.handleChange}
        value={props.values}
        disabled={props.disabled}
      />
      {props.errors && props?.touched ? (
        <p className="text-error text-[14px]">{props.errors}</p>
      ) : null}
    </>
  );
}
