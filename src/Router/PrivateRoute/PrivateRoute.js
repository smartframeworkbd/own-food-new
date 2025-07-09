import React, { useState } from "react";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { BaseURL } from "../../Helper/config";

const PrivateRoute = ({ children }) => {
  let [data, setData] = useState({});
  let [token, setToken] = useState("");
  //let data1;
  useEffect(() => {
    let item = JSON.parse(localStorage.getItem("UserDetails"));

    setData(item);

    //  }
  }, []);
  let item1 = localStorage.getItem("Token");

  const location = useLocation();
  if (data && item1) {
    return children;
  }
  return (
    <Navigate to='/CustomerLogin' state={{ form: location }} replace></Navigate>
  );
};

export default PrivateRoute;
