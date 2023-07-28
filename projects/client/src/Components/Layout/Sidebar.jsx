import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAsync } from '../../Features/User/UserSlice';
import Logo from '../../utils/images/logoHealthyMed.svg';
import TransactionIcon from '../../utils/images/Transaction.svg';
import SalesIcon from '../../utils/images/Sales.svg';
import { GiMedicines } from 'react-icons/gi';
import { AiOutlineHome } from 'react-icons/ai';
import { IoIosLogOut } from 'react-icons/io';
import { MdQuestionAnswer } from 'react-icons/md';
import { MdCategory } from 'react-icons/md';
import { MdOutlineInventory2 } from 'react-icons/md';

export const Sidebar = () => {
  let dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  return (
    <div className="fixed sm:w-[80px] lg:w-[275px]  border  border-[#808080] sm:min-h-[100vh] sm:flex sm:flex-col justify-between bottom-0 w-[100vw] text-[#B4B9C7]">
      <div className="flex sm:flex-col gap-[0.5em] items-center lg:items-start  flex-row">
        <Link to={'/'} className="w-full">
          <div className="cardSidebar sm:flex rounded-[50px] gap-[20px] text-[18px] p-[13px] font-bold hover:bg-[#8899a6] hover:bg-opacity-202 hidden justify-center ">
            <img className="h-10 px-2" src={Logo} alt="" />
          </div>
        </Link>
        <Link to={'/'} className="w-full">
          <div className="cardSidebar flex rounded-[50px] gap-[20px] text-[18px] p-[13px] font-bold w-full hover:bg-[#8899a6] hover:bg-opacity-20 justify-center lg:justify-start items-center">
            <AiOutlineHome />
            <p className="hidden lg:block">Dashboard</p>
          </div>
        </Link>
        <Link to={'/categories'} className="w-full">
          <div className="cardSidebar flex rounded-[50px] gap-[20px] text-[18px] p-[13px] font-bold w-full hover:bg-[#8899a6] hover:bg-opacity-20 justify-center lg:justify-start items-center">
            <MdCategory />
            <p className="hidden lg:block">Categories</p>
          </div>
        </Link>
        <Link to={'/products'} className="w-full">
          <div className="cardSidebar flex rounded-[50px] gap-[20px] text-[18px] p-[13px] font-bold w-full hover:bg-[#8899a6] hover:bg-opacity-20 justify-center lg:justify-start items-center">
            <GiMedicines />
            <p className="hidden lg:block">Product</p>
          </div>
        </Link>
        <Link to={'/stocks'} className="w-full">
          <div className="cardSidebar flex rounded-[50px] gap-[20px] text-[18px] p-[13px] font-bold w-full hover:bg-[#8899a6] hover:bg-opacity-20 justify-center lg:justify-start items-center">
            <MdOutlineInventory2 />
            <p className="hidden lg:block">Stock</p>
          </div>
        </Link>
        <Link to={'/discussions'} className="w-full">
          <div className="cardSidebar flex rounded-[50px] gap-[20px] text-[18px] p-[13px] font-bold w-full hover:bg-[#8899a6] hover:bg-opacity-20 justify-center lg:justify-start">
            <MdQuestionAnswer />
            <p className="hidden lg:block">QnA</p>
          </div>
        </Link>
        <Link to={'/transaction'} className="w-full">
          <div className="cardSidebar flex rounded-[50px] gap-[20px] text-[18px] p-[13px] font-bold w-full hover:bg-[#8899a6] hover:bg-opacity-20 justify-center lg:justify-start">
            <img className="" src={TransactionIcon} alt="" />
            <p className="hidden lg:block">Transaction</p>
          </div>
        </Link>
        <Link to={'/sales'} className="w-full">
          <div className="cardSidebar flex rounded-[50px] gap-[20px] text-[18px] p-[13px] font-bold w-full hover:bg-[#8899a6] hover:bg-opacity-20 justify-center lg:justify-start">
            <img className="" src={SalesIcon} alt="" />
            <p className="hidden lg:block">Sales & Revenue</p>
          </div>
        </Link>
      </div>
      <Link to={!user || Object.keys(user).length === 0 ? '/login' : ''}>
        <div className="profile min-w-[100%] p-[13px]   rounded-[50px]  text-[15px]  w-full  hover:bg-[#8899a6] hover:bg-opacity-20 lg:flex-row flex-col gap-2 lg:gap-0 items-center lg:items-start hidden sm:flex">
          <div className="avatar w-[40px] h-[40px] rounded-full m-[12px]">
            <img
              src={`${process.env.REACT_APP_API_URL}/UserProfile/default.png`}
              alt=""
            />
          </div>
          {/* <div className={`detail ${openMenu ? '' : 'invisible'}`}> */}
          <div
            className={`detail align-middle grow text-left  my-auto hidden lg:block`}
          >
            {/* {console.log(user)} */}
            <p className="username">{user?.username || 'Please Login'}</p>
            <p className="email">
              {user?.username ? `${user?.username}@gmail.com` : ''}
            </p>
          </div>

          {/* <MoreHorizRoundedIcon /> */}

          {user && Object.keys(user).length !== 0 ? (
            <div
              className="iconMore m-auto"
              onClick={() => {
                dispatch(logoutAsync());
                // <Navigate to={'/login'} />;
              }}
            >
              {/* <Link to={'/login'}> */}

              <IoIosLogOut size={'25px'} className="m-1" />
              {/* </Link> */}
            </div>
          ) : (
            ''
          )}
        </div>
        {/* <Popover
        id={id}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover> */}
      </Link>
    </div>
  );
};
