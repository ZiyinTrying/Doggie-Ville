import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { InfoWindow } from "@react-google-maps/api";
import FavouriteButton from "./FavouriteButton";

const InfoWindows = ({ selected, setSelected, currentUser }) => {
  const history = useHistory();

  return (
    <InfoWindow
      options={{
        // pixelOffset: new window.google.maps.Size(0, -30),
        maxWidth: 200,
        maxHeight: 200,
      }}
      position={{
        lat: selected.coordinates.latitude,
        lng: selected.coordinates.longitude,
      }}
      onCloseClick={() => {
        setSelected(null);
      }}
    >
      {/* the info window content is different with nationalparks category */}
      {/* ==================INFOWINDOW FOR national PARKS=================== */}
      {selected.category === "nationalParks" ? (
        <div>
          <BusinessName
            onClick={() => {
              history.push(`/nationalPark/${selected._id}`);
            }}
          >
            {selected.parkName}
            {currentUser && (
              <span>
                <FavouriteButton
                  businessID={selected._id}
                  business={selected}
                />
              </span>
            )}
          </BusinessName>
          <WindowImg src={selected.imgSrc} />
          <p> Picnic Area Available</p>
          <p> Dog Friendly Trails Available</p>
          {selected.campsite ? (
            <p> Dog Friendly Campsites Available</p>
          ) : (
            <p> Dog Friendly Campsites Unavailable</p>
          )}
        </div>
      ) : (
        // =======================INFO WINDOW FOR OTHER BUSINESSES=======================
        <div>
          <BusinessName
            onClick={() => {
              history.push(`/main/${selected.id}`);
            }}
          >
            {selected.name}
            <span>🌟{selected.rating} stars</span>
            {currentUser && (
              <LikeButton>
                <FavouriteButton businessID={selected.id} business={selected} />
              </LikeButton>
            )}
          </BusinessName>
          <WindowImg src={selected.image_url} />
          <Info>
            {" "}
            {selected.location.address1}
            {selected.price ? (
              <span>price:{selected.price}</span>
            ) : (
              <span>unknown Price</span>
            )}
          </Info>
        </div>
      )}
    </InfoWindow>
  );
};

const WindowImg = styled.img`
  width: 200px;
  max-height: 200px;
`;
const Icon = styled.div`
  float: left;
  margin-right: 10px;
`;
const BusinessName = styled.h2`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
    font-style: italic;
  }
`;
const LikeButton = styled.span`
  position: absolute;
  top: 60px;
  left: 72%;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;
export default InfoWindows;
