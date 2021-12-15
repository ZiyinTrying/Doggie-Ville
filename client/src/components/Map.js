import React from "react";
import styled from "styled-components";
import {
  GoogleMap,
  LoadScript,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faHeart,
  faBed,
  faClinicMedical,
  faHamburger,
  faStore,
  faTree,
  faDog,
} from "@fortawesome/free-solid-svg-icons";

import mapStyles from "./mapStyles";
import { BusinessContext } from "./BusinessContext";
import { UserContext } from "./UserContext";
import FriendsContext from "./FriendsContext";
import { useHistory } from "react-router-dom";
import FavouriteButton from "./FavouriteButton";
import Icons from "./Icons";
import InfoWindows from "./InfoWindows";
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

const Map = ({
  hotelRef,
  resturantRef,
  petstoreRef,
  vetRef,
  parksRef,
  nationalParksRef,
}) => {
  // const history = useHistory();

  const { friends, setFriends, isFriendsShow, setIsFriendsShow } =
    React.useContext(FriendsContext);

  const {
    setBusinesses,
    businesses,
    setCurrentMarker,
    currentMarker,
    checkBar,
    setCheckBar,
  } = React.useContext(BusinessContext);

  const { currentUser, isSharedLocation, setIsSharedLocation } =
    React.useContext(UserContext);

  const [selected, setSelected] = React.useState(null);
  const [selectedFriend, setSelectedFriend] = React.useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  // use ref here is for avoiding reloading of the map, it relocate faster and store the current map into.current property
  const currentMapRef = React.useRef();
  // during the map is onloading, an argument will pass in by default which is the map that is loading, now we save it in currentMapRef under the property called current.
  const onMapLoad = (map) => {
    currentMapRef.current = map;
  };
  // pan to is the biuld in property of google map to center the area
  const panTo = (lat, lng) => {
    currentMapRef.current.panTo({ lat, lng });
    currentMapRef.current.setZoom(12);
    console.log(currentMapRef.current.getCenter().lat());
  };
  const handleSearchArea = () => {
    hotelRef.current.checked = false;
    resturantRef.current.checked = false;
    petstoreRef.current.checked = false;
    vetRef.current.checked = false;
    parksRef.current.checked = false;
    nationalParksRef.current.checked = false;
    let newLat = currentMapRef.current.getCenter().lat();
    let newLng = currentMapRef.current.getCenter().lng();
    setCurrentMarker({
      lat: newLat,
      lng: newLng,
    });
    // {
    //   lat: 45.446949,
    //   lng: -73.608688,
    // }
  };

  const handleCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // console.log(position.coords.latitude, position.coords.longitude);
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

  const avatar = {
    female:
      "https://res.cloudinary.com/dvmtjbjlp/image/upload/v1639164449/Doggie_Ville_Maps/doggirl_f8co4n.png",
    male: "https://res.cloudinary.com/dvmtjbjlp/image/upload/v1639164449/Doggie_Ville_Maps/dogboy_evquk8.png",
  };

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        options={options}
        center={center}
        onLoad={onMapLoad}
        onClick={() => {
          setSelected(null);
        }}
      >
        {currentMarker && (
          <Marker
            position={{ lat: currentMarker.lat, lng: currentMarker.lng }}
            icon={
              isSharedLocation && {
                path: faMapMarkerAlt.icon[4],

                fillColor: "#95d5b2",
                fillOpacity: 1,
                anchor: new window.google.maps.Point(
                  faMapMarkerAlt.icon[0] / 2, // width
                  faMapMarkerAlt.icon[1] // height
                ),
                strokeWeight: 1.5,
                strokeColor: "#1b4332",
                scale: 0.07,
              }
            }
          />
        )}

        {friends &&
          friends.map((friend) => {
            return (
              <>
                {friend.latitude && friend.longtitude && isFriendsShow && (
                  <Marker
                    onClick={() => {
                      setSelectedFriend(friend);
                    }}
                    key={friend._id}
                    position={{
                      lat: Number(friend.latitude),
                      lng: Number(friend.longtitude),
                    }}
                    icon={
                      friend.dogGender === "male"
                        ? {
                            path: faDog.icon[4],

                            fillColor: "#a8dadc",
                            fillOpacity: 1,
                            anchor: new window.google.maps.Point(
                              faDog.icon[0] / 2, // width
                              faDog.icon[1] // height
                            ),
                            strokeWeight: 1.5,
                            strokeColor: "#457b9d",
                            scale: 0.07,
                          }
                        : {
                            path: faDog.icon[4],

                            fillColor: "#f5cac3",
                            fillOpacity: 1,
                            anchor: new window.google.maps.Point(
                              faDog.icon[0] / 2, // width
                              faDog.icon[1] // height
                            ),
                            strokeWeight: 1.5,
                            strokeColor: "#f28482",
                            scale: 0.07,
                          }
                    }
                  />
                )}
              </>
            );
          })}

        {businesses &&
          businesses.map((business) => {
            return (
              <>
                <Marker
                  onClick={() => {
                    setSelected(business);
                  }}
                  // onMouseOut={() => {
                  //   setSelected(null);
                  // }}
                  position={{
                    lat: business.coordinates.latitude,
                    lng: business.coordinates.longitude,
                  }}
                  icon={Icons(business)}
                />
              </>
            );
          })}
        {/* ===================================================
                   INFO WINDOW
======================================================= */}
        {selected ? (
          <InfoWindows
            selected={selected}
            setSelected={setSelected}
            currentUser={currentUser}
          />
        ) : null}
        {/* ===========================Friends INFO WINDOW==================================================== */}
        {selectedFriend && (
          <InfoWindow
            // maxWidth="100"
            options={{ maxWidth: 250, maxHeight: 200 }}
            position={{
              lat: Number(selectedFriend.latitude),
              lng: Number(selectedFriend.longtitude),
            }}
            onCloseClick={() => {
              setSelectedFriend(null);
            }}
          >
            {
              <FriendInfo>
                <img src={avatar[selectedFriend.dogGender]} />
                <div>
                  <h1>{selectedFriend.dogName}</h1>
                  <h2>{selectedFriend.dogWeight} pounds</h2>
                  <h3>
                    a {selectedFriend.dogAge}
                    <span> {selectedFriend.dogBreed}</span>
                  </h3>
                  <p>
                    whose parent is <span>{selectedFriend.ownerName}</span>
                  </p>
                </div>
              </FriendInfo>
            }
          </InfoWindow>
        )}
      </GoogleMap>
      <LocateButton onClick={handleCurrentLocation}></LocateButton>
      <SearchAreabutton onClick={handleSearchArea}>
        Search this area
      </SearchAreabutton>
    </div>
  );
};
const LocateButton = styled.button`
  position: absolute;
  top: 7rem;
  left: 1rem;
  width: 4rem;
  height: 4rem;
  border: none;
  border-radius: 50%;
  background-image: url("https://res.cloudinary.com/dvmtjbjlp/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1638891672/Doggie_Ville_Maps/23831362_vldmxn.jpg");
  background-size: contain;
  transition: box-shadow 300ms ease;

  background-repeat: no-repeat;
  &:hover {
    cursor: pointer;

    box-shadow: 0px 5px 15px 9px #d4d4d4;
  }
`;
const SearchAreabutton = styled.button`
  position: absolute;
  z-index: 100;
  top: 120px;
  left: 25%;
  width: 200px;
  height: 40px;
  color: rgb(35, 61, 77);
  font-weight: 600;
  transition: background 300ms ease;
  border-radius: 20px;
  background: rgb(232, 232, 232, 50%);
  border: 1px solid rgb(97, 155, 138);
  &:hover {
    cursor: pointer;
    background: rgb(97, 155, 138, 50%);
    color: white;
  }
`;
const ShowFavoriteButton = styled.button`
  position: absolute;
  top: 9rem;
  left: 62%;
  transition: transform 300ms ease;
  background: none;
  border: none;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

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
const FriendInfo = styled.div`
  display: flex;
  justify-content: center;
  color: rgb(35, 61, 77);
  h1 {
    font-size: 18px;
  }
  h2 {
    font-style: italic;
    font-weight: normal;
    color: grey;
  }
  h3 {
    font-weight: normal;
    span {
      color: rgb(97, 155, 138);
    }
  }
  p {
    margin-top: 3px;

    font-weight: 400;
    span {
      color: rgb(254, 127, 45);
      font-weight: 700;
    }
  }
  img {
    width: 80px;
    margin-right: 15px;
  }
`;
export default Map;
