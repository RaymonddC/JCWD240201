import { Link } from 'react-router-dom';

export default function QuestionCardAdmin(props) {
  const date = props?.data?.createdAt?.split('T')[0];
  const question = props?.data?.question;
  const id = props?.data?.id;
  const isAnswered = props?.data.answers.length
  console.log(isAnswered)
  // console.log(Object.keys(answer).length);
  console.log(props?.data.answers.length);
  return (
    <>
      <Link to={`/qna/details/${id}`}>
        <div className="card card-compact w-full my-5 bg-base-100 shadow-xl hover:cursor-pointer">
          <div className="flex items-center justify-end px-3 ">
            {isAnswered ? (
              <div className="badge badge-primary mx-6">answered</div>
            ) : (
              <div className="badge badge-accent mx-6">not answered</div>
            )}
            <div className="label">{date}</div>
          </div>
          <div className="card-body ">
            <article className="prose">
              <h4 className=" truncate">{question}</h4>
            </article>
          </div>
        </div>
      </Link>
    </>
  );
}
