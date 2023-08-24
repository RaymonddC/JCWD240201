import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAsync } from '../../Features/Cart/CartSlice';
import { Link } from 'react-router-dom';
// import { handleAddToCart } from '../../Helper/cartHelper';

export default function ProductCard(props) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const productName = props?.data?.name;
  const productId = props?.data?.id;
  const price = props?.data?.price?.toLocaleString(['id']);
  const reqPrescripton = props?.data?.require_prescription;
  let promotionType;
  const promotions = props?.data?.promotions ? props.data.promotions : null;
  if (promotions) {
    for (let i = 0; i < promotions.length; i++) {
      if (promotions[i].promotion_type_id === 1) {
        promotionType = promotions[i];
        i = promotions.length;
      } else {
        promotionType = promotions[i];
      }
    }
  }

  const image = props?.data?.product_images
    ? props?.data?.product_images[0]?.image
    : '';

  // const image=''
  // console.log(promotion.promotion_type_id);

  const handleAddToCart = () => {
    if (reqPrescripton) {
      return toast.error('This product requires prescription');
    }
    if (Object.keys(user).length === 0) {
      return toast.error('Login first before adding product to cart');
      // return navigate('/login');
    }
    dispatch(addToCartAsync({ productId: productId }));
  };

  return (
    <>
      <div className="card card-compact w-32 h-72 md:w-40 bg-base-100 shadow-xl mx-2">
        <figure>
          <Link to={`/products/${productId}`}>
            <div className="h-28 pt-1">
              <img
                className="h-28 object-scale-down"
                src={image ? `http://localhost:8000/${image}` : null}
                alt=""
              />
            </div>
          </Link>
        </figure>
        <div className="card-body flex flex-col justify-between ">
          <div className="font-bold line-clamp-2">{productName}</div>
          <div className=''>
            <div className=" flex flex-col h-14 ">
              <p>Rp. {price}</p>
              <div className='flex'>
                {promotionType ? (
                  <p className="badge badge-secondary badge-outline badge-xs md:badge-md mb-2">
                    {promotionType?.promotion_type_id === 1
                      ? `${promotionType?.discount} % discount`
                      : `buy ${promotionType?.buy} get${promotionType?.get}`}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="card-actions justify-end">
              <button
                onClick={() => {
                  handleAddToCart();
                }}
                className="btn btn-xs md:btn-sm btn-primary btn-outline"
              >
                {reqPrescripton ? 'prescription' : 'add to cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
