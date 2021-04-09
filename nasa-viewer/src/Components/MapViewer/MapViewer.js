import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import ChangeView from './ChangeView';
import './MapViewer.scss';

const MapViewer = ({ latitude, longitude }) => {
  const DEFAULT_ZOOM = 13;
  return (
    <div className="mapContainer">
      <MapContainer
        center={[latitude, longitude]}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom={false}
      >
        <ChangeView
          latitude={latitude}
          longitude={longitude}
          zoom={DEFAULT_ZOOM}
        />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}></Marker>
      </MapContainer>
    </div>
  );
};

export default MapViewer;
