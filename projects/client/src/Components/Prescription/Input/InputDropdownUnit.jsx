import { useSelector } from 'react-redux';

export default function InputDropdownUnit(props) {
  const { formik, selectedProduct, setClosedStock, setOpenedStock } = props;
  const { prescriptionCartProductList } = useSelector(
    (state) => state.PrescriptionCart,
  );
  const changeHandler = (e) => {
    const find = prescriptionCartProductList.find(
      (item) =>
        item.product_id === selectedProduct.id &&
        item.unit_conversion.toString() === e.target.value,
    );
    if (find) {
      if (e.target.value === 'true' && find?.unit_conversion === true)
        setOpenedStock(
          (selectedProduct?.opened_stocks[0]?.qty
            ? selectedProduct?.opened_stocks[0]?.qty
            : 0) +
            selectedProduct?.closed_stocks[0]?.total_stock *
              selectedProduct?.net_content -
            find?.qty,
        );
      if (e.target.value === 'false' && find?.unit_conversion === false)
        setClosedStock(
          selectedProduct?.closed_stocks[0]?.total_stock - find?.qty,
        );
    } else {
      if (e.target.value === 'true')
        setOpenedStock(
          (selectedProduct?.opened_stocks[0]?.qty
            ? selectedProduct?.opened_stocks[0]?.qty
            : 0) +
            selectedProduct?.closed_stocks[0]?.total_stock *
              selectedProduct?.net_content,
        );
      if (e.target.value === 'false')
        setClosedStock(selectedProduct?.closed_stocks[0]?.total_stock);
    }
    formik.setFieldValue('unit_conversion', e.target.value);
  };
  return (
    <div className="flex flex-col">
      <label htmlFor="">Unit</label>
      <select
        disabled={formik?.values?.product_id ? false : true}
        className="select select-bordered w-full"
        onChange={(e) => changeHandler(e)}
        value={formik.values.unit_conversion}
      >
        <option value="null" hidden>
          Select Units
        </option>
        <option value="false">
          {selectedProduct?.packaging_type?.type_name}
        </option>
        <option value="true">{selectedProduct?.product_type?.unit}</option>
      </select>
    </div>
  );
}
