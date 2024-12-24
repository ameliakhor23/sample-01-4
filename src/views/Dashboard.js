import React, { Fragment, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth0();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    if (isAuthenticated && user) {
      // Check if roles exist in user.app_metadata.authorization
      if (user.app_metadata && user.app_metadata.authorization && user.app_metadata.authorization.roles) {
        setRoles(user.app_metadata.authorization.roles);
      } else {
        setRoles([]);  // Set default to empty array if no roles are found
      }
    }
  }, [isAuthenticated, user]);

  // Function to fetch user details and send them to the backend
  const fetchUserDetails = async () => {
    if (isAuthenticated) {
      try {
        const userDetails = {
          userId: user.sub,  // Use Auth0's unique user ID
          name: user.name,
          email: user.email,
          location: user.location || 'Default location', // Optional field
          roles: roles, // Attach roles to the user details
        };

        // Send the user details to your backend (e.g., using fetch or axios)
        console.log(userDetails);
        // Example of sending to your backend
        // await fetch('/api/user-details', {
        //   method: 'POST',
        //   body: JSON.stringify(userDetails),
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
  };

  return (
    <Fragment>
      <h1>Welcome to the Dashboard</h1>
      {isAuthenticated && user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Roles: {roles.join(', ')}</p> {/* Display roles */}
          <button onClick={fetchUserDetails}>Send User Details</button>
        </div>
      ) : (
        <p>Please log in</p>
      )}
    </Fragment>
  );
};

export default Dashboard;
