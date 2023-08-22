import { useState } from 'react';
import Map, { NavigationControl, Marker, Popup } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import jumbotronImage from '../utils/images/pharmacy-store.jpg';

export default function MapsPharmacy() {
  const [showPopup, setShowPopup] = useState(true);
  return (
    <div>
      <Map
        mapLib={maplibregl}
        initialViewState={{
          longitude: 106.65222475480341,
          latitude: -6.302263455530211,
          zoom: 14,
        }}
        style={{ width: '100%', height: '800px' }}
        mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${process.env.REACT_APP_API_MAPTILER}`}
      >
        <NavigationControl position="top-right" />
        <Marker
          longitude={106.65222475480341}
          latitude={-6.302263455530211}
          offsetLeft={-20}
          offsetTop={-10}
          onClick={() => setShowPopup(true)}
          className="cursor-pointer"
        ></Marker>
        {showPopup ? (
          <Popup
            longitude={106.65222475480341}
            latitude={-6.302263455530211}
            closeButton={true}
            onClose={() => setShowPopup(!showPopup)}
            closeOnClick={false}
            anchor="top"
          >
            <div className="w-[200px] flex flex-col items-center gap-2">
              <h3 className="font-bold text-[20px]">Healthymed BSD</h3>
              <img className="w-full" src={jumbotronImage} alt="store" />
              <p className="text-[14px]">The best pharmacy in the world</p>
            </div>
          </Popup>
        ) : null}
      </Map>
    </div>
  );
}
