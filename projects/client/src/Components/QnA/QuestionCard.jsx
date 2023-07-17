export default function QuestionCard(props) {
  const date = props?.data?.createdAt.split('T')[0]
  
  return (
    <>
      <div className="card card-compact w-full my-5 bg-base-100 shadow-xl">
        <div className="flex justify-end px-3">
          <div className="label">{date}</div>
        </div>
        <div className="card-body hover:cursor-pointer">
          <article className="prose">
            <h4 className=" truncate">{props?.data.question}</h4>
          </article>
        </div>
      </div>
    </>
  );
}
