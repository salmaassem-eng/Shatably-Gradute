import React from "react";
import Leftside from "./leftside/Leftside";
import RightSide from "./rightside/RightSide";

const Login = () => {


  return (
    <div className="grid grid-cols-2 justify-center items-center" >
      <RightSide />
      <Leftside />
    </div>
  );
};

export default Login;