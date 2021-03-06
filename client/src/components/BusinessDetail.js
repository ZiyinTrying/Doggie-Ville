import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import SimpleImageSlider from "react-simple-image-slider";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhoneAlt,
  faGlobeAmericas,
} from "@fortawesome/free-solid-svg-icons";

import { UserContext } from "./UserContext";
import detailbackground from "../asset/dogfood.jpeg";
import FavouriteButton from "./FavouriteButton";
import FavList from "./FavList";

const BusinessDetail = () => {
  const { currentUser } = React.useContext(UserContext);
  const { _id } = useParams();
  const [itemDetail, setItemDetail] = useState(null);
  useEffect(() => {
    fetch(`/business/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setItemDetail(data.data);
      })
      .catch((err) => {
        console.log("error");
      });
  }, []);

  let images = [];
  if (itemDetail) {
    images = [
      { url: itemDetail.photos[0] },
      { url: itemDetail.photos[1] },
      { url: itemDetail.photos[2] },
    ];
  }
  const mystyle = {
    borderRadius: "10px",
  };
  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return (
    <>
      <FavList />
      {itemDetail && (
        <Wrapper style={{ backgroundImage: `url(${detailbackground})` }}>
          <Container>
            {itemDetail.photos[0] && (
              <Slider className="root">
                <SimpleImageSlider
                  width={896}
                  height={400}
                  images={images}
                  showBullets={true}
                  showNavs={true}
                  style={mystyle}
                  className="img"
                  // z-index={3}
                />
              </Slider>
            )}
            <InfoDetail>
              <Title>
                <h1>
                  {itemDetail.name}
                  <Star>{" ⭐".repeat(Math.ceil(itemDetail.rating))}</Star>
                  {currentUser && (
                    <LikeButton>
                      <FavouriteButton businessID={_id} />
                    </LikeButton>
                  )}
                </h1>
                <Category>{itemDetail.categories[0].title}</Category>
              </Title>
              <Content>
                <ContactInfo>
                  <Address>
                    <Icon>
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                    </Icon>
                    {itemDetail.location.display_address.map((ele) => {
                      return <div>{ele}</div>;
                    })}
                  </Address>
                  {itemDetail.phone && (
                    <Phone>
                      <Icon>
                        <FontAwesomeIcon icon={faPhoneAlt} />
                      </Icon>
                      {itemDetail.phone}
                    </Phone>
                  )}
                  <Icon>
                    <FontAwesomeIcon icon={faGlobeAmericas} />
                  </Icon>
                  <Link href={itemDetail.url}>
                    Visit our website for more information
                  </Link>
                </ContactInfo>
                <OpenHour>
                  {itemDetail.is_closed ? (
                    <Status>
                      <span>⭕</span> Close Now
                    </Status>
                  ) : (
                    <Status>
                      <span>🟢</span>Open Now
                    </Status>
                  )}
                  {itemDetail.hours &&
                    itemDetail.hours[0].open.map((ele) => {
                      return (
                        <Hours>
                          <p>{weekDays[ele.day]}</p>
                          <p>
                            {ele.start.slice(0, 2)}:{ele.start.slice(2)}~
                            {ele.end.slice(0, 2)}:{ele.end.slice(2)}
                          </p>
                        </Hours>
                      );
                    })}
                </OpenHour>
              </Content>
            </InfoDetail>
          </Container>
        </Wrapper>
      )}
    </>
  );
};
const Wrapper = styled.div`
  min-height: 100vh;
  margin-top: 50px;
  display: flex;

  background-size: cover;
  background-position: bottom;
  color: var(--color-dark-blue);
`;
const Container = styled.div`
  width: 80%;
  background-color: rgb(255, 255, 255, 80%);
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
`;
const InfoDetail = styled.div`
  background-color: rgb(242, 218, 227, 80%);
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
  border-radius: 20px;
`;
const Slider = styled.div`
  margin: 0 auto;
`;
const Title = styled.div`
  font-size: 30px;
  align-self: flex-start;
  margin-top: 10px;
  margin-left: 15%;
  h1 {
    display: flex;
  }
`;
const LikeButton = styled.span`
  background-color: white;
  padding: 5px;
  height: 40px;
  margin-left: 30px;
  border-radius: 50%;
`;
const Icon = styled.div`
  float: left;
  margin-right: 10px;
`;
const Star = styled.div`
  margin-left: 10px;
`;
const Category = styled.h2`
  font-size: 20px;
  font-style: italic;
`;
const Content = styled.div`
  display: flex;
  justify-content: space-between;
`;
const OpenHour = styled.div`
  margin-right: 20%;
  margin-bottom: 30px;
`;

const Address = styled.div``;
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
const Link = styled.a`
  margin-top: 40px;
  text-decoration: none;
`;
export default BusinessDetail;
