import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const servicesList = [
  { id: 1, name: "Room Service", description: "Food and drinks delivered to your room." },
  { id: 2, name: "Laundry Service", description: "Washing and ironing of clothes." },
  { id: 3, name: "Spa & Wellness", description: "Relaxing massages and beauty treatments." },
  { id: 4, name: "Gym & Fitness", description: "Access to gym and personal trainers." },
  { id: 5, name: "Swimming Pool", description: "Indoor and outdoor pool access." },
  { id: 6, name: "Concierge Service", description: "Travel assistance and reservations." },
];

const ServiceManagement = () => {
  const [serviceRequests, setServiceRequests] = useState([]);

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem("serviceRequests")) || [];
    setServiceRequests(storedRequests);
  }, []);

  const handleRequestService = (service) => {
    const newRequest = { id: Date.now(), name: service.name, status: "Pending" };
    const updatedRequests = [...serviceRequests, newRequest];
    setServiceRequests(updatedRequests);
    localStorage.setItem("serviceRequests", JSON.stringify(updatedRequests));
  };

  const handleCompleteService = (id) => {
    const updatedRequests = serviceRequests.map((req) =>
      req.id === id ? { ...req, status: "Completed" } : req
    );
    setServiceRequests(updatedRequests);
    localStorage.setItem("serviceRequests", JSON.stringify(updatedRequests));
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h5" gutterBottom>Hotel Services</Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Service</b></TableCell>
              <TableCell><b>Description</b></TableCell>
              <TableCell><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {servicesList.map((service) => (
              <TableRow key={service.id}>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleRequestService(service)}
                  >
                    Request Service
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" sx={{ mt: 4 }}>Service Requests</Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Requested Service</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {serviceRequests.length > 0 ? (
              serviceRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.name}</TableCell>
                  <TableCell>{request.status}</TableCell>
                  <TableCell>
                    {request.status === "Pending" && (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleCompleteService(request.id)}
                      >
                        Mark as Completed
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">No service requests yet</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ServiceManagement;
