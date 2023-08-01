import { MdArrowDropDown } from 'react-icons/md';
import PrescriptionCard from '../Components/Prescription/PrescriptionCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllPrescriptionsCartsSlice } from '../Features/Cart/CartSlice';

export default function PrescriptionAdmin() {
  const dispatch = useDispatch();

  const { prescriptionCarts } = useSelector((state) => state.cart);

  console.log(prescriptionCarts);

  useEffect(() => {
    dispatch(getAllPrescriptionsCartsSlice());
  }, []);

  return (
    <div>
      <h1>Prescription</h1>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search Category"
          className="input input-bordered input-success w-full max-w-xs"
        />
        <div className="dropdown dropdown-end hidden md:block">
          <label tabIndex={0} className="btn btn-secondary">
            Sort by <MdArrowDropDown size={25} />
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
          >
            <li>
              <div>Name A to Z</div>
            </li>
            <li>
              <div>Name Z to A</div>
            </li>
            <li>
              <div>Price low to high</div>
            </li>
            <li>
              <div>Price high to low</div>
            </li>
          </ul>
        </div>
      </div>
      <div className="grid gap-4 place-items-center">
        {prescriptionCarts.map((value, index) => {
          return <PrescriptionCard data={value} key={index} />;
        })}
      </div>
    </div>
  );
}
