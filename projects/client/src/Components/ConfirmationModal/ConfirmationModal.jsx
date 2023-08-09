import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { deleteAddress } from '../../API/addressAPI';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../Features/Category/CategorySlice';
import { deleteCategory } from '../../API/categoryAPI';

const ConfirmationModal = (props) => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => state.categories);
  const [open, setOpen] = useState(false);

  const confirmHandler =() => {
    props?.confirm()
    setOpen(false)
  };

  return (
    <>
      <button className={`${props.styling}`} onClick={() => setOpen(true)}>
        <p className=" text-white">{props.label}</p>
      </button>
      <input
        readOnly
        checked={open}
        type="checkbox"
        id={`modal_confirm_${props?.id}`}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box w-fit flex flex-col items-center">
          <article className="prose">
          <h3 className="font-bold text-center text-lg mb-4">{props?.title}</h3>
            <p className="text-center">{props?.textLine1}</p>
            <p className="text-center">{props?.textLine2} </p>
          </article>
          <div className="modal-action">
            <button
              onClick={() => setOpen(false)}
              className="btn btn-outline border-primary hover:border-primary hover:bg-primary"
            >
              Cancel
            </button>
            <button
              onClick={confirmHandler}
              className="btn btn-primary text-white "
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;
