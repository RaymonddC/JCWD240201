import React from 'react';
import ContentLoader from 'react-content-loader';
export default function ChartSkeleton(props) {
  let cardSkl = [];

  for (let i = 0; i < props.limit; i++) {
    cardSkl.push(
      <div
        key={i}
        className="w-full rounded-lg shadow-xl p-4 bg-white h-[416px]"
      >
        <ContentLoader width="100%" height="100%">
          <rect x="0" y="0" rx="8" ry="8" width="30%" height="24px" />
          <rect x="0" y="40" rx="8" ry="8" width="100%" height="350px" />
        </ContentLoader>
      </div>,
    );
  }

  return <>{cardSkl}</>;
}
