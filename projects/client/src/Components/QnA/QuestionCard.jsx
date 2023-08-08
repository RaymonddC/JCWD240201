import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function QuestionCard(props) {
  const date = new Date(props?.data?.createdAt);
  const dateFormatted = date
    .toLocaleDateString('EN-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    .split(',');
  const question = props?.data?.question?.question;
  const title = props?.data?.question?.title;
  const id = props?.data?.question?.id;
  return (
    <>
      <Link to={`/discussions/details/${id}`}>
        <div className="card card-compact w-full my-5 bg-base-100 shadow-xl hover:cursor-pointer">
          <div className="flex justify-end px-3">
            <div className="label">
              {dateFormatted[0]}, {dateFormatted[1]} {dateFormatted[2]}
            </div>
          </div>
          <div className="card-body ">
            <article className="prose">
              <h4 className="truncate"> {title}</h4>
              <p className="truncate">{question}</p>
            </article>
          </div>
        </div>
      </Link>
    </>
  );
}
