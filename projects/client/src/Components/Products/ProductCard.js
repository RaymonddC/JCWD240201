
export default function ProductCard() {
  return (
    <>
      <div className="card card-compact w-60 bg-base-100 shadow-xl">
        <figure>
          <img className='h-40'
            src="https://cld.accentuate.io/5353334407325/1663106249340/Madrid_Grey_Feature-Float-1380.png?v=1669224483961&options=w1000"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </>
  );
}
