import React from 'react';
import ContentLoader from 'react-content-loader';
export default function CartCardSkl(props) {
  let cardSkl = [];

  for (let i = 0; i < props.limit; i++) {
    cardSkl.push(
      <div
        key={`cartSKl${i}`}
        className="flex justify-center border-t border-[#D5D7DD]"
      >
        <div className="card card-compact w-full bg-base-100 px-2">
          <ContentLoader height={130}>
            <rect x="4%" y="10" rx="8" ry="8" width="9%" height="60%" />
            <rect x="15%" y="10" rx="8" ry="8" width="44%" height="10%" />
            <rect x="15%" y="30" rx="8" ry="8" width="11%" height="10%" />
            <rect x="15%" y="50" rx="8" ry="8" width="33%" height="10%" />
            <rect x="15%" y="70" rx="8" ry="8" width="33%" height="10%" />
            <rect x="80%" y="10" rx="8" ry="8" width="17%" height="20" />
            <rect x="73%" y="90" rx="8" ry="8" width="24%" height="25" />
          </ContentLoader>
        </div>
      </div>,
    );
  }

  return <>{cardSkl}</>;
}
