import React from "react";
import styled from "styled-components";
import { UserContext } from "./UserContext";
import { useHistory } from "react-router-dom";
import FavouriteButton from "./FavouriteButton";

const FavList = () => {
  const history = useHistory();

  const { currentUser, sideBar, setSideBar } = React.useContext(UserContext);
  //   console.log(currentUser.favourites);
  return (
    currentUser && (
      <Wrapper className={sideBar ? "nav-menu active" : "nav-menu"}>
        <Container>
          {currentUser.favourites && (
            <div>
              {currentUser.favourites.map((favorite) => {
                return (
                  <>
                    {/* national park info rendering */}
                    {favorite.category === "nationalParks" ? (
                      <NationalParkDiv>
                        <BusinessName
                          onClick={() => {
                            //   console.log(favorite._id);
                            history.push(`/nationalPark/${favorite._id}`);
                          }}
                        >
                          {favorite.parkName}
                          <p>{favorite.category} </p>
                          {currentUser && (
                            <LikeButton>
                              <FavouriteButton
                                businessID={favorite._id}
                                business={favorite}
                              />
                            </LikeButton>
                          )}
                        </BusinessName>
                        <WindowImg src={favorite.imgSrc} />
                        <p> Picnic Area Available</p>
                        <p> Dog Friendly Trails Available</p>
                        {favorite.campsite ? (
                          <p> Dog Friendly Campsites Available</p>
                        ) : (
                          <p> Dog Friendly Campsites Unavailable</p>
                        )}
                      </NationalParkDiv>
                    ) : (
                      // =======================INFO WINDOW FOR OTHER BUSINESSES=======================
                      <BusinessDiv>
                        <BusinessName
                          onClick={() => {
                            console.log(`/main/${favorite.id}`);
                            history.push(`/main/${favorite.id}`);
                          }}
                        >
                          {favorite.name}
                          <div>
                            <span>🌟{favorite.rating} stars</span>
                            <p>{favorite.category} </p>
                          </div>
                          {currentUser && (
                            <LikeButton>
                              <FavouriteButton
                                businessID={favorite.id}
                                business={favorite}
                              />
                            </LikeButton>
                          )}
                        </BusinessName>
                        <WindowImg src={favorite.image_url} />
                        <Info>
                          {" "}
                          {favorite.location.address1}
                          {favorite.price ? (
                            <span>price:{favorite.price}</span>
                          ) : (
                            <span>unknown Price</span>
                          )}
                        </Info>
                      </BusinessDiv>
                    )}
                  </>
                );
              })}
            </div>
          )}
        </Container>
      </Wrapper>
    )
  );
};
const Wrapper = styled.div`
  overflow-y: scroll;
  color: var(--color-dark-blue);
  padding-left: 20px;
  &.nav-menu {
    background-color: white;
    width: 30%;
    height: calc(100% - 80px);
    display: flex;
    justify-content: center;
    position: fixed;

    right: -100%;
    transition: 850ms;
  }

  &.nav-menu.active {
    right: 0;
    transition: 550ms;
  }
`;
const Container = styled.div`
  margin-top: 20px;
`;
const NationalParkDiv = styled.div`
  padding: 10px 5px;
  h2 {
    margin-bottom: 10px;
  }
`;
const BusinessDiv = styled.div`
  border-bottom: 2px solid rgb(161, 193, 129);
  padding: 10px 5px;
`;
const WindowImg = styled.img`
  width: 200px;
  max-height: 200px;
`;
const BusinessName = styled.h2`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  font-size: 18px;
  p {
    font-weight: 400;
    font-style: italic;
    color: grey;
  }
  div {
    display: flex;

    span {
      font-size: 15px;
    }
    p {
      margin-top: 6px;
      margin-left: 30px;
    }
  }
  &:hover {
    cursor: pointer;
    text-decoration: underline;
    font-style: italic;
  }
`;
const LikeButton = styled.span`
  position: absolute;
  right: 15px;
  margin-top: 19px;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  span {
    color: rgb(97, 155, 138);
    font-style: italic;
  }
`;

export default FavList;
