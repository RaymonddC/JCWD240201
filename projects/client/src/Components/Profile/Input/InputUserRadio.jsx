export default function InputUserRadio(props) {
  return (
    <div className="flex items-center gap-2">
      <input
        id="gender"
        type="radio"
        name="gender"
        className="radio border-[#00A8B5] checked:bg-[#00A8B5]"
        checked={props.formikValues === props.values}
        onChange={props.handleChange}
        value={props.values}
      />
      <span>{props.label}</span>
    </div>
  );
}
