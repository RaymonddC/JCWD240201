export default function SelectProduct(props) {
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
        value={props.values}
      />
    </>
  );
}
