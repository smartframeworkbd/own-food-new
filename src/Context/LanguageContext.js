import React, { createContext, useState } from "react";

const LanguageContext = createContext();

const LanguageContextProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState("bn");

  return (
    <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageContextProvider };
