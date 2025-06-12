import React, { useState } from "react";
import {  useNavigate, Link, useSearchParams } from "react-router-dom";

const NewPass = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!newPassword || !confirmNewPassword) {
      setError("Both new password and confirm password are required");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!email || !token) {
      setError("Missing email or token for password reset.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://shatably.runasp.net/api/Auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ email,token , newPassword, confirmNewPassword }),
      });
    
      if (response.ok) {
        setSuccess("Password reset successful!");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to reset password. Please try again.");
      }
    } catch{
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8">
        <div className="text-center">
          <h1 className="font-bold text-[32px] ">Reset Your Password</h1>
          <p className="mt-[15px] text-[16px] opacity-70">
            Create a new password for your account
          </p>
          {email && <p className="text-xs mt-2 opacity-60">For: {email}</p>}
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{success}</span>
          </div>
        )}
        
        <div className="w-[450px] h-[350px] mt-[2rem] bg-[#fff] flex justify-center items-center m-auto rounded-[25px]">
          <form onSubmit={handlePasswordReset} className=" flex flex-col gap-[40px] justify-around items-center">
            <div className="flex flex-col gap-[10px]">
              <div className="w-full">
                <label htmlFor="newPassword" className="block font-medium">
                  New Password
                </label>
                <div className="mt-[5px] relative">
                  <input
                    id="newPassword"
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="appearance-none block w-[324px] px-[10px] py-[20px] bg-[#D9D9D9] border-none rounded-[15px] h-[44px] placeholder-gray-400 focus:outline-none focus:opacity-80 focus:text-[#16404D] transition duration-150 ease-in-out"
                    placeholder="Enter new password"
                    disabled={loading || !!success}
                  />
                </div>
              </div>
              <div className="w-full">
                <label htmlFor="confirmPassword" className="block font-medium">
                  Confirm Password
                </label>
                <div className="mt-[5px] relative">
                  <input
                    id="confirmPassword"
                    type="password"
                    required
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="appearance-none block w-[324px] px-[10px] py-[20px] bg-[#D9D9D9] border-none rounded-[15px] h-[44px] placeholder-gray-400 focus:outline-none focus:opacity-80 focus:text-[#16404D] transition duration-150 ease-in-out"
                    placeholder="Confirm new password"
                    disabled={loading || !!success}
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-[324px] h-[48px] flex justify-center items-center py-3 px-4 bg-[#16404D] text-[#fff] border border-transparent rounded-[15px] shadow-sm text-sm font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-50"
              disabled={loading || !!success}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        </div>
        <div className="text-center mt-[1rem]">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-[#16404D] hover:text-[#16404D] hover:translate-x-[-3px] transition duration-150 ease-in-out font-medium"
          >
            <svg
              className="w-[20px] h-[20px] "
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NewPass; 