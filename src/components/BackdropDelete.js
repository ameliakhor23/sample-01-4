import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

const BackdropDelete = ({ open, onClose, onConfirm, contact }) => {
  return (
    <Backdrop open={open} sx={{ zIndex: 1200 }}>
      <Box
        sx={{
          p: 3,
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 3,
          minWidth: 300,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Confirm Deletion
        </Typography>
        {contact && (
          <Typography variant="body1" gutterBottom>
            Are you sure you want to delete the following contact?
          </Typography>
        )}
        <TextField
          label="ID"
          variant="filled"
          fullWidth
          margin="normal"
          name="ID"
          value={contact ? contact.id : ""}
          InputProps={{
            readOnly: true,
            style: { color: 'black' },
          }}
        />
          <TextField
          label="Company"
          variant="filled"
          fullWidth
          margin="normal"
          name="Company"
          value={contact ? contact.company : ""}
          InputProps={{
            readOnly: true,
            style: { color: 'black' },
          }}
        />
          <TextField
          label="First Name"
          variant="filled"
          fullWidth
          margin="normal"
          name="First Name"
          value={contact ? contact.firstName : ""}
          InputProps={{
            readOnly: true,
            style: { color: 'black' },
          }}
        />
          <TextField
          label="Last Name"
          variant="filled"
          fullWidth
          margin="normal"
          name="Last Name"
          value={contact ? contact.lastName : ""}
          InputProps={{
            readOnly: true,
            style: { color: 'black' },
          }}
        />
          <TextField
          label="Email"
          variant="filled"
          fullWidth
          margin="normal"
          name="Email"
          value={contact ? contact.email : ""}
          InputProps={{
            readOnly: true,
            style: { color: 'black' },
          }}
        />
          <TextField
          label="Phone"
          variant="filled"
          fullWidth
          margin="normal"
          name="Phone"
          value={contact ? contact.phone : ""}
          InputProps={{
            readOnly: true,
            style: { color: 'black' },
          }}
        />
        {/* <Typography variant="body2">
          Name: {contact ? `${contact.firstName} ${contact.lastName}` : ""}
        </Typography>
        <Typography variant="body2">
          Company: {contact ? contact.company : ""}
        </Typography>
        <Typography variant="body2">
          Role: {contact ? contact.role : ""}
        </Typography>
        <Typography variant="body2">
          Email: {contact ? contact.email : ""}
        </Typography> */}

        <Box mt={2}>
          <Button
            variant="contained"
            color="secondary"
            sx={{ mr: 1 }}
            onClick={onConfirm}
          >
            Yes
          </Button>
          <Button variant="outlined" onClick={onClose}>
            No
          </Button>
        </Box>
      </Box>
    </Backdrop>
  );
};

export default BackdropDelete;
