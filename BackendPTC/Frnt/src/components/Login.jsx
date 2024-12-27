import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setLocalStorage } from "../localStorageUtil";

const Login = ({ setLogged }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [resp, setResp] = useState("");
  const navigate = useNavigate();

  const logdata = async (e) => {
    e.preventDefault();
    const data = { email, pass };

    try {
      const res = await axios.post("http://localhost:3000/login", data);
      setResp(res.data.message);
      setEmail("");
      setPass("");

      if (res.status === 200) {
        setLocalStorage("email", res.data.email);
        setLocalStorage("Uid", res.data.Uid);
        setLocalStorage("token", res.data.token);
        console.log("Credentials stored in localStorage");
        setLogged(true);
        navigate("/dashboard");
      }
    } catch (error) {
      setResp(error.response?.data.message || "An error occurred");
    }
  };

  return (
    <>
      <h2>Login Page</h2>
      <form>
        Enter Email:{" "}
        <input
          type="email"
          required
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        Enter Password:{" "}
        <input
          type="password"
          required
          placeholder="Enter Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <br />
        <br />
        <h2 className="error">{resp}</h2>
        <br />
        <button type="submit" className="success" onClick={logdata}>
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
