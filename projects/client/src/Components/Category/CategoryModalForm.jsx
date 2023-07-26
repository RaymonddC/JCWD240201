import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import InputUserText from '../Profile/Input/InputUserText';
import { useEffect } from 'react';
import { createCategory, editCategory } from '../../API/categoryAPI';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../Features/Category/CategorySlice';

export default function CategoryModalForm(props) {
  const { search } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      category_name: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.category_name) {
        errors.category_name = 'Category name is required';
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let token = localStorage.getItem('token');
        setSubmitting(true);
        let response;
        if (props?.data) {
          response = await editCategory(token, values, props?.data?.id);
        } else {
          response = await createCategory(token, values);
        }

        if (response.data.success) {
          toast.success(response?.data?.message);
          dispatch(getAllCategories(search));
          setSubmitting(false);
          props?.closeModal();
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  useEffect(() => {
    if (props?.data) {
      formik.setValues({
        category_name: props?.data?.category_name,
      });
    }
    return () => {
      formik.resetForm();
    };
  }, []);
  return (
    <div>
      <input
        readOnly
        checked={props?.isOpen}
        type="checkbox"
        id="my_modal_6"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <form onSubmit={formik.handleSubmit}>
            <InputUserText
              id="category_name"
              label="Category Name"
              name="category_name"
              placeholder="Category Name"
              errors={formik?.errors?.category_name}
              handleChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              touched={formik?.touched?.category_name}
              values={formik?.values?.category_name}
            />
            <div className="modal-action">
              <button
                disabled={formik.isSubmitting}
                className="btn"
                type="button"
                onClick={() => props?.closeModal()}
              >
                Close!
              </button>
              <button
                disabled={formik.isSubmitting}
                className="btn btn-primary"
                type="submit"
              >
                save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
