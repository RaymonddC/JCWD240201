import { Link } from 'react-router-dom';
import { MdArrowDropDown } from 'react-icons/md';

export default function FilterBar(props) {
  

  return (
    <>
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => {
            props.setSearch(e.target.value);
          }}
        />
        <div className="dropdown dropdown-end border rounded-lg mx-2">
          <label tabIndex={0} className="btn btn-ghost rounded-btn">
            Category <MdArrowDropDown size={25} />
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
          >
            <li>
              <Link to="/products">SHOP</Link>
            </li>
            <li>
              <Link to="/discussions">QNA</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
