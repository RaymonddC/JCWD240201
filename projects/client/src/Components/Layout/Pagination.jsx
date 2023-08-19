import { useEffect } from 'react';

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
  useEffect(() => {
    if (props?.page > props?.totalPages) {
      props?.setPage(props?.totalPages);
    }
  }, []);
  return (
    <>
      <div className="flex justify-center">
        <div className="join w-64 grid grid-cols-[1fr,2fr,1fr]">
          <button onClick={() => prev()} className="join-item btn btn-outline">
            {'<<'}
          </button>
          <button className="join-item btn btn-outline">
            Page {props?.page} of {props?.totalPages}
          </button>
          <button onClick={() => next()} className="join-item btn btn-outline">
            {'>>'}
          </button>
        </div>
      </div>
    </>
  );
}
