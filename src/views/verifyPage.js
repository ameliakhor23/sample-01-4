import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");
  const email = queryParams.get("email");
  const message = queryParams.get("message");

  const handleContinue = () => {
    // Navigate to login or signup page
    navigate("/signup"); // Adjust based on your app flow
  };

  return (
    <div>
      {status === "success" ? (
        <div>
          <h1>Verification Successful!</h1>
          <p>Your email {email} has been verified. You can now log in.</p>
          <button onClick={handleContinue}>Continue to Signup</button>
        </div>
      ) : (
        <div>
          <h1>Verification Failed</h1>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default VerifyPage;
kSokpC43OMc4xESHAGgYwCIQrwCjZzV3