import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAsync } from '../../Features/Cart/CartSlice';
// import { handleAddToCart } from '../../Helper/cartHelper';

export default function ProductCardAdmin(props) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const productName = props?.data?.name;
  const price = props?.data?.price?.toLocaleString(['id']);
  // console.log(props?.data)

  const handleAddToCart = () => {
    if (Object.keys(user).length === 0) {
      return toast.error('Login First before adding product to cart');
      // return navigate('/login');
    }
    dispatch(addToCartAsync({ productId: props.product.id, userId: user.id }));
  };

  return (
    <>
      <div className=" flex bg-base-100  items-center w-full max-w-4xl shadow-xl">
        <img
          className="h-24 hidden md:block px-5"
          src="https://res-3.cloudinary.com/dk0z4ums3/image/upload/c_scale,h_750,w_750/v1/production/pharmacy/products/1643869601_tolak_angin_sidomuncul_12_sachet_15_ml"
          alt=""
        />
        <div className='flex justify-between items-center w-full'>
          <div className='px-5 '>
            <p className="font-bold line-clamp-2">{productName}</p>
            <p>Rp. {price}</p>
          </div>
          <div className="pr-5 justify-end">
            <button
              onClick={() => {
                handleAddToCart();
              }}
              className="btn btn-sm md:btn-md btn-accent"
            >
              edit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
