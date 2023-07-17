
export default function ProductCard() {
  return (
    <>
      <div className="card card-compact w-60 bg-base-100 shadow-xl">
        <figure>
          <img className='h-40'
            src="https://res-3.cloudinary.com/dk0z4ums3/image/upload/c_scale,h_750,w_750/v1/production/pharmacy/products/1643869601_tolak_angin_sidomuncul_12_sachet_15_ml"
            alt="tolak angin"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Tolak Angin Plus Madu Sido Muncul 15 Ml</h2>
          <p>Rp. 15.000</p>
          <div className="card-actions justify-end">
            <button className="btn btn-sm btn-accent">add to cart</button>
          </div>
        </div>
      </div>
    </>
  );
}
 