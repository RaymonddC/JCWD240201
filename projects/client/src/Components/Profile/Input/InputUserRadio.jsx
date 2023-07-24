export default function InputUserRadio(props) {
  return (
    <div className="flex items-center gap-2">
      <input
        id="gender"
        type="radio"
        name="gender"
        className="radio border-primary checked:bg-primary"
        checked={props.formikValues === props.values}
        onChange={props.handleChange}
        value={props.values}
      />
      <span>{props.label}</span>
    </div>
  );
}
