import { useEffect, useRef } from 'react';
import NavBar from '../Components/Layout/Navbar';

export default function QnA() {
  const question = useRef();
  let submit;
  useEffect(() => {
    console.log(question.current.value);
  }, []);
  return (
    <>
      <NavBar />
      <div className="form-control">
        <label className="label">
          <span className="label-text">Ask a question</span>
          <span className="label-text-alt">Alt label</span>
        </label>
        <textarea
          ref={question}
          className="textarea textarea-bordered h-24"
          placeholder="Type your question here..."
        ></textarea>
      </div>
      <button className="btn">SUBMIT</button>
    </>
  );
}
