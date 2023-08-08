import { deleteProduct } from '../../API/productAPI';
import { toast } from 'react-hot-toast';

export default function DeleteModal(props) {
  const onDelete = async (productId) => {
    const result = await deleteProduct(productId);
    if (result?.data?.message) {
      toast.success(result?.data?.message);
      props.isDeleted(true);
    }
  };
  return (
    <>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Product</h3>
          <p className="py-4">Are you sure want to delete product?</p>
          <div className="modal-action">
            <label
              htmlFor="my_modal_6"
              className="btn btn-outline border-primary hover:border-primary hover:bg-primary"
            >
              Close
            </label>
            <label
              htmlFor="my_modal_6"
              className="btn btn-primary text-white"
              onClick={() => onDelete(props.productId)}
            >
              Delete
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
