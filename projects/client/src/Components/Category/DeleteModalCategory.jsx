import { toast } from 'react-hot-toast';
import { deleteAddress } from '../../API/addressAPI';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../Features/Category/CategorySlice';
import { deleteCategory } from '../../API/categoryAPI';

export default function DeleteModalCategory(props) {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => state.categories);

  const deleteHandler = async () => {
    try {
      const response = await deleteCategory(
        localStorage.getItem('token'),
        props.id,
      );
      if (response?.data?.success) {
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
          <h3 className="font-bold text-lg mb-4">Delete Category</h3>
          <p className="font-normal">
            Are you sure want to Delete This category?
          </p>
          <p className="font-normal text-center">
            You cannot restore an category that <br />
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
              className="btn bg-primary text-white hover:bg-primary"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
