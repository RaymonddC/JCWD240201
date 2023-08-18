import { useSelector } from 'react-redux';

export default function ProductListTable() {
  const { prescriptionCartProductList } = useSelector(
    (state) => state.PrescriptionCart,
  );
  return (
    <table className="min-w-full table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {prescriptionCartProductList?.length ? (
          prescriptionCartProductList?.map((value, index) => {
            return <ProductListCard key={index} data={value} />;
          })
        ) : (
          <tr>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
