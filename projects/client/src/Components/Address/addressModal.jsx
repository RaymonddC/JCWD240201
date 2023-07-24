import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputUserText from '../Profile/Input/InputUserText';
import InputAddressTextField from './input/inputAddressTexField';
import SelectAddress from './input/SelectAddress';
import { validationAddressModal } from '../../Helper/addressHelper';
import {
  getCityAsync,
  getUserAddressAsync,
  setCity,
} from '../../Features/Address/AddressSlice';
import { toast } from 'react-hot-toast';
import { createAddress, updateAddress } from '../../API/addressAPI';

export default function AddressModal(props) {
  const [open, setOpen] = useState(false);
  const [disabled, setdisabled] = useState(true);
  const dispatch = useDispatch();
  const { province, city } = useSelector((state) => state.address);

  const formik = useFormik({
    initialValues: {
      reciever: '',
      phone_number: '',
      province_id: '0',
      city_id: '0',
      address: '',
      notes: '',
    },
    validate: validationAddressModal,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let result;

        if (props.data) {
          result = await updateAddress(
            props?.data?.id,
            values,
            localStorage.getItem('token'),
          );
        } else {
          result = await createAddress(values, localStorage.getItem('token'));
        }

        if (result.data.success) {
          dispatch(getUserAddressAsync());
          toast.success(result.data.message);
          props?.closeModal();
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  useEffect(() => {
    if (
      formik.values.province_id !== '0' &&
      formik.values.province_id !== props?.data?.province_id
    ) {
      dispatch(setCity([]));
      formik.setFieldValue('city_id', '0');
      dispatch(getCityAsync(formik.values.province_id));
    }
    if (
      formik.values.province_id !== '0' &&
      formik.values.province_id === props?.data?.province_id
    ) {
      dispatch(setCity([]));
      dispatch(getCityAsync(formik.values.province_id));
    }
  }, [formik.values.province_id]);

  useEffect(() => {
    if (props?.data) {
      formik.setValues({
        reciever: props?.data?.reciever,
        phone_number: props?.data?.phone_number,
        province_id: props?.data?.province_id,
        city_id: props?.data?.city_id,
        address: props?.data?.address,
        notes: props?.data?.notes,
      });
    }
    return () => {
      formik.resetForm();
      dispatch(setCity([]));
    };
  }, []);

  return (
    <>
      <input
        readOnly
        checked={props.openAddressModal}
        type="checkbox"
        id="my_modal_6"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <form className="flex flex-col" onSubmit={formik.handleSubmit}>
            <InputUserText
              id="reciever"
              label="Reciever Name"
              name="reciever"
              placeholder="John Doe"
              errors={formik?.errors?.reciever}
              handleChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              touched={formik?.touched?.reciever}
              values={formik?.values?.reciever}
            />
            <InputUserText
              id="phone_number"
              label="Phone Number"
              name="phone_number"
              placeholder="0899xxxxxxxx"
              errors={formik?.errors?.phone_number}
              handleChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              touched={formik?.touched?.phone_number}
              values={formik?.values?.phone_number}
            />
            <SelectAddress
              id="province_id"
              label="Province"
              name="province_id"
              errors={formik?.errors?.province_id}
              handleChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              touched={formik?.touched?.province_id}
              values={formik?.values?.province_id}
              placeholder="Select a province"
              data={province}
            />
            <SelectAddress
              id="city_id"
              name="city_id"
              label="City"
              errors={formik?.errors?.city_id}
              handleChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              touched={formik?.touched?.city_id}
              values={formik?.values?.city_id}
              placeholder="Select a city"
              data={city}
            />
            <InputAddressTextField
              id="address"
              label="Address"
              name="address"
              placeholder="Jl. xxxx"
              errors={formik?.errors?.address}
              handleChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              touched={formik?.touched?.address}
              values={formik?.values?.address}
            />
            <InputAddressTextField
              id="notes"
              label="Notes (opsional)"
              name="notes"
              placeholder="House close to market"
              handleChange={formik?.handleChange}
              values={formik?.values?.notes}
            />
            <div className="modal-action">
              <button
                onClick={props?.closeModal}
                className="btn btn-outline border-primary text-primary"
              >
                close
              </button>
              <button type="submit" className="btn btn-primary text-white">
                SAVE
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
