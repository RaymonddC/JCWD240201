import { useNavigate } from 'react-router-dom';

export default function ReportPage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col gap-3">
        <article className="prose">
          <h2>Report</h2>
        </article>
        <button
          onClick={() => navigate('/report/stock_history')}
          className="btn btn-primary text-white"
        >
          Stock History
        </button>
      </div>
    </>
  );
}
