import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [resp, setResp] = useState("");

  const logdata = async (e) => {
    e.preventDefault();
    const data = { email, pass };

    try {
      const res = await axios.post("http://localhost:3000/signup", data);
      console.log(res);
      setResp(res.data.message);
    } catch (error) {
      setResp(error.response.data.message);
    }

    setEmail("");
    setPass("");
  };

  return (
    <>
      <h2>Signup Page</h2> <br />
      <form action="/login">
        Enter Email:{" "}
        <input
          type="email"
          required
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
        <br />
        Enter Password:{" "}
        <input
          type="password"
          required
          placeholder="Enter Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />{" "}
        <h4 className="error">{resp}</h4>
        <br /> <br /> 
        <button className="success" type="submit" onClick={logdata}>
          SignUp
        </button>
      </form>
    </>
  );
};

export default Signup;
