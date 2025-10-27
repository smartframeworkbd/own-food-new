import React, { createContext, useState, useEffect } from "react";

const LanguageContext = createContext();

const LanguageContextProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem("appLanguage") || "bn";
  });

  useEffect(() => {
    localStorage.setItem("appLanguage", currentLanguage);
  }, [currentLanguage]);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageContextProvider };
