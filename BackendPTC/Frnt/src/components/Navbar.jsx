import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ logged, setLogged }) => {
  const navigate = useNavigate();

  const clear = () => {
    localStorage.clear();
    setLogged(false);
    navigate("/login");
  };

  return (
    <div>
      {!logged && (
        <>
          Go To: {"   -  "}
          <Link to="/login">Login</Link> {" - "}
          <Link to="/">Signup</Link>
          <br />
        </>
      )}
      {logged && (
        <>
          <Link to="/dashboard">Dashboard</Link> {" - "}
          <button className="log" onClick={clear}>
            Logout
          </button>
        </>
      )}

      <h2 className="user">
        User:{" "}
        {localStorage.getItem("email")
          ? localStorage.getItem("email")
          : "Please Login"}
      </h2>
      <br />
      <br />
    </div>
  );
};

export default Navbar;
