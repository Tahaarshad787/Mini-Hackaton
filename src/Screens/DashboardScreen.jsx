import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";

const DashboardScreen = () => {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/users").then((res) => setUsers(res.data));
    axios.get("http://localhost:5000/bookings").then((res) => setBookings(res.data));
    axios.get("http://localhost:5000/rooms").then((res) => setRooms(res.data));
    axios.get("http://localhost:5000/payments").then((res) => setPayments(res.data));
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: "#1976d2", color: "#fff" }}>
            <CardContent>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4">{users.length}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: "#2e7d32", color: "#fff" }}>
            <CardContent>
              <Typography variant="h6">Total Bookings</Typography>
              <Typography variant="h4">{bookings.length}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: "#d32f2f", color: "#fff" }}>
            <CardContent>
              <Typography variant="h6">Available Rooms</Typography>
              <Typography variant="h4">{rooms.length}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: "#fbc02d", color: "#fff" }}>
            <CardContent>
              <Typography variant="h6">Total Payments</Typography>
              <Typography variant="h4">${payments.reduce((sum, p) => sum + p.amount, 0)}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardScreen;
