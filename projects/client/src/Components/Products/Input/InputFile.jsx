export default function InputProductImage(props) {
  return (
    <>
      <div className="flex flex-col">
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
      </div>
      <p className="text-[14px]">File max size 1 MB</p>
      <p className="text-[14px]">File must be in .JPG, .JPEG and .PNG format</p>
    </>
  );
}
