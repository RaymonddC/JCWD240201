import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitQuestion } from '../../Features/QnA/QnASlice';
import { useSearchParams } from 'react-router-dom';
import { Editor, EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import 'draft-js/dist/Draft.css';

export default function QuestionModal() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);
  const disabled = Object.keys(user).length ? false : true;
  const placeholder = disabled
    ? 'Please login to ask a question'
    : 'Type your question here...';
  const title = useRef();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const QnAStore = useSelector((state) => state?.QnA);
  const questionCategories = QnAStore?.categories;
  const selectOptions = questionCategories?.data?.map((value, index) => {
    return (
      <option key={`opt${index}`} value={value.id}>
        {value.name}
      </option>
    );
  });
  const onSubmit = () => {
    const select = document.getElementById('category');
    const option = select.options[select.selectedIndex].value;
    const question = convertToHTML(editorState.getCurrentContent());
    dispatch(
      submitQuestion(
        {
          title: title.current.value,
          question: question,
          question_category_id: Number(option),
          user,
        },
        setOpen,
      ),
    );
    if (open === false) {
      title.current.value = '';
      select.selectedIndex = 0;
      setEditorState(EditorState.createEmpty());
      // // question.current.value = '';
      // setOpen(false);
    }
  };
  return (
    <>
      <button
        className="input input-bordered w-full my-3 flex items-center"
        disabled={disabled}
        onClick={() => setOpen(true)}
      >
        <p className=" text-slate-400">{placeholder}</p>
      </button>
      <input
        readOnly
        checked={open}
        type="checkbox"
        id="question"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box max-w-3xl">
          <div className="form-control">
            <article className="prose">
              <h2 className="label-text">Ask a question</h2>
            </article>
            <div className="flex flex-col md:flex-row md:justify-between ">
              <input
                type="text"
                ref={title}
                placeholder="Insert title here"
                className="input input-bordered w-full md:max-w-xs my-3"
                disabled={disabled}
              />
              <select
                name="category"
                id="category"
                className="select select-bordered my-3"
              >
                <option value={0}>Please select a category</option>
                {selectOptions}
              </select>
            </div>
            <div className="h-72 textarea textarea-bordered overflow-auto">
              <Editor editorState={editorState} onChange={setEditorState} />
            </div>
            <button
              className="btn btn-primary text-white my-2"
              onClick={() => onSubmit()}
            >
              SUBMIT
            </button>
            <button
              className="btn btn-outline border-primary text-primary hover:bg-primary hover:border-primary my-2"
              onClick={() => setOpen(false)}
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
