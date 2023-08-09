import { useNavigate } from 'react-router-dom';

export default function ReportPage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="font-bold text-xl">Report</div>
        <button onClick={() => navigate('/report/stock_history')} className="btn btn-primary">Stock History</button>
      </div>
    </>
  );
}
