export default function InputUserDate(props) {
  return (
    <>
      <label htmlFor={props.id} className="text-[14px]">
        {props.label}
      </label>
      <input
        className={
          props.errors
            ? 'input input-error w-full px-3 mb-2 border rounded-md select-none focus:outline-none text-[14px]'
            : 'input w-full px-3 mb-2 border border-primary rounded-md select-none focus:outline-none text-[14px]'
        }
        name={props.name}
        id={props.id}
        type="date"
        onChange={props.handleChange}
        value={props.values}
        disabled={props.isDisabled}
      />
      <p className="text-error text-[14px]">{props?.errors}</p>
    </>
  );
}
