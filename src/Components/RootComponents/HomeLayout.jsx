import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useIsMobile from "../../customHooks/useIsMobile";
import BottomBar from "../../MobileLayout/BottomBar";
import Footer from "../Footer/Footer";
import MobileHeader from "../MobileHeader/MobileHeader";
import NavigationBar from "../Header/Header";
import { useSelector } from "react-redux";
import { BaseURL } from "../../Helper/config";
import axios from "axios";

const HomeLayout = () => {
  const isMobile = useIsMobile();
  const [paneLeft, SetpanLeft] = useState(false);
  const cart = useSelector((state) => state.cart.cartItems);
  const [state, setState] = useState({ isPaneOpen: false });
  const [userAddress, setUserAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // ✅ loading state

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await axios.get(`${BaseURL}/verify-auth`, {
          withCredentials: true,
        });

        if (res.data.status === "Success") {
          localStorage.setItem("UserDetails", JSON.stringify(res.data.data));
          localStorage.setItem("Token", res.data.token);
        } else {
          localStorage.removeItem("UserDetails");
          localStorage.removeItem("Token");
        }
      } catch (err) {
        localStorage.removeItem("UserDetails");
        localStorage.removeItem("Token");
      } finally {
        setIsLoading(false); // ✅ data load complete
      }
    };

    verifyAuth();
  }, []);

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "30vh", color: "#666" }}>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "block", "@media print": { display: "none" } }}>
        {isMobile ? (
          <MobileHeader
            userAddress={userAddress}
            setUserAddress={setUserAddress}
            paneLeft={paneLeft}
            SetpanLeft={SetpanLeft}
            cart={cart}
            state={state}
            setState={setState}
          />
        ) : (
          <NavigationBar
            userAddress={userAddress}
            setUserAddress={setUserAddress}
            state={state}
            setState={setState}
            cart={cart}
            paneLeft={paneLeft}
            SetpanLeft={SetpanLeft}
          />
        )}
      </div>

      <div>
        <Outlet />
      </div>

      <div style={{ display: "block", "@media print": { display: "none" } }}>
        {!isMobile && <Footer />}
        {isMobile && <BottomBar />}
      </div>
    </div>
  );
};

export default HomeLayout;
