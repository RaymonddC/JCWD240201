// import { toast } from 'react-hot-toast';
// import { Navigate } from 'react-router-dom';

// export const handleAddToCart = (values, user) => {
//   if (Object.keys(user).length === 0) {
//     toast.error('Login First before adding product to cart');
//     return <Navigate to={'/login'} />;
//   }
// };
export const processData = (values) => {
  try {
    let totalPrice = 0,
      totalCart = 0,
      activeCart = 0,
      weight = 0,
      discount = 0;
    values.map((value) => {
      totalCart += value.qty;
      if (value.is_check) {
        activeCart += value.qty;
        totalPrice += value.qty * value.product.price;
        weight += value.product.weight;
        discount += value.qty * value.disc;
        // value.product.promotions?.map((promo) => {
        //   if (promo?.discount)
        //     discount +=
        //       value.qty * value.product.price * (promo.discount / 100);
        // });
      }
    });
    return {
      carts: values,
      totalCart,
      totalPrice,
      activeCart,
      discount,
      weight,
    };
  } catch (error) {
    console.log(error);
  }
};
