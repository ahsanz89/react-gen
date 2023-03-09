import React from "react";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../../app/features/auth/authSlice";


export default function Login() {
  const dispatch = useDispatch();
  const doLogin = () => {
    let token = true;
    dispatch(setAuthToken(token));
    localStorage.setItem("user", token);
  };
  return (
    <button onClick={doLogin}>
      Sign In
    </button>
  );
}
