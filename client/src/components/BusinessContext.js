import React, { createContext, useState, useEffect } from "react";

export const BusinessContext = createContext(null);

export const BusinessProvider = ({ children }) => {
  //variable to store data from fetch "/items"
  const [businesses, setBusinesses] = useState([]);
  const [currentMarker, setCurrentMarker] = React.useState({
    lat: 45.446949,
    lng: -73.608688,
  });
  const [checkBar, setCheckBar] = React.useState({
    hotels: false,
    resturant: false,
    petstore: false,
    parks: false,
    vet: false,
    nationalParks: false,
  });
  const [checkBarRefs, setCheckBarRefs] = React.useState({
    resturant: null,
    petstore: null,
    parks: null,
    vet: null,
    nationalParks: null,
    hotels: null,
  });
  // const [currentMarker, setCurrentMarker] = React.useState(null);
  const [isLiked, setIsLiked] = React.useState(false);

  return (
    <BusinessContext.Provider
      value={{
        businesses,
        setBusinesses,
        currentMarker,
        setCurrentMarker,
        isLiked,
        setIsLiked,
        checkBar,
        setCheckBar,
        checkBarRefs,
        setCheckBarRefs,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};
