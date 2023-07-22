import { useState } from "react";

export default function Pagination(props) {
	const [page, setPage] = useState(1);
	const next = () => {
    const nextPage = page >= props?.totalPages ? props?.totalPages : page + 1;
    setPage(nextPage);
  };
  const prev = () => {
    const prevPage = page <= 1 ? 1 : page - 1;
    setPage(prevPage);
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
