import React, { useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';

import format from 'date-fns/format';
import { addDays } from 'date-fns';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useDispatch } from 'react-redux';
// import { getDataGraph } from '../../Features/Transaction/transactionSlice';

const DateRangePicker = () => {
  const dispatch = useDispatch();

  const [range, setRange] = useState([
    {
      startDate: new Date('2023-06-01'),
      endDate: new Date('2023-06-12'),
      key: 'selection',
    },
  ]);

  const [open, setOpen] = useState(false);

  const formatDate = (date) => format(date, 'yyyy-MM-dd');

  const clickHandler = () => {
    setOpen(false);
    dispatch();
    //   getDataGraph({
    //     start: formatDate(range[0].startDate),
    //     end: formatDate(range[0].endDate),
    //   }),
  };

  return (
    <div className="hidden md:block">
      <div className="flex gap-2 relative">
        <div
          className="bg-white rounded-lg p-3 cursor-pointer border"
          onClick={() => setOpen((open) => !open)}
        >
          {/* <p>{range[0].startDate}</p> */}
          {/* <input type="date" /> */}
          <span>{`${format(range[0].startDate, 'dd MMM yyyy')}`}</span> -
          <span>{` ${format(range[0].endDate, 'dd MMM yyyy')}`}</span>
        </div>
        <div className="flex items-center">
          <button
            className="btn btn-md bg-primary text-white"
            onClick={() => clickHandler()}
          >
            SEARCH
          </button>
        </div>
      </div>

      {open === true && (
        <div className="absolute z-10">
          <DateRange
            onChange={(item) => setRange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={1}
            direction="horizontal"
            className="calendarElement"
          />
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
