import { useState, useEffect } from 'react';
import ReactMapGl, { Marker } from 'react-map-gl';
import { LocationMarkerIcon } from '@heroicons/react/solid';
import 'mapbox-gl/dist/mapbox-gl.css';
import Geocode from 'react-geocode';

export default function EventMapLocation({ event }) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(true);

  const [viewport, setViewport] = useState({
    latitude: 48.8566,
    longitude: 2.3522,
    width: '100%',
    height: '100%',
    zoom: 12,
  });

  useEffect(() => {
    Geocode.fromAddress(event.address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLatitude(lat);
        setLongitude(lng);
        setViewport({ ...viewport, latitude: lat, longitude: lng });
        setLoading(false);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_API_KEY);

  if (loading) return false;

  return (
    <ReactMapGl
      {...viewport}
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      onViewportChange={(vp) => setViewport(vp)}
    >
      <Marker key={event.id} latitude={latitude} longitude={longitude}>
        <LocationMarkerIcon
          className='h-5 w-5 text-purple-700'
          aria-hidden='true'
        />
      </Marker>
    </ReactMapGl>
  );
}
