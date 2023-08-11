import React from 'react';
import { PiDotDuotone } from 'react-icons/pi';

const TransactionStatusCard = (props) => {
  const dateTime = new Date(props.txHistory.createdAt);
  const date = dateTime.toLocaleString('EN-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  // .split(',');
  return (
    <div className="flex justify-between text-sm ">
      <div className="flex items-center">
        <p className="text-xs">{date} WIB</p>

        <PiDotDuotone size={'2em'} />
      </div>

      <div className="detail w-3/5">
        <p>{props.txHistory.transaction_status.status}</p>
        <p>Transaksi telah dikonfirmasi pembeli dan menunggu review</p>
      </div>
    </div>
  );
};

export default TransactionStatusCard;
