import { Link } from "react-router-dom";

export default function QuestionCard(props) {
  const date = props?.data?.createdAt.split('T')[0]
  const question =props?.data.question.question
  const id = props?.data?.question.id
  return (
    <>
    <Link to={`/qna/details/${id}`}>
      <div className="card card-compact w-full my-5 bg-base-100 shadow-xl hover:cursor-pointer" onClick={console.log('a')}>
        <div className="flex justify-end px-3">
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
