import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../redux/slices/userSlice";

function Login() {
  const user = useSelector((state) => state.user.name);
  const [nameInput, setNameInput] = useState("");
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="login">
      <h1>
        <h2> user: {user} </h2>
        <form onSubmit={() => dispatch(login(nameInput))}>
          <label> Enter your name </label>
          <input
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            required="true"
          ></input>
          <input type="submit" value="Login"></input>
        </form>
        <button onClick={() => dispatch(logout())}>Logout</button>
      </h1>
    </div>
  );
}

export default Login;
