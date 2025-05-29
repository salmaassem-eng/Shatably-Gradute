import React from "react";
import { Navigate } from "react-router-dom";

const ForgotPassword = () => {
  // Redirect to the new flow
  return <Navigate to="/forgetpass" />;
};

export default ForgotPassword; 