import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { BlockLoading } from "react-loadingg";

const BlockLoad = () => <BlockLoading />;

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  const isAuthenticated = async () => {
    axios({
      method: "GET",
      url: "http://localhost:8080/api/user/verifyToken",
      headers: {
        "X-ACCESS-TOKEN": Cookies.get("token"),
      },
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
    <BlockLoad />
  ) : (
    <Route
      {...rest}
      render={(props) =>
        auth ? <Component {...props} /> : <Redirect to="/error" />
      }
    />
  );
};

export default ProtectedRoute;
