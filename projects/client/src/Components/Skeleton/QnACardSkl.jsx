import ContentLoader from 'react-content-loader';
export default function QnACardSkl(props) {
  let cardSkl = [];

  for (let i = 0; i < props.limit; i++) {
    cardSkl.push(
      <div key={`prodSKl${i}`} className="py-3 flex justify-center">
        <div className="card card-compact h-30 w-full bg-base-100 shadow-xl mx-2">
          <ContentLoader height={120} width={700}>
            <rect x="10" y="20" rx="8" ry="8" width="400" height="20" />
            <rect x="10" y="60" rx="8" ry="8" width="800" height="18" />
            <rect x="10" y="90" rx="8" ry="8" width="1000" height="20" />
          </ContentLoader>
        </div>
      </div>,
    );
  }

  return <>{cardSkl}</>;
}
