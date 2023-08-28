import { useSelector } from 'react-redux';

export function TableTopSales() {
  const { topSale } = useSelector((state) => state.salesReport);
  return (
    <table className="min-w-full table">
      <thead>
        <tr>
          <th></th>
          <th>Product</th>
          <th>Total Stock Closed</th>
          <th>Total Stock Opened</th>
        </tr>
      </thead>
      <tbody>
        {topSale.length ? (
          topSale.map((value, index) => {
            return (
              <tr key={index}>
                <th className="whitespace-nowrap">{index + 1}</th>
                <td className="whitespace-nowrap">{value.name}</td>
                <td className="whitespace-nowrap">{value.quantity_closed}</td>
                <td className="whitespace-nowrap">{value.quantity_opened}</td>
              </tr>
            );
          })
        ) : (
          <tr>
            <th className="whitespace-nowrap">-</th>
            <td className="whitespace-nowrap">-</td>
            <td className="whitespace-nowrap">-</td>
            <td className="whitespace-nowrap">-</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
