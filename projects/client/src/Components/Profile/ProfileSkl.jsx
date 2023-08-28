import ContentLoader from 'react-content-loader';
export default function ProfileSkl() {
  return (
    <div className="text-[16px] h-[413px] shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-lg p-8">
      <div className="flex flex-col items-center w-full gap-2">
        <div>
          <ContentLoader
            width="100" // Set the width to 100% for responsiveness
            height={100} // Set the initial height of the skeleton
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <circle cx="50%" cy="50" r="50" />
          </ContentLoader>
        </div>
        <div className="w-full max-w-[150px] flex justify-center">
          <ContentLoader
            width="100%" // Set the width to 100% for responsiveness
            height={24} // Set the initial height of the skeleton
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="4" ry="4" width="150" height="24" />
          </ContentLoader>
        </div>
      </div>
      <div className="flex justify-between py-4 border-b-2 border-[#eeeeee]">
        <div className="w-full max-w-[150px]">
          <ContentLoader
            width="100%" // Set the width to 100% for responsiveness
            height={24} // Set the initial height of the skeleton
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="4" ry="4" width="150" height="24" />
          </ContentLoader>
        </div>
        <div className="w-full max-w-[150px]">
          <ContentLoader
            width="100%" // Set the width to 100% for responsiveness
            height={24} // Set the initial height of the skeleton
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="4" ry="4" width="150" height="24" />
          </ContentLoader>
        </div>
      </div>

      <div className="flex justify-between py-4 border-b-2 border-[#eeeeee]">
        <div className="w-full max-w-[150px]">
          <ContentLoader
            width="100%" // Set the width to 100% for responsiveness
            height={24} // Set the initial height of the skeleton
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="4" ry="4" width="150" height="24" />
          </ContentLoader>
        </div>
        <div className="w-full max-w-[150px]">
          <ContentLoader
            width="100%" // Set the width to 100% for responsiveness
            height={24} // Set the initial height of the skeleton
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="4" ry="4" width="150" height="24" />
          </ContentLoader>
        </div>
      </div>
      <div className="flex justify-between py-4 border-b-2 border-[#eeeeee]">
        <div className="w-full max-w-[150px]">
          <ContentLoader
            width="100%" // Set the width to 100% for responsiveness
            height={24} // Set the initial height of the skeleton
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="4" ry="4" width="150" height="24" />
          </ContentLoader>
        </div>
        <div className="w-full max-w-[150px]">
          <ContentLoader
            width="100%" // Set the width to 100% for responsiveness
            height={24} // Set the initial height of the skeleton
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="4" ry="4" width="150" height="24" />
          </ContentLoader>
        </div>
      </div>
      <div className="flex justify-between pt-4 border-[#eeeeee]">
        <div className="w-full max-w-[150px]">
          <ContentLoader
            width="100%" // Set the width to 100% for responsiveness
            height={24} // Set the initial height of the skeleton
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="4" ry="4" width="150" height="24" />
          </ContentLoader>
        </div>
        <div className="w-full max-w-[150px]">
          <ContentLoader
            width="100%" // Set the width to 100% for responsiveness
            height={24} // Set the initial height of the skeleton
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="4" ry="4" width="150" height="24" />
          </ContentLoader>
        </div>
      </div>
    </div>
  );
}
