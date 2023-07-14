import NavBar from '../Components/Layout/Navbar';

export default function QnA() {
  return (
    <>
      <NavBar />
      <div className="form-control">
        <label className="label">
          <span className="label-text">Ask a question</span>
          <span className="label-text-alt">Alt label</span>
        </label>
        <textarea
          className="textarea textarea-bordered h-24"
          placeholder="Bio"
        ></textarea>
      </div>
    </>
  );
}
