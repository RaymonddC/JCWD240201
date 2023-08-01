import { useEffect, useState } from 'react';
import { getProducts } from '../../Features/Product/ProductSlice';
import useDebounce from '../../Hooks/useDebounce';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InputDropdown from './InputDropdown';

export default function CopyPrescriptionModal(props) {
  const [div, setDiv] = useState(1);

  return (
    <>
      {/* Put this part before </body> tag */}
      <input
        readOnly
        checked={props?.open}
        type="checkbox"
        id="my_modal_6"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box max-w-[1110px]">
          <div className="grid grid-cols-1 xl:grid-cols-2">
            {/* <div className="bg-primary aspect-[4/3]"></div> */}
            <img
              className="max-w-[500px]"
              src={props?.prescription_image}
              alt="prescription_image"
            />
            <div>
              {Array.from({ length: div }).map((_, index) => (
                <InputDropdown id={index + 1} setSearch />
              ))}
              <button onClick={() => setDiv((prev) => prev + 1)}>
                Increment
              </button>
            </div>
          </div>
          <div className="modal-action">
            <button
              onClick={() => {
                setDiv(1);
                props?.closeModal();
              }}
              htmlFor="my_modal_6"
              className="btn"
            >
              Close!
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
