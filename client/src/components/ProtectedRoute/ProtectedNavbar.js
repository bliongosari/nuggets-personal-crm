import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../../config/axiosConfig.js";

const ProtectedNavbar = ({ component: Component, ...rest }) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  const isAuthenticated = async () => {
    api({
      method: "GET",
      url: "/api/user/verifyToken",
    })
      .then((res) => {
        if (res.status === 200) {
          setAuth(true);
          setLoading(false);
        } else {
          Cookies.remove("token");
          setLoading(false);
        }
      })
      .catch((err) => {
        Cookies.remove("token");
        setLoading(false);
      });
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  return loading ? (
    <label> </label>
  ) : (
    <Route
      {...rest}
      render={(props) =>
        auth ? <Component {...props} /> : <Redirect to="/error" />
      }
    />
  );
};

export default ProtectedNavbar;
