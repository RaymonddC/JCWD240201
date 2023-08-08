import { useState } from 'react';
import { MdDeleteOutline, MdModeEdit } from 'react-icons/md';
import EditPrescriptionModal from './EditPrescriptionModal';
import DeletePrescriptionListModal from './DeletePrescriptionListModal';

export default function ProductListCard(props) {
  const [openEditModal, setOpenEDitModal] = useState();
  return (
    <tr>
      <td className="whitespace-nowrap">{props?.data?.product?.name}</td>
      <td className="whitespace-nowrap">
        {props?.data?.qty}{' '}
        {props?.data?.unit_conversion
          ? props?.data?.product?.product_type?.unit
          : props?.data?.product?.packaging_type?.type_name}
      </td>
      <td className="whitespace-nowrap">
        Rp. {props?.data?.price?.toLocaleString('id-ID')}
      </td>
      <td
        className={`flex whitespace-nowrap ${
          props?.disableAction ? 'hidden' : ''
        }`}
      >
        {openEditModal ? (
          <EditPrescriptionModal
            data={props?.data}
            open={openEditModal}
            closeModal={() => setOpenEDitModal(false)}
          />
        ) : null}
        <MdModeEdit
          className="cursor-pointer"
          onClick={() => setOpenEDitModal(true)}
          size="24px"
        />
        <DeletePrescriptionListModal id={props?.data?.id} />
      </td>
    </tr>
  );
}
