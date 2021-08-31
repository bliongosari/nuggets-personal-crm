import "./Welcome.css";
import api from "../../config/axiosConfig";
import React from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { BlockLoading } from "react-loadingg";

const BlockLoad = () => <BlockLoading />;

function Welcome() {
  const { isLoading, isError, isSuccess } = useQuery("auth", async () => {
    const { data } = await api.get("/api/user/verifyToken");
    return data;
  }, { retry: false });
  const history = useHistory();
  if (isSuccess) history.push("/home");
  return (
    <>
      {isLoading && <BlockLoad />}
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
