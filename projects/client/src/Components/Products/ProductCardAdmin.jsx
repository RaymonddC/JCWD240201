import { MdDeleteOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function ProductCardAdmin(props) {
  const navigate = useNavigate();
  const productName = props?.data?.name;
  const price = props?.data?.price?.toLocaleString(['id']);
  const productId = props?.data.id;
  const stock = props?.data?.closed_stocks[0]?.total_stock;
  const packaging = props?.data?.packaging_type?.type_name;

  return (
    <>
      <label
        onClick={() => props.setProductId(productId)}
        htmlFor="detail_product"
        className="flex bg-base-100  items-center w-full max-w-4xl shadow-xl hover:cursor-pointer hover:bg-slate-100"
      >
        <img
          className="h-24 hidden md:block px-5"
          src="https://res-3.cloudinary.com/dk0z4ums3/image/upload/c_scale,h_750,w_750/v1/production/pharmacy/products/1643869601_tolak_angin_sidomuncul_12_sachet_15_ml"
          alt=""
        />
        <div className="flex justify-between items-center w-full">
          <div className="px-5 ">
            <p className="font-bold line-clamp-2">{productName}</p>
            {props.stockPage ? (
              <p>
                Stock: {stock ? stock : 0} {packaging}
              </p>
            ) : (
              <p>Rp. {price}</p>
            )}
          </div>
          <div className="flex gap-3 pr-5 justify-end">
            {props.stockPage ? (
              <label
                htmlFor="update_stock"
                className="btn btn-accent"
                onClick={() => props.setProductId(productId)}
              >
                Update
              </label>
            ) : (
              <>
                <button
                  onClick={() =>
                    navigate(`/products/edit/admin?productId=${productId}`)
                  }
                  className="btn btn-sm md:btn-md btn-accent"
                >
                  edit
                </button>
                <label
                  htmlFor="my_modal_6"
                  className="btn btn-sm md:btn-md btn-accent"
                  onClick={() => props.setProductId(productId)}
                >
                  <MdDeleteOutline size={30} />
                </label>
              </>
            )}
          </div>
        </div>
      </label>
    </>
  );
}
