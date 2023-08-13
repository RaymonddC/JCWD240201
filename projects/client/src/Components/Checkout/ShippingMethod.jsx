import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCourierServiceSlice,
  setShippingFee,
} from '../../Features/Checkout/CheckoutSlice';

export default function ShippingMethod(props) {
  const [courier, setCourier] = useState();
  const dispatch = useDispatch();
  const { weight } = useSelector((state) => state?.cart);
  const { selectedAddress } = useSelector((state) => state.address);
  const { courierServices, shippingFee } = useSelector(
    (state) => state.checkout,
  );

  useEffect(() => {
    if (courier) {
      dispatch(
        getCourierServiceSlice({
          courier: courier,
          origin: '501',
          destination: selectedAddress.city_id,
          weight: weight,
        }),
      );
      dispatch(setShippingFee(0));
    }
  }, [courier, selectedAddress]);

  useEffect(() => {
    props.setShipping({ courier: courier });
  }, [courier]);

  return (
    <div className="shadow-md p-4 rounded-xl">
      <h2 className="w-full font-bold text-[18px] pb-2 border-b-2 border-[#D5D7DD]">
        Shipping Method
      </h2>
      <div className="py-2 border-b-2 border-[#D5D7DD]">
        <h3>Courier Option</h3>
        <select
          className="select select-bordered w-full max-w-xs"
          onChange={(e) => setCourier(e.target.value)}
        >
          <option hidden>Pick your courier</option>
          <option value="jne">JNE</option>
          <option value="tiki">TIKI</option>
          <option value="pos">POS</option>
        </select>
      </div>
      <div className="pt-2">
        <h3>Choose Service</h3>
        {courier && !courierServices.length ? (
          <div className="select select-disabled items-center p-0 w-full select-bordered max-w-xs justify-center">
            <span className="loading h-fit loading-spinner loading-xs"></span>
          </div>
        ) : (
          <select
            disabled={!courier || !courierServices.length}
            className="select select-bordered w-full max-w-xs"
            onChange={(e) => dispatch(setShippingFee(Number(e.target.value)))}
            value={shippingFee}
          >
            <option value={0} hidden>
              Pick your duration
            </option>
            {courierServices.map((value, index) => {
              return (
                <option key={index} value={value.cost[0].value}>
                  {value.service} ({value.cost[0].etd} Day)
                </option>
              );
            })}
          </select>
        )}
      </div>
    </div>
  );
}
