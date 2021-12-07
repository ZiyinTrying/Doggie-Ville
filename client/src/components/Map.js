import React from "react";
import styled from "styled-components";
import {
  GoogleMap,
  LoadScript,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import mapStyles from "./mapStyles";
import { BusinessContext } from "./BusinessContext";

require("dotenv").config();
const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;

const center = {
  lat: 45.446949,
  lng: -73.608688,
};
const mapContainerStyle = {
  width: "70vw",
  height: "80vh",
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = () => {
  const { setBissinesses, businesses, setCurrentMarker, currentMarker } =
    React.useContext(BusinessContext);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  // use ref here is for avoiding reloading of the map, it relocate faster and store the current map into.current property
  const currentMapRef = React.useRef();

  // const [currentMarker, setCurrentMarker] = React.useState(null);

  const onMapLoad = (map) => {
    currentMapRef.current = map;
    console.log(map);
  };

  const panTo = (lat, lng) => {
    currentMapRef.current.panTo({ lat, lng });
    currentMapRef.current.setZoom(12);
  };
  const handleCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords.latitude, position.coords.longitude);
        panTo(position.coords.latitude, position.coords.longitude);
        setCurrentMarker({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => null
    );
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        options={options}
        center={center}
        onLoad={onMapLoad}
        onClick={(event) => {
          console.log(event);
        }}
      >
        {currentMarker && (
          <Marker
            position={{ lat: currentMarker.lat, lng: currentMarker.lng }}
          />
        )}
      </GoogleMap>
      <LocateButton onClick={handleCurrentLocation}>
        Get my location
      </LocateButton>
    </div>
  );
};
const LocateButton = styled.button``;
export default Map;
