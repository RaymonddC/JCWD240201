import React from 'react';
import { toast } from 'react-hot-toast';
import { deleteAddress } from '../../API/addressAPI';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../Features/Category/CategorySlice';
import { deleteCategory } from '../../API/categoryAPI';

const DeleteModal = (props) => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => state.categories);

  const deleteHandler = async () => {
    try {
      const response = await dispatch(props.delFunc({ id: props.id }));
      if (response?.success) {
        props?.closeModal();
        toast.success(response.data.message);
        dispatch(getAllCategories(search));
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <input
        readOnly
        checked={props?.open}
        type="checkbox"
        id={`modal_delete_${props?.id}`}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box w-fit flex flex-col items-center">
          <h3 className="font-bold text-lg mb-4">Delete {props?.model}</h3>
          <p className="font-normal">
            Are you sure want to Delete This {props?.model}?
          </p>
          <p className="font-normal">
            You cannot restore an {props?.model} that <br />
            has been deleted.
          </p>
          <div className="modal-action">
            <button
              onClick={() => props?.closeModal()}
              className="btn btn-outline border-primary hover:border-primary hover:bg-primary"
            >
              Cancel
            </button>
            <button
              onClick={deleteHandler}
              className="btn btn-primary text-white "
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
