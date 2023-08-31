import ContentLoader from 'react-content-loader';

export default function CartSummarySkl() {
  return (
    <div className="p-4 h-[128px] md:h-[317px] flex flex-col">
      <div className="w-full h-full hidden md:block">
        <ContentLoader width="100%" height="100%">
          <rect x="0" y="0" rx="8" ry="8" width="100%" height="48" />
          <rect x="0" y="60" rx="8" ry="8" width="160" height="28" />
          <rect x="0" y="90" rx="8" ry="8" width="100" height="18" />
          <rect x="0" y="110" rx="8" ry="8" width="100" height="18" />
          <rect x="80%" y="90" rx="8" ry="8" width="20%" height="18" />
          <rect x="0" y="130" rx="8" ry="8" width="100" height="18" />
          <rect x="80%" y="130" rx="8" ry="8" width="20%" height="18" />
          <rect x="0" y="150" rx="8" ry="8" width="100" height="18" />
          <rect x="80%" y="150" rx="8" ry="8" width="20%" height="18" />
          <rect x="0" y="182" rx="8" ry="8" width="140" height="18" />
          <rect x="70%" y="182" rx="8" ry="8" width="30%" height="18" />
          <rect x="0" y="236" rx="8" ry="8" width="100%" height="48" />
        </ContentLoader>
      </div>
      <div className="w-full h-full md:hidden">
        <ContentLoader width="100%" height="100%">
          <rect x="0" y="0" rx="8" ry="8" width="100%" height="40" />
          <rect x="0" y="48" rx="8" ry="8" width="130" height="18" />
          <rect x="0" y="68" rx="8" ry="8" width="130" height="18" />
          <rect x="70%" y="54" rx="8" ry="8" width="30%" height="32" />
        </ContentLoader>
      </div>
    </div>
  );
}
