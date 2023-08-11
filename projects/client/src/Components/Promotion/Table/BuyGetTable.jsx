export default function BuyGetTable(props) {
  return (
    <>
      <div className="font-bold text-xl">Buy Get Promotion</div>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Create Date</th>
            <th>Product</th>
            <th>Buy</th>
            <th>Get</th>
            <th>Limit</th>
            <th>Date Start</th>
            <th>Date End</th>
          </tr>
        </thead>
        <tbody>
          {props.data?.map((value) => {
            return (
              <tr>
                <td>{value?.createdAt.split('T')[0]}</td>
                <td>{value?.product?.name}</td>
                <td>{value?.buy}</td>
                <td>{value?.get}</td>
                <td>{value?.limit}</td>
                <td>{value?.date_start}</td>
                <td>{value?.date_end}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
