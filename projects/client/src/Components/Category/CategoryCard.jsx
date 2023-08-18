import { MdOutlineMoreVert } from 'react-icons/md';
import DeleteModalCategory from './DeleteModalCategory';
import { useState } from 'react';
import CategoryModalForm from './CategoryModalForm';

export default function CategoryCard(props) {
  const [openDeleteModal, setOpenDeletemodal] = useState(false);
  const [openModalForm, setOpenModalForm] = useState(false);

  return (
    <div
      key={props?.data?.id}
      className="w-full h-full bg-white p-4 rounded-lg shadow-lg flex justify-between items-center"
    >
      <div>
        <p>{`${props?.data?.category_name}`}</p>
        <DeleteModalCategory
          open={openDeleteModal}
          closeModal={() => setOpenDeletemodal(false)}
          id={props?.data?.id}
        />
        {openModalForm ? (
          <CategoryModalForm
            isOpen={openModalForm}
            closeModal={() => setOpenModalForm(false)}
            data={props?.data}
          />
        ) : null}
      </div>
      <div className="dropdown dropdown-bottom dropdown-end">
        <label tabIndex={0} className="cursor-pointer">
          <MdOutlineMoreVert size="24px" />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-fit"
        >
          <li onClick={() => setOpenModalForm(true)}>
            <span>Update</span>
          </li>
          <li onClick={() => setOpenDeletemodal(true)}>
            <span>Delete</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
