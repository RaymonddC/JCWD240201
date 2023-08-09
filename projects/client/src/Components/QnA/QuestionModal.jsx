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
  // let option = 0;
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
    console.log(option);

    dispatch(
      submitQuestion({
        title: title.current.value,
        question: question.current.value,
        question_category_id: Number(option),
        user,
      }),
    );
    title.current.value = '';
    question.current.value = '';
    select.selectedIndex = 0;
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
            <textarea
              ref={question}
              className="textarea my-3 textarea-bordered h-52"
              placeholder={placeholder}
              disabled={disabled}
            ></textarea>
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
