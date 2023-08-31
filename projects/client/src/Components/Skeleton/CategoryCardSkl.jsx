import React from 'react';
import ContentLoader from 'react-content-loader';
export default function CategoryCardSkl(props) {
  let cardSkl = [];

  for (let i = 0; i < props.limit; i++) {
    cardSkl.push(
      <div className="w-full h-full bg-white p-4 rounded-lg shadow-lg flex justify-between items-center">
        <ContentLoader height={56} width="100%">
          <rect x="0" y="0" rx="8" ry="8" width="40%" height="24" />
          <rect x="90%" y="0" rx="8" ry="8" width="10%" height="24" />
        </ContentLoader>
      </div>,
    );
  }

  return <>{cardSkl}</>;
}
