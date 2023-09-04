import React from 'react';
import ContentLoader from 'react-content-loader';
export default function AnalyzeCardSkl(props) {
  let cardSkl = [];

  for (let i = 0; i < props.limit; i++) {
    cardSkl.push(
      <div
        key={i}
        className="card card-compact w-[32%] bg-base-100 shadow-xl h-[84px]"
      >
        <div className="card-body flex flex-row justify-between">
          <div className="div">
            <ContentLoader width="100%" height="100%">
              <rect x="0" y="0" rx="8" ry="8" width="80%" height="24px" />
              <rect x="0" y="28" rx="8" ry="8" width="80%" height="24px" />
            </ContentLoader>
          </div>
        </div>
      </div>,
    );
  }

  return <>{cardSkl}</>;
}
