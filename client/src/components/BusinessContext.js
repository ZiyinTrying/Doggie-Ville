import React, { createContext, useState, useEffect } from "react";

export const BusinessContext = createContext(null);

export const BusinessProvider = ({ children }) => {
  //variable to store data from fetch "/items"
  const [bissinesses, setBissinesses] = useState(null);
  const [currentMarker, setCurrentMarker] = React.useState(null);

  return (
    <BusinessContext.Provider
      value={{
        bissinesses,
        setBissinesses,
        currentMarker,
        setCurrentMarker,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};
