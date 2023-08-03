import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAsync } from '../../Features/Cart/CartSlice';
import { Link } from 'react-router-dom';
// import { handleAddToCart } from '../../Helper/cartHelper';

export default function ProductCard(props) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const productName = props?.data?.name;
  const productId = props?.data?.id
  const price = props?.data?.price?.toLocaleString(['id']);
  // console.log(props?.data)

  const handleAddToCart = () => {
    if (Object.keys(user).length === 0) {
      return toast.error('Login First before adding product to cart');
      // return navigate('/login');
    }
    dispatch(addToCartAsync({ productId: productId }));
  };

  return (
    <>
      <div className="card card-compact w-32 h-68 md:w-40 bg-base-100 shadow-xl mx-2">
        <figure>
          <Link to={`/products/${productId}`}>
            <img
              className="h-28"
              src="https://res-3.cloudinary.com/dk0z4ums3/image/upload/c_scale,h_750,w_750/v1/production/pharmacy/products/1643869601_tolak_angin_sidomuncul_12_sachet_15_ml"
              alt=""
            />
          </Link>
        </figure>
        <div className="card-body">
          <p className="font-bold line-clamp-2">{productName}</p>
          <p>Rp. {price}</p>
          <div className="card-actions justify-end">
            <button
              onClick={() => {
                handleAddToCart();
              }}
              className="btn btn-xs md:btn-sm btn-accent"
            >
              add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
