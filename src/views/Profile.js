import React from "react";
import { Container, Row, Col, Button } from "reactstrap";

// import Highlight from "../components/Highlight";
import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from "@mui/material";

export const ProfileComponent = () => {
  const { user } = useAuth0();

  return (
    <Container className="mb-5">
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={2}>
          <img
            src={user.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </Col>
        <Col md>
          <h2>{user.name}</h2>
          <p className="lead text-muted">{new Date(user.updated_at).toLocaleString()}</p>
        </Col>
      </Row>
      <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold'}}>Nickname</TableCell>
            <TableCell>{user.nickname}</TableCell>
          </TableRow>
          <TableRow>
              <TableCell  sx={{ fontWeight: 'bold'}}>Name</TableCell>
            <TableCell>{user.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell   sx={{ fontWeight: 'bold'}}>Email</TableCell>
            <TableCell>{user.email}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell   sx={{ fontWeight: 'bold'}}>Email Verified</TableCell>
            <TableCell>{user.email_verified ? "Yes" : "No"} <Button variant="contained" size="small" color="primary"sx={{p: 4}}> Verify Now</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
};

export default withAuthenticationRequired(ProfileComponent, {
  onRedirecting: () => <Loading />,
});
