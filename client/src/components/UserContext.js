import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  //variable to store data from fetch "/items"
  const [currentUser, setCurrentUser] = React.useState(null);
  const [isShowSigninForm, setIsShowSigninForm] = React.useState(false);
  const [isSharedLocation, setIsSharedLocation] = React.useState(false);
  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isShowSigninForm,
        setIsShowSigninForm,
        isSharedLocation,
        setIsSharedLocation,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
