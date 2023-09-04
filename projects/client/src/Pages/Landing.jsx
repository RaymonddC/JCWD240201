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
import { getAllLabelsAPI } from '../API/productAPI';
import { toast } from 'react-hot-toast';

export default function Landing() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.user);
  const fileTypes = ['JPEG', 'PNG', 'JPG'];
  const limit = 9;
  const ProductsStore = useSelector((state) => state?.products?.products);
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
  let [vitaminMap, setVitaminMap] = useState(null);
  const getVitamin = async () => {
    try {
      const response = await getAllLabelsAPI({
        page: 1,
        limit,
        category: 'Vitamin',
      });

      const vitaminMap1 = response?.data?.data?.rows?.map((value, index) => {
        return (
          <div key={`vitamin${index}`} className="carousel-item ">
            <ProductCard data={value.product} />
          </div>
        );
      });
      setVitaminMap(vitaminMap1);
    } catch (error) {}
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
      if (user.verified !== true) {
        throw { message: 'Please check your email and verify your account' };
      }
      dispatch(
        addToCartAsync({
          productId: 1,
          qty: 1,
          prescriptionImage: file,
        }),
      );
      setFile(null);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    console.log('>>>')
    console.log(process.env.REACT_APP_API_BASE_URL)
    getVitamin();
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
      <div className="flex  justify-center">
        <article className="prose">
          <h2 className="mx-5 text-center lg:hidden">
            YOUR TRUSTED ONLINE PHARMACY STORE
          </h2>
        </article>
      </div>
      <div className="relative flex drop-shadow-md justify-end my-3 md:mx-9 border rounded-lg bg-[#f6f8fc]">
        <img className=" max-h-60" src={jumbotronImage} alt="" />
        <div className="absolute left-6 top-1">
          <article className="prose">
            <h1 className="hidden lg:block">
              YOUR TRUSTED ONLINE PHARMACY STORE
            </h1>
            <h3 className="hidden lg:hidden">
              <div>YOUR TRUSTED </div>
              <div>ONLINE PHARMACY STORE</div>
            </h3>
            <p className="hidden lg:block">
              At Medicore, your well-being is our top priority. We are a leading
              name in the world of healthcare, dedicated to providing you with
              superior pharmaceutical services and products. We have served the
              community for over a decade, and have become synonymous with
              trust, reliability, and exceptional care.
            </p>
          </article>
        </div>
      </div>
      <div className="flex w-full my-5 px-4 justify-center">
        <div className="w-full items-center flex flex-col lg:flex-row lg:justify-evenly drop-shadow-md mt-5 p-3 mx-5 bg-[#f6f8fc] rounded-xl">
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
                  {file ? `File name: ${file.name}` : 'No files uploaded yet'}
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
        <div className="flex overflow-auto w-[72%] pb-4 px-4 space-x-4 rounded-box">
          {productMap ? <>{productMap}</> : <ProductListSkl limit={limit} />}
        </div>
        <div className="w-full flex pl-[15%] mt-5">
          <article className="prose">
            <h3>Vitamin</h3>
          </article>
        </div>
        <div className="flex overflow-auto w-[72%] pb-4 px-4 space-x-4 rounded-box">
          {vitaminMap ? <>{vitaminMap}</> : <ProductListSkl limit={limit} />}
        </div>
      </div>
    </>
  );
}
