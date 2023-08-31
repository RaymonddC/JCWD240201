import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAsync, onSaveUser } from '../../Features/User/UserSlice';
import Logo from '../../utils/images/Medicore.png';
import TransactionIcon from '../../utils/images/Transaction.svg';
import { BiSolidReport } from 'react-icons/bi';
import { GiMedicines } from 'react-icons/gi';
import { AiOutlineHome } from 'react-icons/ai';
import { IoIosLogOut } from 'react-icons/io';
import { MdQuestionAnswer } from 'react-icons/md';
import { MdCategory } from 'react-icons/md';
import { MdOutlineInventory2 } from 'react-icons/md';
import { FaPrescriptionBottleMedical } from 'react-icons/fa6';
import { MdInventory } from 'react-icons/md';
import { MdDiscount, MdHome } from 'react-icons/md';
import { TbReportAnalytics } from 'react-icons/tb';
import { PiNoteFill } from 'react-icons/pi';

export default function NavbarAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  return (
    <div className="drawer w-full lg:hidden ">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        {/* Navbar */}
        <div className="w-full navbar bg-base-300 bg-white">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
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
          <div className="flex-1 px-2 mx-2">
            {' '}
            <img className="h-10 px-2" src={Logo} alt="" />
          </div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal">
              {/* Navbar menu content here */}
              <li>
                <Link to={'/'} className="w-full">
                  <div className="cardSidebar flex rounded-[50px] gap-[20px] text-[18px] p-[13px] font-bold w-full justify-center lg:justify-start items-center">
                    <MdHome />
                    <p>Dashboard</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link to={'/categories'} className="w-full">
                  <div className="cardSidebar flex rounded-[50px] gap-[20px] text-[18px] p-[13px] font-bold w-full justify-center lg:justify-start items-center">
                    <MdCategory />
                    <p>Categories</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link to={'/products'} className="w-full">
                  <div className="cardSidebar flex rounded-[50px] gap-[20px] text-[18px] p-[13px] font-bold w-full justify-center lg:justify-start items-center">
                    <GiMedicines />
                    <p>Product</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link to={'/stocks'} className="w-full">
                  <div className="cardSidebar flex rounded-[50px] gap-[20px] text-[18px] p-[13px] font-bold w-full justify-center lg:justify-start items-center">
                    <MdInventory />
                    <p>Stock</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link to={'/promotions'} className="w-full">
                  <div className="cardSidebar flex rounded-[50px] gap-[20px] text-[18px] p-[13px] font-bold w-full justify-center lg:justify-start items-center">
                    <MdDiscount />
                    <p>Promotion</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link to={'/discussions'} className="w-full">
                  <div className="cardSidebar flex rounded-[50px] gap-[20px] text-[18px] p-[13px] font-bold w-full justify-center lg:justify-start">
                    <MdQuestionAnswer />
                    <p>QnA</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link to={'/prescription'} className="w-full">
                  <div className="cardSidebar flex rounded-[50px] gap-[20px] text-[18px] p-[13px] font-bold w-full justify-center lg:justify-start">
                    <FaPrescriptionBottleMedical />
                    <p>Prescription</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link to={'/transactions'} className="w-full">
                  <div className="cardSidebar flex rounded-[50px] gap-[20px] text-[18px] p-[13px] font-bold w-full justify-center lg:justify-start">
                    <img className="" src={TransactionIcon} alt="" />
                    <p>Transaction</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link to={'/report'} className="w-full">
                  <div className="cardSidebar flex rounded-[50px] gap-[20px] text-[18px] p-[13px] font-bold w-full justify-center lg:justify-start">
                    <BiSolidReport />
                    <p>Report</p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="drawer-side z-10">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200 max-w-[250px]">
          <li>
            <Link to={'/'} className="w-full">
              <div className="cardSidebar flex rounded-[50px] gap-[20px] text-[18px] p-[13px] font-bold w-full justify-center lg:justify-start items-center">
                <MdHome />
                <p>Dashboard</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to={'/categories'} className="w-full">
              <div className="cardSidebar flex rounded-[50px] gap-[20px] text-[18px] p-[13px] font-bold w-full justify-center lg:justify-start items-center">
                <MdCategory />
                <p>Categories</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to={'/products'} className="w-full">
              <div className="cardSidebar flex rounded-[50px] gap-[20px] text-[18px] p-[13px] font-bold w-full justify-center lg:justify-start items-center">
                <GiMedicines />
                <p>Product</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to={'/stocks'} className="w-full">
              <div className="cardSidebar flex rounded-[50px] gap-[20px] text-[18px] p-[13px] font-bold w-full justify-center lg:justify-start items-center">
                <MdInventory />
                <p>Stock</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to={'/promotions'} className="w-full">
              <div className="cardSidebar flex rounded-[50px] gap-[20px] text-[18px] p-[13px] font-bold w-full justify-center lg:justify-start items-center">
                <MdDiscount />
                <p>Promotion</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to={'/discussions'} className="w-full">
              <div className="cardSidebar flex rounded-[50px] gap-[20px] text-[18px] p-[13px] font-bold w-full justify-center lg:justify-start">
                <MdQuestionAnswer />
                <p>QnA</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to={'/prescription'} className="w-full">
              <div className="cardSidebar flex rounded-[50px] gap-[20px] text-[18px] p-[13px] font-bold w-full justify-center lg:justify-start">
                <FaPrescriptionBottleMedical />
                <p>Prescription</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to={'/transactions'} className="w-full">
              <div className="cardSidebar flex rounded-[50px] gap-[20px] text-[18px] p-[13px] font-bold w-full justify-center lg:justify-start">
                {/* <img className="" src={TransactionIcon} alt="" /> */}
                <PiNoteFill />
                <p>Transaction</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to={'/report'} className="w-full">
              <div className="cardSidebar flex rounded-[50px] gap-[20px] text-[18px] p-[13px] font-bold w-full justify-center lg:justify-start">
                <BiSolidReport />
                <p>Report</p>
              </div>
            </Link>
          </li>
          <li className="flex flex-col justify-end">
            <div className="profile min-w-[100%] p-[13px] rounded-[50px]  text-[15px]  w-full  flex-row gap-2 lg:gap-0 items-center lg:items-start sm:flex">
              <div className={`detail align-middle grow text-left  my-auto`}>
                <p className="username">{user?.username || 'Please Login'}</p>
                <p className="email">
                  {user?.username ? `${user?.username}@gmail.com` : ''}
                </p>
              </div>
              <div
                className="iconMore m-auto"
                onClick={() => {
                  dispatch(logoutAsync(navigate));
                }}
              >
                <IoIosLogOut size={'25px'} className="m-1" />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
