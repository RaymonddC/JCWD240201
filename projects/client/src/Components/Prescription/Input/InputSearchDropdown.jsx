import { useSelector } from 'react-redux';

export default function InputSearchDropdown(props) {
  const { productDropdown } = useSelector((state) => state?.products);
  const {
    setOpenDropdown,
    openDropdown,
    formik,
    setSelectedProduct,
    data,
    openedStock,
    setOpenedStock,
    closedStock,
    setClosedStock,
    debouncedSearchValue,
  } = props;

  return (
    <>
      <label>Product Name</label>
      <div className="relative">
        <input
          disabled={data ? true : false}
          className="input input-bordered input-primary w-full max-w-xs"
          type="text"
          name="search"
          placeholder="Search Product"
          onClick={() => setOpenDropdown(!openDropdown)}
          onChange={formik.handleChange}
          value={formik.values.search}
        />
        <div
          className={
            openDropdown
              ? 'w-full max-w-xs absolute bg-white border border-primary rounded-lg z-10'
              : 'hidden'
          }
        >
          {productDropdown?.data?.rows.map((value, index) => {
            return (
              <p
                key={value.id}
                className="p-2 border-b border-[#D5D7DD] cursor-pointer hover:font-bold"
                onClick={() => {
                  formik.setFieldValue('product_id', value.id);
                  setOpenDropdown(!openDropdown);
                  setSelectedProduct(value);
                  formik.setFieldValue('search', value.name);
                  if (openedStock) setOpenedStock(undefined);
                  if (closedStock) setClosedStock(undefined);
                  if (formik.values.unit_conversion)
                    formik.setFieldValue('unit_conversion', '');
                  if (formik.values.qty > 1 || formik.values.qty < 1)
                    formik.setFieldValue('qty', 1);
                }}
              >
                {value?.name}
              </p>
            );
          })}
        </div>
        {debouncedSearchValue !== formik.values.search ? (
          <div className="absolute left-[290px] top-[15px] bg-white">
            <span className="loading h-fit loading-spinner loading-xs"></span>
          </div>
        ) : null}
      </div>
    </>
  );
}
