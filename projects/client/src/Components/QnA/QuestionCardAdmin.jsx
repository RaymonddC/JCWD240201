import { Link } from 'react-router-dom';

export default function QuestionCardAdmin(props) {

  const date = props?.data?.createdAt?.split('T')[0];
  const question = props?.data?.question;
  const id = props?.data?.id;
  // const answered = props?.data?.answers ? true : false;
  // console.log(props?.data);
  return (
    <>
      <Link to={`/qna/details/${id}`}>
        <div className="card card-compact w-full my-5 bg-base-100 shadow-xl hover:cursor-pointer">
          <div className="flex justify-end px-3">
            <div className="badge badge-accent" >accent</div>
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
