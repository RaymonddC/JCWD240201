import React from 'react';

const PromotionCard = (props) => {
  return (
    <div className="promo border rounded-md p-3">
      <p>Diskon 30% (Rp20.000)</p>
      <p>min. transaction</p>
      <p>max. discount</p>
      <p>Ends in 2h10m</p>
    </div>
  );
};

export default PromotionCard;
