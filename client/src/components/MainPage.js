import React, { createContext, useState, useEffect } from "react";
import styled from "styled-components";

import background from "../asset/dogfriend.jpeg";
import Map from "./Map";
import { BusinessContext } from "./BusinessContext";

const MainPage = () => {
  const { setBissinesses, businesses, setCurrentMarker, currentMarker } =
    React.useContext(BusinessContext);

  useEffect(() => {
    fetch("/items")
      .then((res) => res.json())
      .then((data) => {
        // setItems(data.data);
      })
      .catch((err) => {
        console.log("error");
      });
  }, []);

  return (
    <Wrapper>
      <MapFeatures>
        <CategoryBar>
          <Label>
            Hotel
            <CheckBoxInput type="checkbox" />
          </Label>
          <Label>
            Resturant
            <CheckBoxInput type="checkbox" />
          </Label>
          <Label>
            Pet Store
            <CheckBoxInput type="checkbox" />
          </Label>
          <Label>
            Clinic
            <CheckBoxInput type="checkbox" />
          </Label>
          <Label>
            Parks
            <CheckBoxInput type="checkbox" />
          </Label>
          <Label>
            National Parks
            <CheckBoxInput type="checkbox" />
          </Label>
        </CategoryBar>
        <Map />
      </MapFeatures>
      <DogFriendsContainer
        style={{ backgroundImage: `url(${background})` }}
      ></DogFriendsContainer>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin-top: 50px;
  display: flex;
`;
const MapFeatures = styled.div``;
const CategoryBar = styled.div`
  height: 60px;
`;

const Label = styled.label``;

const CheckBoxInput = styled.input``;

const DogFriendsContainer = styled.div`
  border: 2px solid red;
  width: 30vw;
  background-size: contain;
  background-position: center bottom;
`;

export default MainPage;
