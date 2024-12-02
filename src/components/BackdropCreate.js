import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import axios from 'axios';

const ContactForm = ({ open, onClose, onSave }) => {
  const [newContact, setNewContact] = useState({
    company: '',
    role: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  // Handle form field change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:7071/api/createEmployee', newContact);
      console.log(response.data);
      onSave(response.data); // Pass back the created contact to parent
      onClose();
      setNewContact({
        company: '',
        role: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  

  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Create New Contact</DialogTitle>
        <DialogContent>
        <TextField
            label="UID"
            variant="outlined"
            fullWidth
            margin="normal"
            name="id"
            value={newContact.id}
            onChange={handleInputChange}
          />
          <TextField
            label="Company"
            variant="outlined"
            fullWidth
            margin="normal"
            name="company"
            value={newContact.company}
            onChange={handleInputChange}
          />
          <TextField
            label="Role"
            variant="outlined"
            fullWidth
            margin="normal"
            name="role"
            value={newContact.role}
            onChange={handleInputChange}
          />
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="firstName"
            value={newContact.firstName}
            onChange={handleInputChange}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="lastName"
            value={newContact.lastName}
            onChange={handleInputChange}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={newContact.email}
            onChange={handleInputChange}
          />
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            margin="normal"
            name="phone"
            value={newContact.phone}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Backdrop>
  );
};

export default ContactForm;
