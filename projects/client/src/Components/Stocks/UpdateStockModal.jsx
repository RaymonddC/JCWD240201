import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import InputUserText from '../Profile/Input/InputUserText';
import InputNumber from './Input/InputNumber';
import SelectAction from './Input/SelectAction';
import Select from '../Products/Input/Select';
import { useEffect, useState } from 'react';
import { getHistoryTypeAPI, updateStockAPI } from '../../API/stockAPI';

export default function UpdateStockModal(props) {
  const [historyType, setHistoryType] = useState(null);
  const formik = useFormik({
    initialValues: {
      stock_history_type_id: '',
      qty: '',
      action: '',
      notes: '',
    },
    // validate: validateAddProduct,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const result = await updateStockAPI(values, props.productId);
        if (result?.data?.success) {
          toast.success(result?.data?.message);
          formik.setValues({
            stock_history_type_id: '',
            qty: '',
            action: '',
            notes: '',
          });
          formik.resetForm();
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
    formik.resetForm();
    formik.setValues({
      stock_history_type_id: '',
      qty: '',
      action: '',
      notes: '',
    });
  };

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
          <h3 className="font-bold text-lg">Update Stock {props.isSelected}</h3>
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
              selected={props.isSelected}
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
