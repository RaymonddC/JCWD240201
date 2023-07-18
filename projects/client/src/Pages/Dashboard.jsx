import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Analysis } from '../Components/Dashboard/Analysis/Analysis';
import { OrderStatus } from '../Components/Dashboard/OrderStatus/OrderStatus';
import { MedicStatus } from '../Components/Dashboard/MeidicineStatus/MedicStatus';

export const Dashboard = () => {
  const { user } = useSelector((state) => state?.user);

  return (
    <div className="flex flex-col gap-8">
      <Analysis />
      <div className="medicine flex justify-between">
        <OrderStatus />
        <MedicStatus />
      </div>
    </div>
  );
};
