import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { MdPerson } from 'react-icons/md';
import { updateProfile } from '../../API/userAPI';
import { useDispatch, useSelector } from 'react-redux';
import { keepLoginAsync } from '../../Features/User/UserSlice';
import { toast } from 'react-hot-toast';
import { validationUserEditModal } from '../../Helper/userHelper';
import { submitQuestion } from '../../Features/QnA/QnASlice';
import { useSearchParams } from 'react-router-dom';
import { Editor, EditorState } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import { createMarkup } from '../../Helper/createMarkup';
import 'draft-js/dist/Draft.css';

// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function QuestionModal() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);
  const disabled = Object.keys(user).length ? false : true;
  const placeholder = disabled
    ? 'Please login to ask a question'
    : 'Type your question here...';
  const question = useRef();
  const title = useRef();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  // const [convertedContent, setConvertedContent] = useState(null);

  // let option = 0;
  const QnAStore = useSelector((state) => state?.QnA);
  // const onEditorStateChange = (newEditorState) => {
  //   setEditorState(newEditorState);
  // };
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
    console.log(option);

    dispatch(
      submitQuestion({
        title: title.current.value,
        // question: question.current.value,
        question: question,
        question_category_id: Number(option),
        user,
      },setOpen),
    );
    // title.current.value = '';
    // // question.current.value = '';
    // select.selectedIndex = 0;
    // setEditorState(EditorState.createEmpty());
    // setOpen(false);
  };
  // const editorState = editor;
  // useEffect(() => {
  //   let html = convertToHTML(editorState.getCurrentContent());
  //   setConvertedContent(html);
  // }, [editorState]);
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
              <Editor
                editorState={editorState}
                // ref={question}
                // wrapperClassName="wrapper-class"
                // editorClassName="editor-class"
                // toolbarClassName="toolbar-class"
                // wrapperClassName="p-1 border max-h-72"
                // editorClassName="p-1 border"
                // toolbarClassName="hidden"
                // onEditorStateChange={onEditorStateChange}
                onChange={setEditorState}
              />
            </div>
            {/* <textarea
              ref={question}
              className="textarea my-3 textarea-bordered h-52"
              placeholder={placeholder}
              disabled={disabled}
            /> */}
            {/* <div>
              <textarea disabled value={convertedContent} />
            </div>
            <div
              className="preview"
              dangerouslySetInnerHTML={createMarkup(convertedContent)}
            ></div> */}
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

// import React, { Component } from 'react';
// import { EditorState, convertToRaw } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// class QuestionModal extends Component {
//   state = {
//     editorState: EditorState.createEmpty(),
//   }

//   onEditorStateChange = (editorState) => {
//     this.setState({
//       editorState,
//     });
//   };

//   render() {
//     const { editorState } = this.state;
//     return (
//       <div>
//         <Editor
//           editorState={editorState}
//           wrapperClassName="demo-wrapper"
//           editorClassName="demo-editor"
//           onEditorStateChange={this.onEditorStateChange}
//         />
//         <textarea
//           disabled
//           value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
//         />
//       </div>
//     );
//   }
// }

// export default QuestionModal
