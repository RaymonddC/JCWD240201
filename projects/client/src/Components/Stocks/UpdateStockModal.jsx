import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import InputUserText from '../Profile/Input/InputUserText';
import InputNumber from './Input/InputNumber';
import SelectAction from './Input/SelectAction';
import Select from '../Products/Input/Select';
import { useEffect, useState } from 'react';
import { getHistoryTypeAPI, updateStockAPI } from '../../API/stockAPI';
import { validateUpdateStock } from '../../Helper/stockHelper';

export default function UpdateStockModal(props) {
  const [historyType, setHistoryType] = useState(null);
  const [defaultValue, setDefaultValue] = useState(true);
  const formik = useFormik({
    initialValues: {
      stock_history_type_id: "0",
      qty: '',
      action: "0",
      notes: '',
    },
    validate: validateUpdateStock,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const result = await updateStockAPI(values, props.productId);
        if (result?.data?.success) {
          setDefaultValue(false);
          toast.success(result?.data?.message);
          formik.setValues({
            stock_history_type_id: "0",
            qty: '',
            action: "0",
            notes: '',
          });
          formik.resetForm();
          props.isUpdated(true);
          setSubmitting(false);
        } else {
          const errorMessage = { message: result?.data?.message };
          throw errorMessage;
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  const onClose = () => {
    setDefaultValue(false);
    formik.resetForm();
    formik.setValues({
      stock_history_type_id: "0",
      qty: '',
      action: "0",
      notes: '',
    });
  };
console.log(formik.values);
  const getHistoryType = async () => {
    const result = await getHistoryTypeAPI();
    setHistoryType(result?.data?.data);
  };

  useEffect(() => {
    getHistoryType();
  }, []);
  return (
    <>
      <input type="checkbox" id="update_stock" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Stock</h3>
          <form onSubmit={formik.handleSubmit}>
            <InputNumber
              id="qty"
              label="Quantity"
              name="qty"
              errors={formik?.errors?.qty}
              handleChange={formik?.handleChange}
              values={formik?.values?.qty}
              touched={formik.touched?.qty}
            />
            <SelectAction
              id="action"
              name="action"
              handleChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              errors={formik?.errors?.action}
              value={formik?.values?.action}
              placeholder="Please select action"
              label="Action"
              touched={formik.touched?.action}
              selected={defaultValue}
            />
            <Select
              id="history_type"
              name="stock_history_type_id"
              handleChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              errors={formik?.errors?.stock_history_type_id}
              value={formik?.values?.stock_history_type_id}
              data={historyType}
              placeholder="Please select update type"
              label="Update Type"
              touched={formik.touched?.stock_history_type_id}
              selected={defaultValue}
            />
            <InputUserText
              id="notes"
              label="Notes"
              name="notes"
              errors={formik?.errors?.notes}
              handleChange={formik?.handleChange}
              values={formik?.values?.notes}
              touched={formik.touched?.notes}
            />
            <div className="grid grid-cols-2 gap-4 my-6 mb-6">
              <label
                htmlFor="update_stock"
                className="btn w-full bg-primary text-white"
                onClick={() => onClose()}
              >
                Close
              </label>
              <button
                htmlFor="update_stock"
                disabled={!formik.isValid || formik.isSubmitting}
                type="submit"
                className="btn w-full bg-primary text-white"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
