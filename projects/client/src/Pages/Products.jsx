import NavBar from '../Components/Layout/Navbar';
import { useEffect, useRef, useState } from 'react';
import { getQuestions } from '../Features/QnA/QnASlice';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../Features/Product/ProductSlice';

export default function Products() {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
	const ProductsStore = useSelector((state) => state?.products);
	const totalPages = ProductsStore?.totalPage;
  const [page, setPage] = useState(1);
  console.log(ProductsStore)

	useEffect(() => {
    dispatch(getProducts({ page, limit: 2 }));
  }, [page, dispatch]);
  return (
    <>
      <NavBar />
    </>
  );
}
