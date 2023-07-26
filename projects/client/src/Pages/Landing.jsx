import Footer from '../Components/Layout/Footer';
import NavBar from '../Components/Layout/Navbar';
import ProductCard from '../Components/Products/ProductCard';
import jumbotronImage from '../utils/images/jumbotronImage.png';
import prescriptionImage from '../utils/images/prescription.svg';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../Features/Product/ProductSlice';
import { useEffect } from 'react';

export default function Landing() {
  const dispatch = useDispatch();
  const ProductsStore = useSelector((state) => state?.products?.products);
  console.log(ProductsStore)
  const productMap = ProductsStore?.data?.rows?.map((value, index) => {
    return (
      <div key={`product${index}`} className="carousel-item mx-5 ">
        <ProductCard data={value} />
      </div>
    );
  });
  useEffect(() => {
    dispatch(getProducts({ page: 1, limit: 9,search:'' }));
  }, [dispatch]);
  return (
    <>
      <NavBar />
      <div className="flex  justify-center">
        <article className="prose">
          <h2 className="mx-5 text-center lg:hidden">
            YOUR TRUSTED ONLINE PHARMACY STORE
          </h2>
        </article>
      </div>
      <div className="relative flex drop-shadow-md justify-end my-3 mx-5 border rounded-lg bg-[#92c3d1]">
        <img src={jumbotronImage} alt="" />
        <div className="absolute left-3 top-2">
          <article className="prose">
            <h1 className="hidden lg:block">
              YOUR TRUSTED ONLINE PHARMACY STORE
            </h1>
            <h3 className="hidden lg:hidden">
              <div>YOUR TRUSTED </div>
              <div>ONLINE PHARMACY STORE</div>
            </h3>
            <p className="hidden lg:block">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Excepturi maiores dolores doloribus obcaecati officia ea ratione
              omnis id dolore nihil voluptatem eius, eaque explicabo facilis
              ullam quis error culpa soluta?
            </p>
          </article>
        </div>
      </div>
      <div className="flex my-5 justify-center">
        <div className="w-fit items-center flex flex-col md:flex-row drop-shadow-md mt-5 p-3 bg-gray-200 rounded-xl">
          <img
            className="h-28 hidden lg:block "
            src={prescriptionImage}
            alt=""
          />
          <article className="prose">
            <h3> Have doctor's prescription?</h3>
          </article>
          <button className="btn btn-accent mx-5"> Upload Prescription</button>
        </div>
      </div>
      <div className=" mt-10 flex justify-end pr-[10%]">
        <article className="prose">
          <Link to="/products">
            <h3>See all</h3>
          </Link>
        </article>
      </div>
      <div className="flex mb-20 justify-center">
        <div className="carousel carousel-center w-[72%] p-4 space-x-4 rounded-box">
          {productMap}
        </div>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </>
  );
}
