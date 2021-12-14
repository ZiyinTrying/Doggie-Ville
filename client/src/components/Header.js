import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useHistory } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/perspective.css";
import { faDog } from "@fortawesome/free-solid-svg-icons";

import GlobalStyles from "./GlobalStyles";
import map from "../asset/map2.png";
import { BusinessContext } from "./BusinessContext";
import { UserContext } from "./UserContext";
import FriendsContext from "./FriendsContext";

const Header = () => {
  const history = useHistory();
  const { currentUser, setCurrentUser, isShowSigninForm, setIsShowSigninForm } =
    React.useContext(UserContext);
  const { friends, setFriends, isFriendsShow, setIsFriendsShow } =
    React.useContext(FriendsContext);

  const { setBusinesses, businesses, setCurrentMarker, currentMarker } =
    React.useContext(BusinessContext);

  const handleSigninClick = () => {
    history.push(`/`);
    setIsShowSigninForm(true);
  };

  if (currentUser) {
    console.log(currentUser);
  }
  const handleLogout = (e) => {
    e.stopPropagation();
    // setCurrentUser(null);
    // setCurrentMarker(null);
    window.location.reload(false);
  };

  const avatar = {
    female:
      "https://res.cloudinary.com/dvmtjbjlp/image/upload/v1639164449/Doggie_Ville_Maps/doggirl_f8co4n.png",
    male: "https://res.cloudinary.com/dvmtjbjlp/image/upload/v1639164449/Doggie_Ville_Maps/dogboy_evquk8.png",
  };
  const tipContent = "🐾Go to the map ";

  let loginTippy = "";
  if (currentUser) {
    loginTippy = `Hello ${currentUser.ownerName},your ${currentUser.dogName} is logged in`;
  }

  return (
    // console.log(currentUser)
    <Wrapper>
      <Logo to="/">
        Doggie Ville
        <Icon>
          <FontAwesomeIcon icon={faDog} />
        </Icon>
      </Logo>
      <Div>
        <StyleTippy
          animation="perspective"
          content={
            <>
              <p>{tipContent}</p>
            </>
          }
        >
          <MapIcon
            src={map}
            onClick={() => {
              history.push(`/main`);
            }}
          />
        </StyleTippy>
        {currentUser ? (
          <Profile
            onClick={() => {
              history.push(`/profile/${currentUser._id}`);
            }}
          >
            {" "}
            <StyleTippy
              placement="left"
              interactive={true}
              animation="perspective"
              content={
                <>
                  <p>{loginTippy}</p>
                  <button onClick={handleLogout}>log out</button>
                </>
              }
            >
              <Avatar src={avatar[currentUser.dogGender]} />
            </StyleTippy>
          </Profile>
        ) : (
          <SignIn onClick={handleSigninClick}>Sign In</SignIn>
        )}
      </Div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  padding: 10px 20px;
  overflow-x: hidden;
  background-color: var(--color-yellow);
  z-index: 10000;
`;
const Logo = styled(Link)`
  color: white;
  display: flex;
  font-size: 30px;
  text-align: center;
  text-decoration: none;
`;
const Div = styled.div`
  display: flex;
  align-items: center;
`;
const StyleTippy = styled(Tippy)`
  color: black;
  background-color: white;
  display: flex;
  align-items: flex-start;

  height: 100px;
  button {
    color: white;
    background: rgb(97, 155, 138);
    border: none;
    border-radius: 5px;
    padding: 5px 5px;
    &:hover {
      background-color: rgb(254, 127, 45);
    }
  }
`;
const Icon = styled.div`
  margin-left: 10px;
  border-radius: 50%;
  /* border: 2px solid white;
  padding: 2px; */
`;
const MapIcon = styled.img`
  width: 35px;
  height: 35px;
  object-fit: fill;
  margin-right: 40px;
`;
const Profile = styled.div`
  z-index: 1000;
  &:hover {
    cursor: pointer;
  }
`;
const Avatar = styled.img`
  width: 50px;
  padding: 5px;
  background-color: white;
  border-radius: 10px;
`;
const SignIn = styled.button`
  color: white;
  font-size: 25px;
  text-align: center;
  text-decoration: none;
  font-family: var(--heading-font-family);
  border: none;
  background: none;
  &:hover {
    cursor: pointer;
  }
`;
export default Header;
