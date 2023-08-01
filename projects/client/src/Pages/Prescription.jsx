import { MdArrowDropDown } from 'react-icons/md';

export default function Prescription() {
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
        <div className="rounded-xl border-2 border-black flex flex-col w-full max-w-[896px]">
          <div className="bg-primary rounded-t-lg flex justify-between p-2 text-white">
            <p>New Prescription</p>
            <p>12 Juni 2023</p>
          </div>
          <div className="flex gap-4 p-4">
            <div className="w-[80px] h-[80px] bg-primary"></div>
            <div>
              <p>buyer's name</p>
              <button className="btn btn-primary text-white">Make Copy</button>
            </div>
          </div>
        </div>

        <div className="rounded-xl border-2 border-black flex flex-col w-full max-w-[896px]">
          <div className="bg-primary rounded-t-lg flex justify-between p-2 text-white">
            <p>New Prescription</p>
            <p>12 Juni 2023</p>
          </div>
          <div className="flex gap-4 p-4">
            <div className="w-[80px] h-[80px] bg-primary"></div>
            <div>
              <p>buyer's name</p>
              <button className="btn btn-primary text-white">Make Copy</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
