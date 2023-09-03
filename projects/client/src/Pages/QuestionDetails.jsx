import { useEffect, useRef, useState } from 'react';
import {
  answers,
  getQuestionDetail,
  postAnswer,
  updateAnswer,
} from '../Features/QnA/QnASlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { createMarkup } from '../Helper/createMarkup';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { MdOutlineArrowBack } from 'react-icons/md';

export default function QuestionDetails() {
  const user = useSelector((state) => state?.user?.user);
  const role = user?.role_id;
  const userId = user?.id;
  const QnAStore = useSelector((state) => state?.QnA);
  const dispatch = useDispatch();
  const params = useParams();
  const date = QnAStore?.questions?.createdAt?.split('T')[0];
  const { id } = params;
  const questionId = Number(id);
  const question = QnAStore?.questions?.question;
  const title = QnAStore?.questions?.title;
  const answer = QnAStore?.questions?.answers?.[0]?.answer;
  const answerId = QnAStore?.questions?.answers?.[0]?.id;
  const answerText = useRef();
  const [disabled, setDisabled] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };
  useEffect(() => {
    setEditorState(
      EditorState.createWithContent(
        ContentState.createFromBlockArray(convertFromHTML(answer || '<p></p>')),
      ),
    );
  }, [answer]);

  useEffect(() => {
    dispatch(getQuestionDetail({ id: Number(id) }));
  }, [id, answerText, disabled, toggle]);
  if (role === 1) {
    return (
      <>
        <div>
          <Link to="/discussions">
            <button className="btn btn-ghost">
              <MdOutlineArrowBack size={25} /> back
            </button>
          </Link>
        </div>
        <div className="card card-compact w-full my-5 bg-base-100 shadow-xl">
          <div className="flex justify-end px-3">
            <div className="label">{date}</div>
          </div>
          <div className="card-body ">
            <article className="prose">
              <h3>{title}</h3>
              <p
                className=""
                dangerouslySetInnerHTML={createMarkup(question)}
              ></p>
            </article>
          </div>
        </div>
        {answer ? (
          <>
            <div className="w-full">
              {disabled ? (
                <p
                  // ref={answerText}
                  className="textarea w-full my-5 textarea-bordered"
                  disabled={disabled}
                  dangerouslySetInnerHTML={createMarkup(answer)}
                ></p>
              ) : (
                <Editor
                  editorState={editorState}
                  // ref={question}
                  wrapperClassName=" bg-white border"
                  editorClassName="border"
                  toolbarClassName="border"
                  onEditorStateChange={onEditorStateChange}
                />
              )}
            </div>
            <div className="flex justify-end">
              {disabled ? (
                <button
                  onClick={() => setDisabled(false)}
                  className=" btn btn-primary"
                >
                  edit
                </button>
              ) : (
                <button
                  onClick={async () => {
                    const answerNew = convertToHTML(
                      editorState.getCurrentContent(),
                    );
                    if (answerNew !== answer) {
                      await dispatch(
                        updateAnswer({
                          id: answerId,
                          answer: answerNew,
                          question_id: questionId,
                          user_id: userId,
                        }),
                      );
                    setDisabled(true)
                    }
                  }}
                  className=" btn btn-primary"
                >
                  save
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="w-full h-72 overflow-auto ">
              {/* <textarea
                ref={answerText}
                className="textarea w-full my-5 textarea-bordered h-24"
                placeholder="not yet answered"
                // disabled={disabled}
              ></textarea> */}
              <Editor
                editorState={editorState}
                // ref={question}
                wrapperClassName=" bg-white border p-1"
                editorClassName="border p-1"
                toolbarClassName="border"
                // wrapperClassName="p-1 border max-h-72"
                // editorClassName="p-1 border"
                // toolbarClassName="hidden"
                onEditorStateChange={onEditorStateChange}
                // onChange={setEditorState}
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={async () => {
                  const answer = convertToHTML(editorState.getCurrentContent());
                  await dispatch(
                    postAnswer({
                      answer: answer,
                      question_id: questionId,
                      user_id: userId,
                    }),
                  );
                  setToggle(!toggle);
                }}
                className=" btn btn-primary"
              >
                post answer
              </button>
            </div>
          </>
        )}
      </>
    );
  } else {
    return (
      <>
        <div className="flex flex-col items-center w-full">
          <div className="flex w-full max-w-3xl justify-start">
            <Link to="/discussions">
              <button className="btn btn-ghost">
                <MdOutlineArrowBack size={25} /> back to dicussions
              </button>
            </Link>
          </div>
          <div className="card card-compact max-w-3xl w-full my-5 bg-base-100 shadow-xl">
            <div className="flex justify-end px-3">
              <div className="label">{date}</div>
            </div>
            <div className="card-body ">
              <article className="prose">
                <h3>{title} </h3>
                <p
                  className="preview"
                  dangerouslySetInnerHTML={createMarkup(question)}
                ></p>
              </article>
            </div>
          </div>
          <div className="card card-compact max-w-3xl w-full my-5 bg-base-100 shadow-xl">
            <div className="flex justify-end px-3">
              {/* <div className="label">{date}</div> */}
            </div>
            <div className="card-body ">
              <article className="prose">
                <h3> Answer:</h3>
                <p dangerouslySetInnerHTML={createMarkup(answer)}></p>
              </article>
            </div>
          </div>
        </div>
      </>
    );
  }
}
