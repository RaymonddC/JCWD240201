import { MdDeleteOutline } from 'react-icons/md';

export default function DeleteModal() {
  return (
    <>
      {/* The button to open modal */}
      <label htmlFor="my_modal_6" className="btn btn-accent">
        <MdDeleteOutline size={30}/>
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Product</h3>
          <p className="py-4">Are you sure want to delete product?</p>
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn">
              Close
            </label>
            <label htmlFor="my_modal_6" className="btn btn-accent">
              Delete
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
