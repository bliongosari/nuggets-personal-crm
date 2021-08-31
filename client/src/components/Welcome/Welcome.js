import api from "../../config/axiosConfig";
import React from "react";
import { useQuery } from "react-query";
import "./Welcome.css";
import { useHistory } from "react-router-dom";


function Welcome() {
  const { isError, isSuccess } = useQuery("auth", async () => {
    const { data } = await api.get("/api/user/verifyToken");
    return data;
  }, { staleTime: Infinity });
  const history = useHistory();
  if (isSuccess) history.push("/home");
  return (
    <>
      {isError &&
        <div className="main-content">
          <h1>Welcome to Nuggets!</h1>
          <h2>Your personal organiser, contacts storage, and reminder</h2>
        </div>
      }
    </>
  );
}

export default Welcome;
