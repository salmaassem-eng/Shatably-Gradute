import React from "react";
import "./Leftside.css";
import video from "../../../assets/loginVid.mp4";

const Leftside = () => (
  <div className="video-container hidden lg:block">
    <video src={video}  autoPlay muted loop />
  </div>
);

export default Leftside;