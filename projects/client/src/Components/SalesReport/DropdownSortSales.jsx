import { MdArrowDropDown } from 'react-icons/md';

export function DropdownSortSales(props) {
  const { sortHandler } = props;
  return (
    <div className="flex items-center">
      <div className="dropdown dropdown-end hidden md:block">
        <label tabIndex={0} className="btn btn-primary text-white">
          Sort by <MdArrowDropDown size={25} />
        </label>
        <ul
          tabIndex={0}
          className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
        >
          <li>
            <div onClick={() => sortHandler('date', 'ASC')}>Date ASC</div>
          </li>
          <li>
            <div onClick={() => sortHandler('date', 'DESC')}>Date DESC</div>
          </li>
          <li>
            <div onClick={() => sortHandler('transaction', 'ASC')}>
              Transaction ASC
            </div>
          </li>
          <li>
            <div onClick={() => sortHandler('transaction', 'DESC')}>
              Transaction DESC
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
