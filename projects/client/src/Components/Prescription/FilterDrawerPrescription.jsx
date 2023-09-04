import { useState } from 'react';

export default function FilterDrawerPrescription(props) {
  const [open, setOpen] = useState(false);
  return (
    <div className="drawer drawer-end w-fit md:hidden">
      <input
        readOnly
        checked={open}
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content w-fit">
        {/* Page content here */}
        <label
          onClick={() => setOpen(true)}
          htmlFor="my-drawer-4"
          className="drawer-button btn btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          className="drawer-overlay"
          onClick={() => setOpen(false)}
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <li
            onClick={() => {
              props?.setSort('ASC');
              setOpen(false);
            }}
          >
            <div>Prescription new to old</div>
          </li>
          <li
            onClick={() => {
              props?.setSort('DESC');
              setOpen(false);
            }}
          >
            <div>Prescription old to new</div>
          </li>
          <li
            onClick={() => {
              props?.setConfirmation('null');
              setOpen(false);
            }}
          >
            <div>Waiting for Approval</div>
          </li>
          <li
            onClick={() => {
              props?.setConfirmation('true');
              setOpen(false);
            }}
          >
            <div>Accepted</div>
          </li>
          <li
            onClick={() => {
              props?.setConfirmation('false');
              setOpen(false);
            }}
          >
            <div>Rejected</div>
          </li>
        </ul>
      </div>
    </div>
  );
}
