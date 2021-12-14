import React, { createContext, useState, useEffect } from "react";

export const FriendsContext = createContext(null);

export const FriendsProvider = ({ children }) => {
  //variable to store data from fetch "/items"
  const [friends, setFriends] = useState([]);
  const [isFriendsShow, setIsFriendsShow] = useState(false);

  return (
    <FriendsContext.Provider
      value={{
        friends,
        setFriends,
        isFriendsShow,
        setIsFriendsShow,
      }}
    >
      {children}
    </FriendsContext.Provider>
  );
};

export default FriendsContext;
