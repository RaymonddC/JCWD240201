export default function SelectAddress(props) {
  return (
    <>
      <label htmlFor={props.id} className="text-[14px]">
        {props.label}
      </label>
      {props?.loadCity ? (
        <div className="select select-disabled items-center p-0 w-full select-primary justify-center mb-2">
          <span className="loading h-fit loading-spinner loading-xs"></span>
        </div>
      ) : (
        <select
          id={props.id}
          name={props.name}
          className={
            props.errors && props.touched
              ? 'select select-error w-full font-normal mb-2'
              : 'select select-primary w-full font-normal mb-2'
          }
          onBlur={props?.formik?.handleBlur}
          onChange={(e) => {
            props?.formik?.setFieldValue(`${props?.id}`, e.target.value);
            props?.formik?.setFieldValue(
              props?.id === 'province_id' ? 'province_name' : 'city_name',
              e.target[e.target.selectedIndex].textContent,
            );
          }}
          value={props?.formik?.values?.[props.id]}
          disabled={!props?.data?.length ? true : false}
        >
          <option value="0" hidden>
            {props.placeholder}
          </option>

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
      )}
      {props?.formik?.errors?.[props.id] &&
      props?.formik?.touched?.[props.id] ? (
        <p className="text-error text-[14px]">
          {props?.formik?.errors?.[props.id]}
        </p>
      ) : null}
    </>
  );
}
