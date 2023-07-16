import Logo from '../../utils/images/logoHealthyMed.svg';
import { MdOutlineMenu } from 'react-icons/md';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <>
      <div className="flex relative gap-2 items-center p-3 ">
        <Link to="/">
          <img className="h-10 px-2" src={Logo} alt="" />
        </Link>
        <div className="hidden sm:block ">
          <div className=" flex">
            <button className="btn btn-sm btn-ghost">Shop</button>
            <button className="btn btn-sm btn-ghost">
              <Link to="/QnA">QnA</Link>
            </button>
          </div>
        </div>
        <div className="absolute right-3 sm:hidden">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost rounded-btn">
              <MdOutlineMenu size={25} />
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
            >
              <li>
                <Link to="/Landing">SHOP</Link>
              </li>
              <li>
                <Link to="/QnA">QNA</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className='w-full flex justify-end'>
          <div className="flex gap-3 ">
            <button className="btn btn-sm btn-accent">Login</button>
            <button className="btn btn-sm btn-outline btn-accent">
              <Link to="/QnA">Register</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
