import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const storedPayments = JSON.parse(localStorage.getItem("payments")) || [];
    setPayments(storedPayments);
  }, []);

  const handlePaymentDone = (id) => {
    const updatedPayments = payments.map((payment) =>
      payment.id === id ? { ...payment, status: "Successful", method: "Online" } : payment
    );

    setPayments(updatedPayments);
    localStorage.setItem("payments", JSON.stringify(updatedPayments));
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h5" gutterBottom>Payment Management</Typography>
      
      <Box mb={4} display="flex" gap={2}>
        <Card sx={{ bgcolor: "#0288d1", color: "#fff", flex: 1 }}>
          <CardContent>
            <Typography variant="h6">Total Payments</Typography>
            <Typography variant="h4">{payments.length}</Typography>
          </CardContent>
        </Card>
      </Box>
      
      <Typography variant="h6">Payment Transactions</Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Customer</b></TableCell>
              <TableCell><b>Amount</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Method</b></TableCell>
              <TableCell><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.customer}</TableCell>
                <TableCell>${payment.amount}</TableCell>
                <TableCell>{payment.status}</TableCell>
                <TableCell>{payment.method}</TableCell>
                <TableCell>
                  {payment.status !== "Successful" ? (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handlePaymentDone(payment.id)}
                    >
                      Payment Done
                    </Button>
                  ) : (
                    <Typography color="green">Paid</Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PaymentManagement;
