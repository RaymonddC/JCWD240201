import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MenuBarDesktop from '../Components/Layout/MenuBarDesktop';
import NavBar from '../Components/Layout/Navbar';
import MenuBarMobile from '../Components/Layout/MenuBarMobile';
import { useEffect, useState } from 'react';
import {
  getProvinceAsync,
  getUserAddressAsync,
} from '../Features/Address/AddressSlice';
import CardAddress from '../Components/Address/CardAddress';
import AddressModal from '../Components/Address/addressModal';

export default function Address() {
  let token = localStorage.getItem('token');
  const dispatch = useDispatch();

  const [openAddressModal, setOpenAddressModal] = useState(false);
  const { address, loadAddress } = useSelector((state) => state.address);

  useEffect(() => {
    dispatch(getUserAddressAsync());
    dispatch(getProvinceAsync());
  }, []);

  if (!token) {
    return <Navigate to={'/login'} />;
  }
  console.log(address);
  return (
    <>
      {/* <NavBar /> */}
      <div className="flex flex-col items-center lg:flex-row lg:items-start lg:justify-center px-4 gap-4 pt-2">
        <MenuBarDesktop />
        <div className="w-full max-w-[736px] lg:max-w-[776px] lg:p-4 rounded-lg">
          <div className="flex justify-between mb-4">
            <div className="flex items-center">
              <MenuBarMobile />
              <h3 className="text-[20px] lg:text-[23px] font-bold">Address</h3>
            </div>
            <button
              className="btn btn-outline border-primary text-primary hover:bg-primary hover:border-primary"
              onClick={() => setOpenAddressModal(true)}
            >
              ADD ADDRESS
            </button>
            {openAddressModal ? (
              <AddressModal
                addAddress
                openAddressModal={openAddressModal}
                closeModal={() => setOpenAddressModal(false)}
              />
            ) : null}
          </div>
          <div className="text-[16px] min-h-[356px] grid gap-4 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-lg p-4">
            {loadAddress === false && !address.length ? (
              <div className="flex flex-col items-center">
                <h3 className="text-[18px] font-bold">
                  Oops! You haven't set an address yet
                </h3>
                <p>Please set your address by clicking Add Address</p>
              </div>
            ) : (
              address.map((value) => {
                return <CardAddress data={value} />;
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}
