import { useEffect, useState } from 'react';
import { getProductDetailsAPI } from '../../API/productAPI';

export default function DetailProductAdmin(props) {
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
      setImage(result?.data?.image?.image);
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
        <div className="modal-box">
          <div className="flex flex-col gap-3">
            <div className="flex justify-evenly gap-3">
              <img
                className="w-6/12"
                src={`http://localhost:8000/${image}`}
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
                      <div className="text-xs bg-primary text-white rounded p-[0.1rem] px-[0.1rem]">
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
          <div className="modal-action">
            <label htmlFor="detail_product" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
