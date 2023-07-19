export default function InputUserText(props) {
  console.log(props.errors);
  return (
    <>
      <label htmlFor={props.id} className="text-[14px]">
        {props.label}
      </label>
      <input
        name={props.name}
        id={props.id}
        className={
          props?.errors
            ? 'input input-error w-full px-3 mb-2 border rounded-md select-none focus:outline-none text-[14px]'
            : 'input w-full px-3 mb-2 border border-[#00A8B5] rounded-md select-none focus:outline-none text-[14px]'
        }
        type="text"
        onChange={props.handleChange}
        value={props.values}
      />
      <p className="text-error text-[14px]">{props.errors}</p>
    </>
  );
}
