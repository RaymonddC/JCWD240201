import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAsync } from '../../Features/Cart/CartSlice';
import { Link } from 'react-router-dom';
// import { handleAddToCart } from '../../Helper/cartHelper';

export default function ProductCard(props) {
  console.log('🚀🚀🚀 ~ file: ProductCard.jsx:8 ~ ProductCard ~ props:', props);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const productName = props?.data?.name;
  const productId = props?.data?.id;
  const price = props?.data?.price;
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
  const discount = () => {
    if (promotionType?.promotion_type_id === 1) {
      const disc = promotionType?.discount;
      return Math.round((price * disc) / 100);
    } else {
      return 0;
    }
  };

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
      <Link to={`/products/${productId}`}>
        <div className="card relative card-compact hover:bg-slate-100 w-32 h-72 md:w-40 bg-base-100 shadow-xl mx-2">
          <figure>
            <div className="h-28 pt-2">
              <img
                className="h-28 object-scale-down"
                src={image ? `http://localhost:8000/${image}` : null}
                alt=""
              />
            </div>
          </figure>
          <div className="card-body flex flex-col justify-between ">
            <div className="font-bold line-clamp-2">{productName}</div>
            <div className="">
              <div className=" flex flex-col h-14 ">
                <p
                  className={`text-[#737A8D] text-[14px] line-through ${
                    promotionType?.promotion_type_id !== 1 ? 'hidden' : ''
                  }`}
                >
                  Rp {price?.toLocaleString(['id'])}
                </p>
                <p className={``}>
                  Rp {(price - discount())?.toLocaleString(['id'])}
                </p>
                {/* <p>Rp. {price.toLocaleString(['id'])}</p> */}
                {/* <div className="flex absolute top-6 right-[-3px] rotate-45"> */}
                {promotionType ? (
                  promotionType?.promotion_type_id === 1 ? (
                    <div className="flex absolute top-6 right-[-3px] rotate-45">
                      <p className=" badge badge-primary badge-xs md:badge-md mb-2">
                        {`${promotionType?.discount}% off`}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center pb-2">
                      <div className="badge badge-outline badge-secondary">
                        {`Buy ${promotionType?.buy} Get ${promotionType?.get}`}
                      </div>
                    </div>
                  )
                ) : null}
                {/* </div> */}
              </div>
              <div className="card-actions justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
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
      </Link>
    </>
  );
}
