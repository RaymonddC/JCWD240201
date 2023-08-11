import ContentLoader from 'react-content-loader';
export default function ProductListSkl(props) {
  let cardSkl = [];

  for (let i = 0; i < props.limit; i++) {
    cardSkl.push(
      <div key={`prodSKl${i}`} className="py-3 flex justify-center">
        <div className="card card-compact w-32 h-68 md:w-40 bg-base-100 shadow-xl mx-2">
          <ContentLoader height={250} width={250}>
            <rect x="10" y="10" rx="8" ry="8" width="140" height="140" />
            <rect x="10" y="170" rx="0" ry="0" width="140" height="18" />
            <rect x="10" y="195" rx="0" ry="0" width="140" height="20" />
          </ContentLoader>
        </div>
      </div>,
    );
  }

  return <>{cardSkl}</>;
}
