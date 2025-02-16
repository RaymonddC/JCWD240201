import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import {
  getPrescriptionCartSlice,
  setDetailprescriptionCart,
} from '../Features/Cart/CartSlice';
import PrescriptionForm from '../Components/Prescription/PrescriptionForm';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import ProductListCard from '../Components/Prescription/ProductListCard';
import { getPrescriptionCartProductListSlice } from '../Features/PrescriptionCart/PrescriptionCartSlice';
import AcceptSummaryModal from '../Components/Prescription/AcceptSummaryModal';
import DeclinePrescriptionModal from '../Components/Prescription/DeclinePrescriptionModal';
import { MdZoomIn, MdZoomOut } from 'react-icons/md';
import { TbZoomReset } from 'react-icons/tb';

export default function PrescriptionCopyAdmin() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [listProduct, setListProduct] = useState([]);
  const { detailprescriptionCart } = useSelector((state) => state.cart);
  const { prescriptionCartProductList } = useSelector(
    (state) => state.PrescriptionCart,
  );

  useEffect(() => {
    dispatch(getPrescriptionCartSlice(id));
    dispatch(getPrescriptionCartProductListSlice(id));

    return () => {
      dispatch(setDetailprescriptionCart({}));
    };
  }, []);
  if (
    Object.getOwnPropertyNames(detailprescriptionCart).length !== 0 &&
    detailprescriptionCart?.confirmation !== null
  ) {
    return <Navigate to="/prescription" />;
  }
  return (
    <div>
      <h2 className="text-[20px] font-bold mb-4">PrescriptionCopyAdmin</h2>
      <div className="flex flex-col justify-center gap-4 md:flex-row md:space-x-4">
        <div className="flex justify-center">
          <div className="w-full h-fit max-w-[400px] rounded-lg bg-white p-4 shadow-xl">
            <TransformWrapper
              initialScale={1}
              initialPositionX={1}
              initialPositionY={1}
            >
              {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <div className="w-full relative">
                  <TransformComponent style={{ width: '100%' }}>
                    <img
                      className="w-full"
                      src={
                        detailprescriptionCart?.prescription_image
                          ? `${process.env.REACT_APP_API_IMAGE_URL}/${detailprescriptionCart?.prescription_image}`
                          : null
                      }
                      alt="test"
                    />
                  </TransformComponent>
                  <div className="absolute bottom-0 left-0 flex gap-2">
                    <button
                      className="btn btn-circle btn-sm"
                      onClick={() => zoomOut()}
                    >
                      <MdZoomOut size="24px" />
                    </button>
                    <button
                      className="btn btn-circle btn-sm"
                      onClick={() => resetTransform()}
                    >
                      <TbZoomReset size="24px" />
                    </button>
                    <button
                      className="btn btn-circle btn-sm"
                      onClick={() => zoomIn()}
                    >
                      <MdZoomIn size="24px" />
                    </button>
                  </div>
                </div>
              )}
            </TransformWrapper>
          </div>
        </div>
        <div className="md:w-3/5">
          <div className="flex flex-col rounded-lg bg-white h-full p-4 shadow-xl">
            <div className="w-full">
              <h3 className="text-[20px] font-bold">Add Product to List</h3>
              <PrescriptionForm
                send={(test) => setListProduct((prev) => [...prev, test])}
              />
            </div>
            <div className="h-full flex flex-col justify-between">
              <div className="w-full overflow-x-auto">
                <h3 className="text-[20px] font-bold">Product List</h3>
                <table className="min-w-full table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prescriptionCartProductList?.length ? (
                      prescriptionCartProductList?.map((value, index) => {
                        return <ProductListCard key={index} data={value} />;
                      })
                    ) : (
                      <tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end gap-4">
                {/* <button className="btn btn-primary btn-outline">
                Tolak Order
              </button> */}
                <DeclinePrescriptionModal />
                <AcceptSummaryModal />
                {/* <button className="btn btn-primary">Terima Order</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
