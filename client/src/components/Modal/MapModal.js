import React, { useState } from 'react';
import Modal from '.';
import Loader from '../Loader';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

function MapModal({ show, onClick, onClose, restaurant }) {
  const [viewport, setViewport] = useState({
    latitude: restaurant.geolocation && restaurant.geolocation[0],
    longitude: restaurant.geolocation && restaurant.geolocation[1],
    zoom: 14,
    bearing: 0,
    height: '500px',
    width: 'auto',
    pitch: 0,
  });

  return (
    <Modal show={show} onClick={onClick} onClose={onClose} title='Map'>
      {!restaurant ? (
        <Loader />
      ) : (
        <>
          <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_TOKEN}
            onViewportChange={nextViewport => setViewport(nextViewport)}
          >
            <Marker
              latitude={restaurant.geolocation && restaurant.geolocation[0]}
              longitude={restaurant.geolocation && restaurant.geolocation[1]}
            >
              <img
                src='/images/pin.svg'
                alt='pin'
                style={{ height: '30px', width: '30px' }}
              />
            </Marker>
          </ReactMapGL>

          <p>
            {restaurant.address &&
              `${restaurant.address.street}, ${restaurant.address.suburb}, ${restaurant.address.state} ${restaurant.address.postcode}`}
          </p>
        </>
      )}
    </Modal>
  );
}

export default MapModal;
