import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

import { UserContext } from "./UserContext";
import { BusinessContext } from "./BusinessContext";

const FavouriteButton = ({ businessID, business }) => {
  const { currentUser, setCurrentUser, isSharedLocation, setIsSharedLocation } =
    React.useContext(UserContext);

  //   camparing the favoritesid with the current selected business button, if including the business,the isLikeStatus is true so does the default value of isliked state.
  const favouritesId = currentUser.favouritesId;
  const favourites = currentUser.favourites;

  const isLikedStatus = favouritesId.indexOf(businessID) !== -1;

  const [isLiked, setIsLiked] = React.useState(isLikedStatus);

  const handleLike = (e) => {
    e.stopPropagation();
    // if we click the button that is already true, that means we are going to unlike it. alternatively, if the status is false, then we are liking the business.
    // like the business: 1.push this selected business id into the favourite array. 2. store the array to currentuser 3. toggle the heart to red 4. change the database bY PUT
    if (isLiked === false) {
      favouritesId.push(businessID);
      favourites.push(business);
      console.log("add id");
      console.log(favouritesId);
    } else {
      // when unliking the business, need to delete it from the favorite array. 1. find the index 2, splice it 3, toggle it to red 4. store it to current user 5, change the database
      let index = favouritesId.indexOf(businessID);

      favouritesId.splice(index, 1);
      favourites.splice(index, 1);

      console.log("delete id");
      console.log(favouritesId);
    }
    setCurrentUser({ ...currentUser, favouritesId, favourites });
    setIsLiked(!isLiked);

    fetch(`/userlike/${currentUser._id}`, {
      method: "PUT",
      body: JSON.stringify({
        favouritesId: favouritesId,
        favourites: favourites,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
  };
  return (
    <Button onClick={handleLike}>
      {isLiked ? (
        <FontAwesomeIcon icon={faHeart} color="#f28482" />
      ) : (
        <FontAwesomeIcon icon={faHeart} color="white" />
      )}
    </Button>
  );
};
const Button = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background-color: #f5cac3;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: font-size 300ms ease-in-out;
  &:hover {
    font-size: 20px;
    cursor: pointer;
  }
`;

export default FavouriteButton;
