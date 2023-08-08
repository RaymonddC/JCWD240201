import Footer from '../Components/Layout/Footer';
import NavBar from '../Components/Layout/Navbar';
import ProductCard from '../Components/Products/ProductCard';
import jumbotronImage from '../utils/images/jumbotronImage.png';
import prescriptionImage from '../utils/images/prescription.svg';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../Features/Product/ProductSlice';
import { useEffect } from 'react';
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { addToCartAsync } from '../Features/Cart/CartSlice';

export default function Landing() {
  const dispatch = useDispatch();
  const fileTypes = ['JPEG', 'PNG', 'JPG'];
  const ProductsStore = useSelector((state) => state?.products?.products);
  console.log(ProductsStore);
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
  const productMap = ProductsStore?.data?.rows?.map((value, index) => {
    return (
      <div key={`product${index}`} className="carousel-item ">
        <ProductCard data={value} />
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
    dispatch(getProducts({ page: 1, limit: 9, search: '' }));
  }, [dispatch]);
  return (
    <>
      {/* <NavBar /> */}
      <div className="flex  justify-center">
        <article className="prose">
          <h2 className="mx-5 text-center lg:hidden">
            YOUR TRUSTED ONLINE PHARMACY STORE
          </h2>
        </article>
      </div>
      <div className="relative flex drop-shadow-md justify-end my-3 md:mx-9 border rounded-lg bg-[#92c3d1]">
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
      <div className="flex my-5 px-3 justify-center">
        <div className="w-fit items-center flex flex-col lg:flex-row drop-shadow-md mt-5 p-3 mx-5 bg-gray-200 rounded-xl">
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
      <div className=" mt-10 flex justify-end pr-[10%]">
        <article className="prose">
          <Link to="/products">
            <h3>See all</h3>
          </Link>
        </article>
      </div>
      <div className="flex mb-20 justify-center">
        <div className="flex overflow-auto w-[72%] p-4 space-x-4 rounded-box">
          {productMap}
        </div>
      </div>
      {/* <div className="w-full">
        <Footer />
      </div> */}
    </>
  );
}

/*
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

import "./styles.css";

const fileTypes = ["JPEG", "PNG", "GIF"];

export default function App() {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
  return (
    <div className="App">
      <h1>Hello To Drag & Drop Files</h1>
      <FileUploader
        multiple={true}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      />
      <p>{file ? `File name: ${file[0].name}` : "no files uploaded yet"}</p>
    </div>
  );
}

*/
