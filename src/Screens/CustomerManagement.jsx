import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import axios from "axios";

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    axios.get("http://localhost:5000/customers").then((res) => setCustomers(res.data));
    axios.get("http://localhost:5000/bookings").then((res) => setBookings(res.data));
  }, []);

  const handleAddCustomer = () => {
    const customerData = { ...newCustomer, id: Date.now() };
    axios.post("http://localhost:5000/customers", customerData).then((res) => {
      setCustomers([...customers, res.data]);
      setNewCustomer({ name: "", email: "", phone: "" });
    });
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Customer Management
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Manage customer details and view their booking history.
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card sx={{ bgcolor: "#1976d2", color: "#fff" }}>
            <CardContent>
              <Typography variant="h6">Total Customers</Typography>
              <Typography variant="h4">{customers.length}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card sx={{ bgcolor: "#2e7d32", color: "#fff" }}>
            <CardContent>
              <Typography variant="h6">Total Bookings</Typography>
              <Typography variant="h4">{bookings.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4}>
        <Typography variant="h5" gutterBottom>Add New Customer</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField label="Name" value={newCustomer.name} onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })} fullWidth variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Email" value={newCustomer.email} onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })} fullWidth variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Phone" value={newCustomer.phone} onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })} fullWidth variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleAddCustomer} fullWidth sx={{ mt: 2 }}>Add Customer</Button>
          </Grid>
        </Grid>
      </Box>

      <Box mt={4}>
        <Typography variant="h5">Customer List & Booking History</Typography>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Email</b></TableCell>
                <TableCell><b>Phone</b></TableCell>
                <TableCell><b>Bookings</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>
                    {bookings.filter(b => b.customerId === customer.id).length} Bookings
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default CustomerManagement;
