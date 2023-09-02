import React from 'react';
import ContentLoader from 'react-content-loader';
export default function ProductCardAdminSkl(props) {
  let cardSkl = [];

  for (let i = 0; i < props.limit; i++) {
    cardSkl.push(
      <div
        key={`cartSKl${i}`}
        className="flex justify-center border-t border-[#D5D7DD]"
      >
        <div className="card card-compact w-full max-w-4xl bg-base-100 px-2">
          <ContentLoader height={100}>
            <rect x="2%" y="15" rx="8" ry="8" width="9%" height="60%" />
            <rect x="15%" y="15" rx="8" ry="8" width="30%" height="20%" />
            <rect x="15%" y="45" rx="8" ry="8" width="15%" height="20%" />
            <rect x="80%" y="30" rx="8" ry="8" width="80" height="50" />
						<rect x="90%" y="30" rx="8" ry="8" width="80" height="50" />
          </ContentLoader>
        </div>
      </div>,
    );
  }

  return <>{cardSkl}</>;
}
