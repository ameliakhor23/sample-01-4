import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";

const BackdropEdit = ({ open, onClose, onSave, contact }) => {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  
  useEffect(() => {
    if (contact) {
      setFormData(contact);  // Initialize form data with selected contact details
    }
  }, [contact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://3.25.223.107:5000/updateEmployee", {
        method: "PUT",  // Change method to PUT for updating
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),  // Send updated form data as JSON
       
      });
      onSave(formData);  // Call onSave function passed as prop
      onClose();  // Close the dialog after saving

      // if (response.ok) {
      //   const result = await response.json();
      //   console.log(result);  // Optionally log the result from the API
      //   onSave(formData);  // Call onSave function passed as prop
      //   onClose();  // Close the dialog after saving
        
      // } else {
      //   console.error("Error saving employee data");
      //   onClose();
      // }
    } catch (error) {
      console.error("An error occurred:", error);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Contact</DialogTitle>
      <DialogContent dividers>
        {contact && (
          <>
            <div>
              <label>Current Company:</label>
              <p>{contact.company || "N/A"}</p>
              <TextField
                label="Company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </div>
            <div>
              <label>Current Role:</label>
              <p>{contact.role || "N/A"}</p>
              <TextField
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </div>
            <div>
              <label>Current First Name:</label>
              <p>{contact.firstName || "N/A"}</p>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </div>
            <div>
              <label>Current Last Name:</label>
              <p>{contact.lastName || "N/A"}</p>
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </div>
            <div>
              <label>Current Email:</label>
              <p>{contact.email || "N/A"}</p>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </div>
            <div>
              <label>Current Phone:</label>
              <p>{contact.phone || "N/A"}</p>
              <TextField
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </div>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BackdropEdit;