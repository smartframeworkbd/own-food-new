import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-image-gallery/styles/css/image-gallery.css";
import "react-tabs/style/react-tabs.css";
import "react-tooltip/dist/react-tooltip.css";
import "react-image-lightbox/style.css";
import store from "./Redux/Store/Store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "react-scroll-to-top";
import { LanguageContextProvider } from "./Context/LanguageContext";
import InitLocation from "./InitLocation/InitLocation";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Provider store={store}>
      <LanguageContextProvider>
        <Toaster />
        <InitLocation />
        <ScrollToTop smooth color='#6f00ff' />
        <App />
      </LanguageContextProvider>
    </Provider>
  </StrictMode>
);
