export default function Pagination(props) {
  const next = () => {
    const nextPage =
      props?.page >= props?.totalPages ? props?.totalPages : props?.page + 1;
    props?.setPage(nextPage);
  };
  const prev = () => {
    const prevPage = props?.page <= 1 ? 1 : props?.page - 1;
    props?.setPage(prevPage);
  };
  return (
    <>
      <div className="flex justify-center">
        <div className="join w-64 grid grid-cols-2">
          <button onClick={() => prev()} className="join-item btn btn-outline">
            {'<< Previous'}
          </button>
          <button onClick={() => next()} className="join-item btn btn-outline">
            {'Next >>'}
          </button>
        </div>
      </div>
    </>
  );
}
