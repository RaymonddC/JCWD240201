import { useEffect, useState } from 'react';
import { getProductDetailsAPI } from '../../API/productAPI';
import { GrClose } from 'react-icons/gr';

export default function DetailProductAdmin(props) {
  const URL = `${process.env.REACT_APP_API_BASE_URL}`;
  const [image, setImage] = useState(null);
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState(null);

  const getCurrentData = async () => {
    try {
      const getToken = localStorage.getItem('token');
      const data = { id: props.productId, token: getToken };
      const result = await getProductDetailsAPI(data);
      const categories = result?.data?.labels.map((value) => {
        return value.product_category;
      });
      setImage(result?.data?.data?.product_images[0]?.image);
      setProduct(result?.data?.data);
      setCategories(categories);
    } catch (error) {}
  };

  useEffect(() => {
    getCurrentData();
  }, [props.productId]);
  return (
    <>
      <input type="checkbox" id="detail_product" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <div className="sticky right-0 top-0">
            <div className="flex justify-end">
              <label htmlFor="detail_product" className='hover:cursor-pointer'>
                <GrClose size={'24px'} />
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-evenly gap-3">
              <img
                className="w-6/12"
                src={image ? `${URL}/${image}` : null}
                alt=""
              />
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-2xl">{product?.name}</h3>
                <p className="text-lg font-medium">
                  Rp {product?.price.toLocaleString()}
                </p>
                <div className="font-sm italic">
                  per {product?.packaging_type?.type_name} (
                  {product?.net_content} {product?.product_type?.unit})
                </div>
                <p className="text-sm italic">Weight: {product?.weight} gr</p>
                <p className="text-sm">Label: </p>
                <div className="flex flex-wrap gap-2">
                  {categories?.map((value) => {
                    return (
                      <div className="text-xs bg-primary text-white rounded py-[0.2rem] px-[0.5rem]">
                        {value.category_name}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-1 text-sm italic">
                  BPOM Id: {product?.BPOM_id}
                </div>
              </div>
            </div>
            <div>
              <div>
                <div className="border-b border-slate-300 w-fit mb-2">
                  Description:
                </div>
                <div>{product?.description}</div>
              </div>
            </div>
            <div>
              <div>
                <div className="border-b border-slate-300 w-fit mb-2">
                  Dosing:
                </div>
                <div>{product?.dosing}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
