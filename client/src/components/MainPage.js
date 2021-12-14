import React, { createContext, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import Map from "./Map";
import { BusinessContext } from "./BusinessContext";
import { UserContext } from "./UserContext";

import FriendsContainer from "./FriendsContainer";
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

const MainPage = () => {
  // const [checkBar, setCheckBar] = React.useState({
  //   hotels: false,
  //   resturant: false,
  //   petstore: false,
  //   parks: false,
  //   vet: false,
  //   nationalParks: false,
  // });
  const {
    setBusinesses,
    businesses,
    setCurrentMarker,
    currentMarker,
    checkBar,
    setCheckBar,
    checkBarRefs,
    setCheckBarRefs,
  } = React.useContext(BusinessContext);
  const { currentUser } = React.useContext(UserContext);

  const hotelRef = useRef();
  const resturantRef = useRef();
  const petstoreRef = useRef();
  const vetRef = useRef();
  const parksRef = useRef();
  const nationalParksRef = useRef();
  const [isShowFav, setIsShowFav] = useState(false);

  const handleClickFav = () => {
    // change the checkbox to false, and empty the business list.
    hotelRef.current.checked = false;
    resturantRef.current.checked = false;
    petstoreRef.current.checked = false;
    vetRef.current.checked = false;
    parksRef.current.checked = false;
    nationalParksRef.current.checked = false;

    if (isShowFav === false) {
      setBusinesses(currentUser.favourites);
    } else {
      setBusinesses([]);
    }
    setIsShowFav(!isShowFav);
  };

  const handleCheckNationalPark = (e) => {
    // console.log({ [e.target.name]: e.target.checked });
    setCheckBar({ ...checkBar, [e.target.name]: e.target.checked });
    let categoryName = e.target.name;

    const uncheckCategory = (businesses) => {
      // console.log(businesses);
      //   console.log(businesses.categories[0].alias);
      let businessesAfterUncheck = businesses.filter((buisiness) => {
        return buisiness.category !== categoryName;
      });
      setBusinesses(businessesAfterUncheck);
    };

    if (e.target.checked) {
      fetch("/facilities/nationalParks")
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setBusinesses([...data.nationalParks, ...businesses]);
        })
        .catch((err) => {
          console.log("error");
        });
    } else {
      uncheckCategory(businesses);
    }
  };

  const handleCheck = (e) => {
    // console.log(e.target.checked);
    let categoryName = e.target.name;
    let currentLat = currentMarker.lat;
    let currentLng = currentMarker.lng;
    setCheckBar({ ...checkBar, [e.target.name]: e.target.checked });
    // console.log(hotelRef.current.checked);
    const uncheckCategory = (businesses) => {
      //   console.log(businesses.categories[0].alias);
      let businessesAfterUncheck = businesses.filter((buisiness) => {
        return buisiness.category !== categoryName;
      });
      setBusinesses(businessesAfterUncheck);
    };

    if (e.target.checked) {
      fetch(`/facilities/${categoryName}/${currentLat}/${currentLng}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.processedData);
          setBusinesses([...data.processedData, ...businesses]);
        })
        .catch((err) => {
          console.log("error");
        });
    } else {
      uncheckCategory(businesses);
    }
  };

  return (
    <Wrapper>
      <MapWrapper>
        <MapFeatures>
          <CategoryBar>
            <Label>
              <Span>Hotel</Span>
              <CheckBoxInput
                type="checkbox"
                name="hotels"
                onChange={handleCheck}
                ref={hotelRef}
                defaultChecked={checkBar["hotels"]}
              />
            </Label>
            <Label>
              <Span>Resturant</Span>
              <CheckBoxInput
                type="checkbox"
                name="resturant"
                onChange={handleCheck}
                ref={resturantRef}
                defaultChecked={checkBar["resturant"]}
              />
            </Label>
            <Label>
              <Span>Pet Store</Span>
              <CheckBoxInput
                type="checkbox"
                name="petstore"
                //   value="pet store"
                onChange={handleCheck}
                ref={petstoreRef}
                defaultChecked={checkBar["petstore"]}
              />
            </Label>
            <Label>
              <Span>Clinic</Span>
              <CheckBoxInput
                type="checkbox"
                name="vet"
                onChange={handleCheck}
                ref={vetRef}
                defaultChecked={checkBar["vet"]}
              />
            </Label>
            <Label>
              <Span>Parks</Span>
              <CheckBoxInput
                type="checkbox"
                name="parks"
                onChange={handleCheck}
                ref={parksRef}
                defaultChecked={checkBar["parks"]}
              />
            </Label>
            <Label>
              <Span>National Parks</Span>
              <CheckBoxInput
                type="checkbox"
                name="nationalParks"
                onChange={handleCheckNationalPark}
                ref={nationalParksRef}
                defaultChecked={checkBar["nationalParks"]}
              />
            </Label>
          </CategoryBar>
          {currentUser && (
            <ShowFavoriteButton
              className="fa-layers fa-fw"
              onClick={handleClickFav}
            >
              <FontAwesomeIcon icon={faHeart} color="#f28482" size="4x" />
              <FontAwesomeIcon
                icon={faDog}
                size="2x"
                style={
                  isShowFav
                    ? {
                        color: "pink",
                        marginLeft: "13px",
                        marginTop: "-12px",
                      }
                    : { color: "white", marginLeft: "13px", marginTop: "-12px" }
                }
              />
            </ShowFavoriteButton>
          )}
          {/* /* here is the map component */}
          <Map
            hotelRef={hotelRef}
            resturantRef={resturantRef}
            petstoreRef={petstoreRef}
            vetRef={vetRef}
            parksRef={parksRef}
            nationalParksRef={nationalParksRef}
          />
        </MapFeatures>
        <FriendsContainer />
      </MapWrapper>
      {/* <BusinessList /> */}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
`;
const MapWrapper = styled.div`
  display: flex;
`;
const MapFeatures = styled.div``;
const CategoryBar = styled.div`
  width: 70vw;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ShowFavoriteButton = styled.button`
  position: absolute;
  top: 9rem;
  left: 62%;
  transition: transform 300ms ease;
  background: none;
  border: none;
  z-index: 100;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const Label = styled.label`
  margin-left: 1rem;
  width: 15%;
  height: 3rem;
  padding: 5px;
  background-color: rgb(161, 193, 129, 80%);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;
const Span = styled.div`
  color: var(--color-dark-blue);
`;
const CheckBoxInput = styled.input``;

export default MainPage;
