import React, { Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth0();

  // Function to fetch user details and send them to the backend
  const fetchUserDetails = async () => {
    if (isAuthenticated) {
      try {
        // Define userDetails using the authenticated user object
        const userDetails = {
          userId: user.sub,  // Use Auth0's unique user ID
          name: user.name,
          email: user.email,
          location: user.location || 'Default location', // Optional field
        };

        // Call your backend API with the user info
        const response = await fetch("http://localhost:7071/api/httpexample", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userDetails),
        });

        // Check if the response is ok
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("User saved:", data);
      } catch (error) {
        console.error("Error saving user:", error);
      }
    } else {
      console.warn("User is not authenticated");
    }
  };

  return (
    <Fragment>
      <h1>Dashboard</h1>
      {isAuthenticated ? (
        <div>
          <h2>Welcome, {user.name}!</h2>
          <p>Email: {user.email}</p>
          <button onClick={fetchUserDetails}>Send User Details to Backend</button>
        </div>
      ) : (
        <p>Please log in to see your dashboard.</p>
      )}
    </Fragment>
  );
};

export default Dashboard;
