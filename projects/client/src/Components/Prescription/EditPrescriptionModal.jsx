import { useEffect, useState } from 'react';
import { getProducts } from '../../Features/Product/ProductSlice';
import useDebounce from '../../Hooks/useDebounce';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InputDropdown from './InputDropdown';
import PrescriptionForm from './PrescriptionForm';

export default function EditPrescriptionModal(props) {
  return (
    <>
      <input
        readOnly
        checked={props?.open}
        type="checkbox"
        id="my_modal_6"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box max-w-[360px]">
          <h2 className="text-[20px] font-bold mb-4">EDIT FORM</h2>
          <PrescriptionForm
            data={props.data}
            closeModal={() => props?.closeModal()}
          />
        </div>
      </div>
    </>
  );
}
