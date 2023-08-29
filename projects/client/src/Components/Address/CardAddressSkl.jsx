import ContentLoader from 'react-content-loader';

export default function CardAddressSkl(props) {
  const { index } = props;

  return (
    <div className="p-4 h-fit flex flex-col lg:flex-row gap-2 justify-between border border-primary rounded-lg">
      <div className="flex flex-col gap-1">
        <div className="font-bold text-[18px] line-clamp-1">
          <ContentLoader
            width="100%" // Set the width to 100% for responsiveness
            height={24} // Set the initial height of the skeleton
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="4" ry="4" width="150" height="27" />
          </ContentLoader>
        </div>
        <div>
          <ContentLoader
            width="100%" // Set the width to 100% for responsiveness
            height={22} // Set the initial height of the skeleton
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="4" ry="4" width="150" height="22" />
          </ContentLoader>
        </div>
        <div className="line-clamp-1">
          <ContentLoader
            width="100%" // Set the width to 100% for responsiveness
            height={22} // Set the initial height of the skeleton
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="4" ry="4" width="150" height="22" />
          </ContentLoader>
        </div>
        <div className="line-clamp-1">
          <ContentLoader
            width="100%" // Set the width to 100% for responsiveness
            height={22} // Set the initial height of the skeleton
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="4" ry="4" width="150" height="22" />
          </ContentLoader>
        </div>
        <div className="flex gap-2 flex-col sm:flex-row">
          <ContentLoader
            width={80} // Set the width to 100% for responsiveness
            height={22} // Set the initial height of the skeleton
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="4" ry="4" width="150" height="22" />
          </ContentLoader>
          <ContentLoader
            className={index === 1 ? 'hidden' : ''}
            width={80} // Set the width to 100% for responsiveness
            height={22} // Set the initial height of the skeleton
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="4" ry="4" width="150" height="22" />
          </ContentLoader>
          <ContentLoader
            className={index === 1 ? 'hidden' : ''}
            width={80} // Set the width to 100% for responsiveness
            height={22} // Set the initial height of the skeleton
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="4" ry="4" width="150" height="22" />
          </ContentLoader>
        </div>
      </div>
      <div
        className={`flex items-center justify-center w-full lg:w-fit ${
          index === 1 ? 'hidden' : ''
        }`}
      >
        <div className="w-full lg:w-[85px]">
          <ContentLoader
            width="100%" // Set the width to 100% for responsiveness
            height={48} // Set the initial height of the skeleton
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="4" ry="4" width="100%" height="48" />
          </ContentLoader>
        </div>
      </div>
    </div>
  );
}
