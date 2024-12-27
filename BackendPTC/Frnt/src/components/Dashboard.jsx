import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Navigate } from "react-router-dom";

const Dashboard = ({ logged, setLogged }) => {
  const [item, setItem] = useState([]);
  const [food, setFood] = useState("");
  const [desc, setDesc] = useState("");
  const [info, setInfo] = useState([]);
  const [file, setFile] = useState(null);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    setFile(selectedFile);
  };

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const update = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email");
    const Uid = localStorage.getItem("Uid");
    console.log(email, Uid);
    const data = { food, desc, email, Uid };
    try {
      const res = await axios.post(
        "http://localhost:3000/dashboard",
        data,
        config
      );
      setInfo(res.data);
      setItem([...item, { food, desc }]);
      console.log(food, desc);
      setFood("");
      setDesc("");
    } catch (error) {
      console.error("Error while adding item:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ress = await axios.get(
          `http://localhost:3000/dashboard?Uid=${localStorage.getItem("Uid")}`,
          config
        );
        console.log("data2", ress.data);

        setInfo(ress.data);
      } catch (error) {
        localStorage.clear();
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [logged]);

  if (localStorage.length === 0) {
  }

  return (
    <>
      <h2>Add Items Below</h2>
      <form onSubmit={update}>
        <input
          placeholder="Enter Food Name"
          value={food}
          type="text"
          onChange={(e) => setFood(e.target.value)}
        />
        <br />
        <input
          placeholder="Enter Description"
          value={desc}
          type="text"
          onChange={(e) => setDesc(e.target.value)}
        />
        <div className="container">
          <h1>Upload Image or Video</h1>
          <form id="upload-form">
            <div className="file-input">
              <label htmlFor="image-upload">Choose an Image:</label>
              <input
                type="file"
                id="image-upload"
                onChange={handleFileChange}
                accept="image/*"
              />
              <div id="image-preview" className="preview"></div>
            </div>

            <div className="file-input">
              <label htmlFor="video-upload">Choose a Video:</label>
              <input
                type="file"
                id="video-upload"
                onChange={handleFileChange}
                accept="video/*"
              />
              <div id="video-preview" className="preview"></div>
            </div>

            <button type="submit">Upload</button>
          </form>
        </div>
        <br /> <br />
        <button className="success" type="submit">
          Add Item
        </button>
      </form>
      <div>
        {/* Ensure info is an array before calling .map() */}
        {Array.isArray(info) &&
          info.map((f, idx) => (
            <div className="tab" key={idx}>
              <h2 className="tabf">{f.food}</h2>
              
              <h3 className="tabd">{f.desc}</h3>
            </div>
          ))}
      </div>
    </>
  );
};

export default Dashboard;
