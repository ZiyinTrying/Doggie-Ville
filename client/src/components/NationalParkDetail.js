import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router";
// import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhoneAlt,
  faGlobeAmericas,
  faHiking,
  faDog,
  faCampground,
} from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import background from "../asset/dogcamp.jpeg";

const NationalParkDetail = () => {
  const { _id } = useParams();
  console.log(_id);
  const [nationalParkDetail, setNationalParkDetail] = useState(null);
  useEffect(() => {
    fetch(`/facilities/nationalParks/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNationalParkDetail(data.nationalPark);
      })
      .catch((err) => {
        console.log("error");
      });
  }, []);
  const tipContent = "click me for more information";
  return (
    <>
      {nationalParkDetail && (
        <Wrapper>
          <MainImg src={nationalParkDetail.imgSrc} />

          <Name>{nationalParkDetail.parkName}</Name>
          <Trails>
            <Icon>
              <FontAwesomeIcon icon={faHiking} size="2x" />
              <FontAwesomeIcon icon={faDog} size="lg" />
            </Icon>{" "}
            <div>Summer Trails for dogs:</div>
            {nationalParkDetail.summerTrail.trails.map((trail) => {
              return <div>{trail}</div>;
            })}
            <Tippy content={tipContent}>
              <Globe href={nationalParkDetail.moreInfoUrl}>
                <FontAwesomeIcon icon={faGlobeAmericas} size="2x" />
              </Globe>
            </Tippy>
          </Trails>
          <TrialImg src={nationalParkDetail.summerTrail.mapSrc} />
          <Trails>
            <Icon>
              <FontAwesomeIcon icon={faHiking} size="2x" />
              <FontAwesomeIcon icon={faDog} size="lg" />
            </Icon>{" "}
            <div>Winter Trails for dogs:</div>
            {nationalParkDetail.winterTrail.trails.map((trail) => {
              return <div>{trail}</div>;
            })}
            <Tippy content={tipContent}>
              <Globe href={nationalParkDetail.moreInfoUrl}>
                <FontAwesomeIcon icon={faGlobeAmericas} size="2x" />
              </Globe>
            </Tippy>
          </Trails>
          <TrialImg src={nationalParkDetail.winterTrail.mapSrc} />
          {nationalParkDetail.campsite && (
            <>
              <CampSite style={{ backgroundImage: `url(${background})` }}>
                <CampInfo>
                  <CampAva>
                    <span>
                      <FontAwesomeIcon icon={faCampground} size="lg" />
                    </span>
                    Campsites are available for your dog!!
                  </CampAva>
                  <BookNow>
                    <Link href={nationalParkDetail.campsiteBookingUrl}>
                      Book Now!
                    </Link>
                  </BookNow>
                </CampInfo>
              </CampSite>
            </>
          )}
        </Wrapper>
      )}
    </>
  );
};
const Wrapper = styled.div`
  min-height: 100vh;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  background-size: cover;
  background-position: bottom;
  background-color: rgb(161, 193, 129, 70%);
  color: var(--color-dark-blue);
`;
const MainImg = styled.img`
  width: 100vw;
  height: 500px;
  object-fit: cover;
`;
const Trails = styled.div`
  margin-top: 0px;
  font-size: 20px;
  display: flex;
  flex-wrap: wrap;
  /* border: 2px solid; */
  padding: 30px;
  div {
    margin-left: 20px;
  }
`;
const TrialImg = styled.img``;

const CampInfo = styled.div`
  width: 100vw;
  height: 60px;
  background-color: rgb(161, 193, 129, 80%);
  display: flex;
`;
const CampSite = styled.div`
  width: 100vw;
  height: 500px;
  display: flex;
  justify-content: space-evenly;
  background-size: cover;
`;
const Name = styled.div`
  font-size: 30px;
  align-self: flex-start;
  color: black;
  margin-top: -80px;
  margin-bottom: 22px;
  margin-left: 5%;
  background-color: rgb(97, 155, 138, 90%);
  padding: 10px;
  border-radius: 10px;
`;
const Icon = styled.div`
  float: left;
  margin-top: -15px;
`;
const Globe = styled.a`
  float: right;
  margin-top: -10px;
  margin-left: 10px;
  color: rgb(35, 61, 77);
  transition: transform 500ms ease-in-out;
  &:hover {
    transform: rotate(0.5turn);
  }
`;
const Link = styled.a`
  margin-top: 30px;
`;
const CampAva = styled.div`
  font-size: 25px;
  padding: 10px;
  margin-top: 10px;
`;
const BookNow = styled.div`
  font-size: 30px;
  width: 200px;
  height: 60px;
  text-align: center;
  margin-top: 10px;

  padding: 10px;
  border-radius: 10px;
`;
const Star = styled.div`
  margin-left: 10px;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
`;
const OpenHour = styled.div`
  margin-right: 20%;
  margin-bottom: 30px;
`;

const Address = styled.div`
  /* font-size: 15px;
        margin-top: 20px;
        margin-left: 100px; */
`;
const ContactInfo = styled.div`
  font-size: 15px;
  margin-top: 20px;
  margin-left: 15%;
`;
const Phone = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
`;
const Status = styled.div`
  margin-top: -20px;
  margin-bottom: 10px;
  font-size: 20px;
`;
const Hours = styled.div`
  display: flex;
  justify-content: space-evenly;

  margin-top: 5px;
  p {
    margin-left: 10px;
  }
`;

export default NationalParkDetail;
