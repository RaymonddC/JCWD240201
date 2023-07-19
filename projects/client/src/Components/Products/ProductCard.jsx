import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { addToCartAsync } from '../../Features/Cart/CartSlice';
// import { handleAddToCart } from '../../Helper/cartHelper';

export default function ProductCard(props) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (Object.keys(user).length === 0) {
      return toast.error('Login First before adding product to cart');
      // return navigate('/login');
    }
    dispatch(addToCartAsync({ productId: props.product.id, userId: user.id }));
  };

  return (
    <>
      <div className="card card-compact w-60 bg-base-100 shadow-xl">
        <figure>
          <img
            className="h-40"
            src="https://res-3.cloudinary.com/dk0z4ums3/image/upload/c_scale,h_750,w_750/v1/production/pharmacy/products/1643869601_tolak_angin_sidomuncul_12_sachet_15_ml"
            alt="tolak angin"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            Tolak Angin Plus Madu Sido Muncul 15 Ml
          </h2>
          <p>Rp. 15.000</p>
          <div className="card-actions justify-end">
            <button
              onClick={() => {
                handleAddToCart();
              }}
              className="btn btn-sm btn-accent"
            >
              add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
