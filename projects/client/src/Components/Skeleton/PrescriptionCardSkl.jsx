import React from 'react';
import ContentLoader from 'react-content-loader';
export default function PrescriptionCardSkl(props) {
  let cardSkl = [];

  for (let i = 0; i < props.limit; i++) {
    cardSkl.push(
      <div
        key={i}
        className="rounded-xl shadow-xl bg-white flex flex-col w-full max-w-[896px] h-[152px]"
      >
        <div className={`rounded-t-lg flex justify-between p-2 text-white`}>
          <ContentLoader width="100%" height="100%">
            <rect x="0" y="0" rx="8" ry="8" width="100%" height="40px" />
            <rect x="0" y="56" rx="8" ry="8" width="80px" height="80px" />
            <rect x="96" y="56" rx="8" ry="8" width="80px" height="24px" />
            <rect x="75%" y="80" rx="8" ry="8" width="25%" height="48px" />
          </ContentLoader>
        </div>
      </div>,
    );
  }

  return <>{cardSkl}</>;
}
