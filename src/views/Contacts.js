import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import ContactForm from '../components/BackdropCreate';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import BackdropEdit from '../components/BackdropEdit';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useAuth0 } from "@auth0/auth0-react";


const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "company", headerName: "Company", width: 150 },
  { field: "role", headerName: "Role", width: 150 },
  { field: "firstName", headerName: "First Name", width: 130 },
  { field: "lastName", headerName: "Last Name", width: 130 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "phone", headerName: "Phone", width: 150 },
];

const Contacts = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // Modal state
  

  useEffect(() => {
    const fetchData = async () => {
      const url = "http://localhost:7071/api/employees";
      try {
        const response = await axios.get(url);
        const dataWithId = response.data.map((item, index) => ({
          ...item,
          id: item.id || index, // Ensure every item has an `id`
        }));
        setRows(dataWithId); // Update rows state with new data
      } catch (error) {
        console.error("Error fetching employee data:", error);
      } finally {
        setLoading(false); // Ensure loading is false after fetch
      }
    };
    

    fetchData();
  }, []);

  const filteredRows = rows.filter((row) =>
    ["company", "role", "firstName", "lastName", "email"].some((field) =>
      row[field]?.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleAddContact = async (newContact) => {
    await fetchData(); // Refetch data to include the newly added contact
  };
  

  const handleDelete = async () => {
    try {
      await axios.delete('http://localhost:7071/api/deleteEmployee', {
        data: { ids: rowSelectionModel },
      });
      await fetchData(); // Refetch data after deletion
      setRowSelectionModel([]);
    } catch (error) {
      console.error("Error deleting employees:", error);
    }
  };
  

  const handleEditContact = () => {
    if (rowSelectionModel.length === 1) {
      const contactToEdit = rows.find(row => row.id === rowSelectionModel[0]);
      setSelectedContact(contactToEdit);
      setOpenEdit(true);
    } else {
      alert("Please select exactly one contact to edit.");
    }
  };


  const handleSaveEdit = async (updatedContact) => {
    try {
      await axios.put(
        `http://localhost:7071/api/updateEmployee/${updatedContact.id}`,
        updatedContact
      );
      await fetchData(); // Refetch data after deletion
      setRowSelectionModel([]);
      // Clone rows and update the specific row
      const updatedRows = rows.map((row) =>
        row.id === updatedContact.id ? { ...row, ...updatedContact } : row
      );
      setRows(updatedRows); // Update the state with the modified rows
  
      setOpenEdit(false);
    } catch (error) {
      console.error("Error updating employee:", error);
    }
    await fetchData(); 
  };
  
  
  
  
  

  const handleRowDoubleClick = (params) => {
    const { row } = params;
    setSelectedContact(row); // Set the selected contact details
    setModalOpen(true); // Open the modal
  };
  const fetchData = async () => {
    const url = "http://localhost:7071/api/employees";
    try {
      const response = await axios.get(url);
      console.log("Fetched Data:", response.data); // Debug fetched data
      const dataWithId = response.data.map((item, index) => ({
        ...item,
        id: item.id || index,
      }));
      setRows(dataWithId);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    } finally {
      setLoading(false);
    }
  };
  
  


  return (
    <div>
      <h2>Contacts</h2>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          margin="normal"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton 
          color="primary" 
          sx={{
            backgroundColor: '#0E86D4',
            borderRadius: '50%',
            '&:hover': {
              backgroundColor: 'darkblue',
            },
            marginLeft: 1
          }} 
          onClick={() => setOpen(true)}
        >
          <AddIcon sx={{ color: 'white' }} />
        </IconButton>
        <IconButton 
          color="primary" 
          sx={{
            backgroundColor: 'purple',
            borderRadius: '50%',
            '&:hover': {
              backgroundColor: 'darkblue',
            },
            marginLeft: 1
          }} 
          onClick={handleEditContact}
        >
          <EditIcon sx={{ color: 'white' }} />
        </IconButton>
      </Box>

      <Paper sx={{ height: 400, width: "100%", marginTop: "1rem" }}>
        <DataGrid
        key={rows.length} 
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          loading={loading}
          checkboxSelection={false}
          onRowSelectionModelChange={(newRowSelectionModel) => setRowSelectionModel([newRowSelectionModel[0]])}
          rowSelectionModel={rowSelectionModel}
          onRowDoubleClick={handleRowDoubleClick}
          sx={{ border: 0 }}
        />
      </Paper>

      {rowSelectionModel.length > 0 && (
        <Box sx={{ marginTop: '1rem' }}>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={handleDelete}
          >
            Delete Selected
          </Button>
        </Box>
      )}

      <ContactForm 
        open={open} 
        onClose={() => setOpen(false)} 
        onSave={handleAddContact} 
      />
      <BackdropEdit
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        onSave={(updatedContact) => {
          setOpenEdit(false); // Ensure modal closes
          handleSaveEdit(updatedContact); // Save the updated contact
        }}
        contact={selectedContact}
      />




      {/* Modal to Display User Details */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          {selectedContact && (
            <div>
              <p><strong>ID:</strong> {selectedContact.id}</p>
              <p><strong>Company:</strong> {selectedContact.company}</p>
              <p><strong>Role:</strong> {selectedContact.role}</p>
              <p><strong>First Name:</strong> {selectedContact.firstName}</p>
              <p><strong>Last Name:</strong> {selectedContact.lastName}</p>
              <p><strong>Email:</strong> {selectedContact.email}</p>
              <p><strong>Phone:</strong> {selectedContact.phone}</p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Contacts;
