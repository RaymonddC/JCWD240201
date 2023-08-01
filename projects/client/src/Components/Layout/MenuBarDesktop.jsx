import { Link } from 'react-router-dom';

export default function MenuBarDesktop() {
  return (
    <div className="hidden lg:flex w-full h-fit lg:max-w-[255px] lg:flex-col flex-row shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-lg">
      <Link
        to="/user/profile"
        className={
          window.location.pathname === '/user/profile'
            ? 'p-3 text-[#00A8B5] font-bold'
            : 'p-3'
        }
      >
        Profile
      </Link>
      <Link
        to="/user/address"
        className={
          window.location.pathname === '/user/address'
            ? 'p-3 text-[#00A8B5] font-bold'
            : 'p-3'
        }
      >
        Address
      </Link>
      <Link
        to="/user/change-password"
        className={
          window.location.pathname === '/user/change-password'
            ? 'p-3 text-[#00A8B5] font-bold'
            : 'p-3'
        }
      >
        Change Passsword
      </Link>
      <Link
        to="/user/transaction"
        className={
          window.location.pathname === '/user/transaction'
            ? 'p-3 text-[#00A8B5] font-bold'
            : 'p-3'
        }
      >
        Transaction
      </Link>
    </div>
  );
}
