import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
export default function UserInfo() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:8080/api/user/info",
      headers: {
        "X-ACCESS-TOKEN": Cookies.get("token"),
      },
    })
      .then((res) => {
        if (res.status === 200) {
          const user = {
            email: res.data.email,
            firstname: res.data.firstname,
            lastname: res.data.lastname,
          };
          setUser(user);
          setLoading(false);
        } else {
          setFailed(true);
        }
      })
      .catch((err) => {
        setFailed(true);
      });
  }, []);

  return (
    <div>
      {failed ? (
        <h1> Failed to get user data</h1>
      ) : (
        <div>
          <h1>User Info</h1>
          {loading ? (
            <h1> Loading.... </h1>
          ) : (
            <div>
              <li> Firstname: {user.firstname}</li>
              <li> Lastname: {user.lastname}</li>
              <li> Email: {user.email}</li>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
