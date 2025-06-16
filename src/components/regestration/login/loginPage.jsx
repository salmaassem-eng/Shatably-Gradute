import React from "react";
import Leftside from "../leftside/Leftside";
import RightSide from "./Login";

const Login = () => {


  return (
    <div className="grid lg:grid-cols-2 sm:grid-cols-1 justify-center items-center" >
      <RightSide />
      <Leftside />
    </div>
  );
};

export default Login;