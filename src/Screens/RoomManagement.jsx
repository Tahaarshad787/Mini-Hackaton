import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import axios from "axios";

const RoomManagement = ({ viewType }) => {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [newRoom, setNewRoom] = useState({ type: "", price: "", availability: true });

  useEffect(() => {
    axios.get("http://localhost:5000/rooms").then((res) => setRooms(res.data));
    axios.get("http://localhost:5000/bookings").then((res) => setBookings(res.data));
  }, []);

  const handleAddRoom = () => {
    const roomData = { ...newRoom, id: Date.now() };
    axios.post("http://localhost:5000/rooms", roomData).then((res) => {
      setRooms([...rooms, res.data]);
      setNewRoom({ type: "", price: "", availability: true });
    });
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>Room Management</Typography>
      {viewType === "list" ? (
        <Typography variant="h6">📋 Admin: List View</Typography>
      ) : (
        <Typography variant="h6">📦 User: Card View</Typography>
      )}
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={6}>
          <Card sx={{ bgcolor: "#1976d2", color: "#fff" }}>
            <CardContent>
              <Typography variant="h6">Total Rooms</Typography>
              <Typography variant="h4">{rooms.length}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <Card sx={{ bgcolor: "#2e7d32", color: "#fff" }}>
            <CardContent>
              <Typography variant="h6">Total Bookings</Typography>
              <Typography variant="h4">{bookings.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {viewType === "list" ? (
        <Box mt={4}>
          <Typography variant="h5">Room List</Typography>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Room Type</b></TableCell>
                  <TableCell><b>Price</b></TableCell>
                  <TableCell><b>Availability</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rooms.map((room) => (
                  <TableRow key={room.id}>
                    <TableCell>{room.type}</TableCell>
                    <TableCell>${room.price}</TableCell>
                    <TableCell>{room.availability ? "Yes" : "No"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box mt={4}>
          <Typography variant="h5">Available Rooms</Typography>
          <Grid container spacing={2} mt={2}>
            {rooms.map((room) => (
              <Grid item xs={12} sm={6} md={4} key={room.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{room.type}</Typography>
                    <Typography variant="body1">Price: ${room.price}</Typography>
                    <Typography variant="body2">Available: {room.availability ? "Yes" : "No"}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default RoomManagement;
