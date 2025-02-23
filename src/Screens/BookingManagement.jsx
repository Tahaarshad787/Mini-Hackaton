import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import axios from "axios";

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/bookings").then((res) => setBookings(res.data));

    axios.get("http://localhost:5000/rooms").then((res) => {
      const storedRooms = res.data.map((room) => {
        const storedAvailability = localStorage.getItem(`room_${room.id}`);
        return storedAvailability ? { ...room, availability: storedAvailability === "true" } : room;
      });
      setRooms(storedRooms);
    });

    axios.get("http://localhost:5000/customers").then((res) => setCustomers(res.data));
  }, []);

  const handleAddBooking = (room) => {
    const customer = customers.length > 0 ? customers[0] : null;
    if (!customer) {
      alert("No customer available for booking.");
      return;
    }

    const bookingData = {
      id: Date.now(),
      customerId: customer.id,
      customerName: customer.name,
      roomId: room.id,
      roomType: room.type,
      checkIn: new Date().toISOString().split("T")[0],
      checkOut: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0],
    };

    axios.post("http://localhost:5000/bookings", bookingData).then((res) => {
      setBookings([...bookings, res.data]);
      setRooms(
        rooms.map((r) =>
          r.id === room.id ? { ...r, availability: false } : r
        )
      );

      // Save room booking status in localStorage
      localStorage.setItem(`room_${room.id}`, "false");

      // Save payment data in localStorage
      const paymentData = {
        id: Date.now(),
        customer: customer.name,
        amount: room.price,
        status: "Pending",
        method: "Not Paid Yet",
      };

      const storedPayments = JSON.parse(localStorage.getItem("payments")) || [];
      storedPayments.push(paymentData);
      localStorage.setItem("payments", JSON.stringify(storedPayments));
    });

    // Update room availability in backend
    axios.patch(`http://localhost:5000/rooms/${room.id}`, { availability: false });
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card sx={{ bgcolor: "#1976d2", color: "#fff" }}>
            <CardContent>
              <Typography variant="h6">Total Bookings</Typography>
              <Typography variant="h4">{bookings.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4}>
        <Typography variant="h5" gutterBottom>Room List</Typography>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Room Type</b></TableCell>
                <TableCell><b>Price</b></TableCell>
                <TableCell><b>Availability</b></TableCell>
                <TableCell><b>Action</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell>{room.type}</TableCell>
                  <TableCell>${room.price}</TableCell>
                  <TableCell>{room.availability ? "Available" : "Booked"}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAddBooking(room)}
                      disabled={!room.availability}
                    >
                      {room.availability ? "Book Now" : "Booked"}
                    </Button>
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

export default BookingManagement;
