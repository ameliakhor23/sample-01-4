import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react'; // Import if you're using Auth0
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


const ContactForm = ({ open, onClose, onSave }) => {
  const { getAccessTokenSilently } = useAuth0();  // Get token from Auth0 or your auth provider
  const [newContact, setNewContact] = useState({
    company: '',
    role: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    access: '',
  });

  // Handle form field change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      // Get the JWT token
      const token = await getAccessTokenSilently();
  
      // Step 1: Create the employee
      const createEmployeeResponse = await axios.post('https://api.xcitesolutions.com.au/createEmployee', newContact, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
          'Content-Type': 'application/json', // Ensure the request body is JSON
        },
      });
  
      console.log('Employee created:', createEmployeeResponse.data);
  
      // Step 2: Trigger email verification (create user)
      const { email } = newContact;
      const defaultPassword = 'TestPassword123'; // Make sure to define the password here
      const inviteUserResponse = await fetch("https://api.xcitesolutions.com.au/create_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: defaultPassword }),
      });
  
      if (!inviteUserResponse.ok) {
        throw new Error("Failed to invite user");
      }
  
      const inviteUserData = await inviteUserResponse.json();
      console.log("User invited successfully:", inviteUserData);
      // Step 3: Change password for the user (no email verification in this step)
      const passwordChangeResponse = await fetch("https://api.xcitesolutions.com.au/password_change", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      if (!passwordChangeResponse.ok) {
        throw new Error("Failed to change password");
      }
  
      const passwordChangeData = await passwordChangeResponse.json();
      console.log("Password change triggered successfully:", passwordChangeData);
  
      // Step 4: Pass back the created contact to parent
      onSave(createEmployeeResponse.data);
  
      // Reset form and close the dialog
      onClose();
      setNewContact({
        id: '',
        company: '',
        role: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        access: '',
      });
  
      alert('Employee created and verification email sent successfully.');
    } catch (error) {
      console.error('Error submitting form:', error);
  
      // Display an error message to the user
      alert('Failed to create employee or send verification email. Please try again.');
    }
  };
  
  

  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Create New Contact</DialogTitle>
        <p> Please enter new user details</p>
        <DialogContent>
          <TextField
            label="UID"
            variant="filled"
            fullWidth
            margin="normal"
            name="id"
            value={newContact.id}
            onChange={handleInputChange}
          />
          <TextField
            label="Company"
            variant="filled"
            fullWidth
            margin="normal"
            name="company"
            value={newContact.company}
            onChange={handleInputChange}
          />
          <TextField
            label="Role"
            variant="filled"
            fullWidth
            margin="normal"
            name="role"
            value={newContact.role}
            onChange={handleInputChange}
          />
          <TextField
            label="First Name"
            variant="filled"
            fullWidth
            margin="normal"
            name="firstName"
            value={newContact.firstName}
            onChange={handleInputChange}
          />
          <TextField
            label="Last Name"
            variant="filled"
            fullWidth
            margin="normal"
            name="lastName"
            value={newContact.lastName}
            onChange={handleInputChange}
          />
          <TextField
            label="Email"
            variant="filled"
            fullWidth
            margin="normal"
            name="email"
            value={newContact.email}
            onChange={handleInputChange}
          />
          <TextField
            label="Phone"
            variant="filled"
            fullWidth
            margin="normal"
            name="phone"
            value={newContact.phone}
            onChange={handleInputChange}
          />
        </DialogContent>
        <FormControl sx={{ marginTop: '1rem', alignItems: 'center' }}>
      <FormLabel id="access" >Access</FormLabel>
      <RadioGroup
        row
        aria-labelledby="access"
        name="access"
        value={newContact.access}
        onChange={handleInputChange}
      >
        <FormControlLabel 
          value="admin" control={<Radio />} label="Admin" />
        <FormControlLabel 
          value="standard" 
          control={<Radio />} 
          label="Standard"     
/>
      </RadioGroup>
    </FormControl>
        
        <DialogActions>
          <Button onClick={onClose} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Backdrop>
  );
};

export default ContactForm;

