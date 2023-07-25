import { MdDeleteOutline } from 'react-icons/md';

export default function DeleteModal() {
  return (
    <>
      {/* The button to open modal */}
      <label htmlFor="my_modal_6" className="btn">
        <MdDeleteOutline/>
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">This modal works with a hidden checkbox!</p>
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn">
              Close!
            </label>
            <label htmlFor="my_modal_6" className="btn">
              Delete
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
