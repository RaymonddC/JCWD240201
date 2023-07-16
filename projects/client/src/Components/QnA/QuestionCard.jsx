export default function QuestionCard(props) {
  console.log(props);
  return (
    <>
      <div className="card card-compact w-full my-5 bg-base-100 shadow-xl">
        <div className="flex justify-end px-3">
          <div className="label">{props?.data?.createdAt}</div>
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
