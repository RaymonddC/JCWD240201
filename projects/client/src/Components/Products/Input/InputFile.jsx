export default function InputProductImage(props) {
  return (
    <>
      <input
        className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
        type="file"
        name={props.name}
        id={props.id}
        onChange={props.onChange}
      />
      <label htmlFor={props.id} className="text-primary font-bold">
        {props.label}
      </label>
    </>
  );
}
