import React, { createContext, useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import background from "../asset/dogfriend.jpeg";
import { faDog, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { BusinessContext } from "./BusinessContext";
import { UserContext } from "./UserContext";
import FriendsContext from "./FriendsContext";

const FriendsContainer = () => {
  const { friends, setFriends, isFriendsShow, setIsFriendsShow } =
    React.useContext(FriendsContext);
  const { setBusinesses, businesses, setCurrentMarker, currentMarker } =
    React.useContext(BusinessContext);
  const {
    currentUser,
    isShowSigninForm,
    setIsShowSigninForm,
    isSharedLocation,
    setIsSharedLocation,
  } = React.useContext(UserContext);

  const handleShowFriends = () => {
    fetch("/users")
      .then((res) => res.json())
      .then((data) => {
        const otherDogs = data.users.filter((user) => {
          return user._id !== currentUser._id;
        });
        setFriends(otherDogs);
      })
      .catch((err) => {
        console.log("error");
      });
    setIsFriendsShow(!isFriendsShow);
  };

  const handleShareLocation = () => {
    let currentLat = currentMarker.lat;
    let currentLng = currentMarker.lng;

    fetch(`/users/${currentUser._id}`, {
      method: "PUT",
      body: JSON.stringify({
        ...currentUser,
        latitude: currentLat,
        longtitude: currentLng,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        const { status, message } = json;
        if (status === 201) {
          window.alert("success");
          setIsSharedLocation(true);
        } else if (message) {
          console.log(message);
        }
      });
  };
  return (
    <DogFriendsContainer style={{ backgroundImage: `url(${background})` }}>
      {currentUser && (
        <>
          <button onClick={handleShareLocation}>
            <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" />
            <p>Share your location</p>
          </button>

          <button onClick={handleShowFriends}>
            {" "}
            <FontAwesomeIcon icon={faDog} size="lg" />
            {isFriendsShow ? (
              <p>hide other doggies</p>
            ) : (
              <p>Show other doggies?</p>
            )}
          </button>
        </>
      )}
    </DogFriendsContainer>
  );
};

const DogFriendsContainer = styled.div`
  width: 30vw;
  background-size: cover;
  background-position: center bottom;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    margin: 15px;
    width: 90%;
    height: 40px;
    letter-spacing: 2.5px;
    font-weight: 500;
    color: white;
    background-color: rgb(97, 155, 138, 80%);
    border: none;
    border-radius: 45px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;
    p {
      margin-left: 10px;
    }
    :nth-child(1) {
      margin-top: -300px;
      background: rgb(161, 193, 129);
    }
    &:hover {
      background-color: rgb(252, 202, 70);
      box-shadow: 0px 15px 20px rgb(252, 202, 70, 0.4);
      color: #fff;
      transform: translateY(-4px);
    }
  }
`;

export default FriendsContainer;
