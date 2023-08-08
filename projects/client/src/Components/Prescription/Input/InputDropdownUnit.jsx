export default function InputDropdownUnit(props) {
  const { formik, selectedProduct } = props;
  return (
    <div className="flex flex-col">
      <label htmlFor="">Unit</label>
      <select
        disabled={formik?.values?.product_id ? false : true}
        className="select select-primary w-full"
        product_name
        onChange={(e) => {
          formik.setFieldValue('unit_conversion', e.target.value);
        }}
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
