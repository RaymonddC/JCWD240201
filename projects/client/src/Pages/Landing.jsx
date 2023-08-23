import Footer from '../Components/Layout/Footer';
import NavBar from '../Components/Layout/Navbar';
import ProductCard from '../Components/Products/ProductCard';
import jumbotronImage from '../utils/images/jumbotronImage.svg';
import prescriptionImage from '../utils/images/prescription.svg';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLabels, getProducts } from '../Features/Product/ProductSlice';
import { useEffect } from 'react';
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { addToCartAsync } from '../Features/Cart/CartSlice';
import ProductListSkl from '../Components/Skeleton/ProductListSkl';
import StoreLocation from '../Components/Landing/StoreLocation';
import NavbarDrawer from '../Components/Layout/NavbarDrawer';

export default function Landing() {
  const dispatch = useDispatch();
  const fileTypes = ['JPEG', 'PNG', 'JPG'];
  const limit = 9;
  const ProductsStore = useSelector((state) => state?.products?.products);
  // console.log(ProductsStore?.data?.rows);
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
  const productMap = ProductsStore?.data?.rows?.map((value, index) => {
    return (
      <div key={`product${index}`} className="carousel-item ">
        <ProductCard data={value.product} />
      </div>
    );
  });
  const addToCart = async () => {
    try {
      dispatch(
        addToCartAsync({
          productId: 1,
          qty: 1,
          prescriptionImage: file,
        }),
      );
      setFile(null);
    } catch (error) {}
  };
  useEffect(() => {
    // dispatch(getProducts({ page: 1, limit, search: '' }));
    
    dispatch(
      getLabels({
        page: 1,
        limit,
        category: 'Jamu',
      }),
    );
  }, []);
  return (
    <>
  
      {/* <NavbarDrawer/> */}
      <div className="flex  justify-center">
        <article className="prose">
          <h2 className="mx-5 text-center lg:hidden">
            YOUR TRUSTED ONLINE PHARMACY STORE
          </h2>
        </article>
      </div>
      <div className="relative flex drop-shadow-md justify-end my-3 md:mx-9 border rounded-lg bg-[#f6f8fc]">
        <img className=" max-h-60" src={jumbotronImage} alt="" />
        <div className="absolute left-6 top-3">
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
      <div className="flex my-5 px-3 justify-center">
        <div className="w-fit items-center flex flex-col lg:flex-row drop-shadow-md mt-5 p-3 mx-5 bg-[#f6f8fc] rounded-xl">
          <img
            className="h-28 hidden lg:block "
            src={prescriptionImage}
            alt=""
          />
          <article className="prose">
            <h3 className="px-5"> Have doctor's prescription?</h3>
          </article>
          <div className="py-3 flex flex-col xl:flex-row  items-center ">
            <div className="flex flex-col items-center">
              <article className="prose">
                <p>Drag & drop your files here</p>
              </article>
              <FileUploader
                multiple={false}
                handleChange={handleChange}
                name="file"
                types={fileTypes}
                label="add here"
                maxSixe={1}
              />
              <article className="prose">
                <p>
                  {file ? `File name: ${file.name}` : 'no files uploaded yet'}
                </p>
              </article>
            </div>
            <button onClick={addToCart} className="btn btn-accent mx-5">
              <div>SUBMIT</div>
            </button>
          </div>
        </div>
      </div>
      <div className=" flex justify-end pr-[10%]">
        <article className="prose">
          <Link to="/products">
            <h3>See all</h3>
          </Link>
        </article>
      </div>
      <div className="flex flex-col mb-20 items-center justify-center">
        <div className="w-full flex pl-[15%] ">
          <article className="prose">
            <h3>Jamu</h3>
          </article>
        </div>
        <div className="flex overflow-auto w-[72%] p-4 space-x-4 rounded-box">
          {productMap ? <>{productMap}</> : <ProductListSkl limit={limit} />}
        </div>
      </div>
      <div className=" mt-10 flex justify-end pr-[10%]">
        <article className="prose">
          <h3>Location</h3>
        </article>
      </div>
      <div className="w-full flex justify-center p-5">
        <div className="w-[70%]  " autoFocus={false} tabIndex={-1}>
          <StoreLocation />
        </div>
      </div>
    </>
  );
}
