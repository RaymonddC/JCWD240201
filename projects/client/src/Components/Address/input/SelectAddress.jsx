export default function SelectAddress(props) {
  return (
    <>
      {/* <label htmlFor={props.id} className="text-[14px]">
          {props.label}
        </label>
        <textarea
          name={props.name}
          id={props.id}
          className="textarea textarea-primary"
          placeholder="Bio"
          onChange={props.handleChange}
          value={props.values}
        ></textarea>
        <p className="text-error text-[14px]">{props.errors}</p> */}
      <label htmlFor={props.id} className="text-[14px]">
        {props.label}
      </label>
      <select
        onBlur={props.onBlur}
        id={props.id}
        name={props.name}
        className={
          props.errors && props.touched
            ? 'select select-error w-full font-normal mb-1'
            : 'select select-primary w-full font-normal mb-2'
        }
        onChange={props.handleChange}
        value={props.values}
        disabled={!props?.data?.length ? true : false}
      >
        <option value="0">{props.placeholder}</option>

        {props.id === 'province_id'
          ? props?.data?.map((value) => {
              return (
                <option key={value.province_id} value={value.province_id}>
                  {value.province}
                </option>
              );
            })
          : props?.data?.map((value) => {
              return (
                <option key={value.city_id} value={value.city_id}>
                  {value.city_name}
                </option>
              );
            })}
      </select>
      {props.errors && props.touched ? (
        <p className="text-error text-[14px]">{props.errors}</p>
      ) : null}
    </>
  );
}
