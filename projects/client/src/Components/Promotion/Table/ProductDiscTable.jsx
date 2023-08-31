import Pagination from "../../Layout/Pagination";

export default function ProductDiscTable(props) {
  return (
    <>
      <div className="font-bold text-xl">Product Discount</div>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Create Date</th>
            <th>Product</th>
            <th>Discount</th>
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
                <td>{value?.discount}%</td>
                <td>{value?.limit}</td>
                <td>{value?.date_start}</td>
                <td>{value?.date_end}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="py-5">
        <Pagination
          setPage={props.setPage}
          page={props.page || 1}
          totalPages={props.totalPages}
        />
      </div>
    </>
  );
}
