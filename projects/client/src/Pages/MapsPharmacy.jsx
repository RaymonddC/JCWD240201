import 'maplibre-gl/dist/maplibre-gl.css';
import StoreLocation from '../Components/Landing/StoreLocation';

export default function MapsPharmacy() {
  return (
    <div className="w-full flex justify-center p-5">
      <div className="w-[70%]">
        <StoreLocation />
      </div>
    </div>
  );
}
