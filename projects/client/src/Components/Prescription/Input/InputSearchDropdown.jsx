import { useSelector } from 'react-redux';

export default function InputSearchDropdown(props) {
  const { productDropdown } = useSelector((state) => state?.products);
  const {
    setOpenDropdown,
    openDropdown,
    formik,
    setSelectedProduct,
    setClosedStock,
    setOpenedStock,
    data,
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
                className="p-2 border-b border-[#D5D7DD]"
                onClick={() => {
                  formik.setFieldValue('product_id', value.id);
                  setOpenDropdown(!openDropdown);
                  setSelectedProduct(value);
                  setClosedStock(value?.closed_stocks[0].total_stock);
                  setOpenedStock(
                    (value?.opened_stocks[0]?.qty
                      ? value?.opened_stocks[0]?.qty
                      : 0) +
                      value?.closed_stocks[0]?.total_stock * value?.net_content,
                  );
                  formik.setFieldValue('search', value.name);
                }}
              >
                {value?.name}
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
}
