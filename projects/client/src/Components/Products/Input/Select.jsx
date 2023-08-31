export default function Select(props) {
  return (
    <>
      <label className="text-[14px]">{props.label}</label>
      <select
        className={
          props?.errors && props?.touched
            ? 'select w-full px-3 mb-2 border border-error rounded-md select-none focus:outline-none text-[14px]'
            : 'select w-full px-3 mb-2 border border-primary rounded-md select-none focus:outline-none text-[14px]'
        }
        id={props.id}
        name={props.name}
        onBlur={props.onBlur}
        onChange={props.handleChange}
        value={props.value}
      >
        <option value="0" hidden>
          {props.placeholder}
        </option>
        {props?.data?.map((value) => {
          return (
            <option
              key={value.id}
              value={value?.id}
              selected={props.selected === value.id ? true : false}
            >
              {value?.type_name || value?.type || value?.promotion}
            </option>
          );
        })}
      </select>
      {props.errors && props?.touched ? (
        <p className="text-error text-[14px]">{props.errors}</p>
      ) : null}
    </>
  );
}
