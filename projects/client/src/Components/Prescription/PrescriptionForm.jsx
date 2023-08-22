import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../Features/Product/ProductSlice';
import useDebounce from '../../Hooks/useDebounce';
import { useParams } from 'react-router-dom';
import {
  createPrescriptionCartProductSlice,
  updatePrescriptionCartProductSlice,
} from '../../Features/PrescriptionCart/PrescriptionCartSlice';
import InputSearchDropdown from './Input/InputSearchDropdown';
import InputQty from './Input/InputQty';
import InputDropdownUnit from './Input/InputDropdownUnit';

export default function PrescriptionForm(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openedStock, setOpenedStock] = useState(undefined);
  const [closedStock, setClosedStock] = useState(undefined);

  console.log(closedStock, openedStock);

  const formik = useFormik({
    initialValues: {
      search: '',
      product_id: '',
      unit_conversion: '',
      qty: 1,
    },
    validate: (values) => {
      let errors = {};
      if (!values.product_id) {
        errors.product_id = 'Please Input Product';
      }
      if (!values.unit_conversion) {
        errors.unit_conversion = 'Please Input Unit';
      }
      if (
        values.qty >
        (values.unit_conversion === 'true' ? openedStock : closedStock)
      ) {
        errors.qty = `Max quantity : ${
          values.unit_conversion === 'true' ? openedStock : closedStock
        }`;
      }
      if (values.qty <= 0) {
        errors.qty = 'Please input quantity';
      }
      return errors;
    },
    onSubmit: (values, { setSubmitting }) => {
      const { product_id, qty } = values;
      let data = {
        cart_id: Number(id),
        product_id,
        qty,
        unit_conversion: values.unit_conversion === 'true' ? true : false,
      };
      if (props?.data) {
        dispatch(
          updatePrescriptionCartProductSlice(
            id,
            props?.data?.id,
            data,
            setSubmitting,
          ),
        );
        props?.closeModal();
      } else {
        dispatch(createPrescriptionCartProductSlice(id, data));
      }
      formik.resetForm();
    },
  });

  const debouncedSearchValue = useDebounce(formik.values.search, 500);

  useEffect(() => {
    if (props?.data) {
      const { product, unit_conversion, qty } = props?.data;
      formik.setValues({
        search: product?.name,
        product_id: product?.id,
        unit_conversion: unit_conversion ? 'true' : 'false',
        qty: qty,
      });
      setClosedStock(product?.closed_stocks[0]?.total_stock);
      setOpenedStock(
        (product?.opened_stocks[0]?.qty || 0) +
          product?.closed_stocks[0]?.total_stock * product?.net_content,
      );
      setSelectedProduct(product);
    }
    return () => {
      if (props?.data) {
        formik.resetForm();
        dispatch(getProducts({ page: 1, limit: 5, search: '' }));
      }
    };
  }, []);

  useEffect(() => {
    if (!props?.data && props?.data?.product?.name !== formik.values.search) {
      dispatch(
        getProducts({ page: 1, limit: 5, search: debouncedSearchValue }),
      );
    } else {
      dispatch(
        getProducts({ page: 1, limit: 5, search: props?.data?.product?.name }),
      );
    }
  }, [debouncedSearchValue]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <InputSearchDropdown
        setOpenDropdown={setOpenDropdown}
        openDropdown={openDropdown}
        formik={formik}
        setSelectedProduct={setSelectedProduct}
        data={props?.data}
        openedStock={openedStock}
        setOpenedStock={setOpenedStock}
        closedStock={closedStock}
        setClosedStock={setClosedStock}
        debouncedSearchValue={debouncedSearchValue}
      />
      <div className="flex justify-between max-w-xs">
        <InputQty
          formik={formik}
          closedStock={closedStock}
          openedStock={openedStock}
        />
        <InputDropdownUnit
          formik={formik}
          selectedProduct={selectedProduct}
          setClosedStock={setClosedStock}
          setOpenedStock={setOpenedStock}
        />
      </div>
      {formik?.errors?.qty ? (
        <p className="text-error">{formik?.errors?.qty}</p>
      ) : !formik.values.unit_conversion ? (
        <p className="h-[24px]"></p>
      ) : (
        <p>
          Stock :{' '}
          {formik.values.unit_conversion === 'true' ? openedStock : closedStock}
        </p>
      )}
      <div
        className={`flex justify-end gap-4 ${
          props?.data ? 'w-full' : 'max-w-xs'
        }`}
      >
        {props?.data ? (
          <button
            onClick={() => props?.closeModal()}
            className="btn btn-outline btn-primary"
          >
            Close
          </button>
        ) : null}
        <button
          disabled={!formik.values.product_id || !formik.isValid ? true : false}
          className="btn btn-primary text-white"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
