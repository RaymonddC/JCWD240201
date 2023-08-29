export default function InputQty(props) {
  const { formik, closedStock, openedStock } = props;
  return (
    <div className="flex flex-col">
      <label htmlFor="">Quantity</label>
      <div className="join join-horizontal h-[48px] input input-bordered p-0">
        <button
          disabled={
            formik.values.unit_conversion && formik.values.qty > 1
              ? false
              : true
          }
          type="button"
          className="join-item w-[48px] h-full btn btn-sm btn-ghost text-[#009B90]"
          onClick={() => formik.setFieldValue('qty', formik.values.qty - 1)}
        >
          -
        </button>
        <input
          disabled={formik.values.unit_conversion ? false : true}
          className={`join-item min-w-[50px] w-[10px] text-[#009B90] text-center ${
            formik.values.unit_conversion ? '' : 'input-disabled'
          }`}
          type="number"
          min="0"
          name="qty"
          onChange={(e) => {
            if (parseInt(e.target.value) < 1 || e.target.value === '') {
              return formik.setFieldValue('qty', 0);
            }
            return formik.setFieldValue('qty', Number(e.target.value));
          }}
          value={formik?.values?.qty}
        />
        <button
          disabled={
            !formik.values.unit_conversion ||
            formik.values.qty >=
              (formik.values.unit_conversion === 'true'
                ? openedStock
                : closedStock)
              ? true
              : false
          }
          type="button"
          className=" join-item w-[48px] h-full btn btn-sm btn-ghost text-[#009B90]"
          onClick={() => formik.setFieldValue('qty', formik.values.qty + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
}
