import React from 'react';
import { PiDotDuotone } from 'react-icons/pi';
import moment from 'moment';

const TransactionStatusCard = (props) => {
  const dateTime = new Date(props.txHistory.createdAt);
  const date = moment(dateTime);

  return (
    <div className="flex justify-between text-sm ">
      <div className="flex items-center">
        <p className="text-xs">{date.format('MMM DD, YYYY, HH:mm')} WIB</p>

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
