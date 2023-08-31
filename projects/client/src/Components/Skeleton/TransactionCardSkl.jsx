import React from 'react';
import ContentLoader from 'react-content-loader';
export default function TransactionCardSkl(props) {
  let cardSkl = [];

  for (let i = 0; i < props.limit; i++) {
    cardSkl.push(
      <div
        key={`txCardSKl${i}`}
        className="flex justify-center border-t border-[#D5D7DD]"
      >
        <div className="card card-compact w-full bg-base-100 px-2">
          <ContentLoader height={220}>
            <rect x="2%" y="20" rx="8" ry="8" width="96%" height="20" />
            <rect x="2%" y="70" rx="8" ry="8" width="10%" height="80" />
            <rect x="14%" y="70" rx="8" ry="8" width="84%" height="20" />
            <rect x="14%" y="100" rx="8" ry="8" width="84%" height="20" />
            <rect x="14%" y="130" rx="8" ry="8" width="84%" height="20" />
            <rect x="2%" y="180" rx="8" ry="8" width="96%" height="20" />
          </ContentLoader>
        </div>
      </div>,
    );
  }

  return <>{cardSkl}</>;
}
