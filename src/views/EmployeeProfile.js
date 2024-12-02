import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EmployeeProfile = () => {
  const { id } = useParams();  // Get the employee ID from the URL
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`http://localhost:7071/api/employees/${id}`);
        console.log("Employee data:", response.data);  // Log the fetched data
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!employee) {
    return <div>Employee not found</div>;
  }

  return (
    <div>
      <h2>{employee.firstName} {employee.lastName}</h2>
      <p><strong>Company:</strong> {employee.company}</p>
      <p><strong>Role:</strong> {employee.role}</p>
      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Phone:</strong> {employee.phone}</p>
      {/* Add any additional employee details here */}
    </div>
  );
};

export default EmployeeProfile;
