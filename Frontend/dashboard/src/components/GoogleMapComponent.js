import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const GoogleMapComponent = () => {
  const mapStyles = {
    height: '200px',
    width: '100%',
  };

  const defaultCenter = {
    lat: 7.176210,
    lng: 79.946709,
  };

  const markerPosition = {
    lat: 7.176210,
    lng: 79.946709,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBbhY29sjeOOIZWwzxa7GfpnivMiHLXpno">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={15}
        center={defaultCenter}
      >
        <Marker position={markerPosition} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
