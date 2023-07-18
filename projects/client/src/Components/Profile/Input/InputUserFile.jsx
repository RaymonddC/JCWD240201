export default function InputUserFile(props) {
  return (
    <>
      <input
        className="hidden"
        type="file"
        name={props.name}
        id={props.id}
        ref={props.refProp}
        onChange={props.onChange}
      />
      <label htmlFor={props.id} className="text-[#00A8B5] font-bold">
        {props.label}
      </label>
    </>
  );
}
