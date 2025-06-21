import React, { useEffect } from 'react'
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Typography,
  Container,
} from "@mui/material"
import { toast } from 'react-toastify';

const Payment = () => {
  const formatDate = (isoDateString) => {
    return new Date(isoDateString).toLocaleString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata"
    });
  };
  const [payments, setPayments] = useState([]);

  const fetchPayments = async () => {
    const res = await fetch("http://localhost:5000/payments");
    const data = await res.json();
    setPayments(data);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <Container maxWidth="md" style={{ padding: "40px 0", textAlign: "center" }}>
      <h2 style={{ marginTop: "50px" }}>💳 Payment History</h2>
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Payment ID</strong></TableCell>
              <TableCell><strong>Amount (₹)</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((p, index) => (
              <TableRow key={index}>
                <TableCell>{p.paymentId}</TableCell>
                <TableCell>{p.amount}</TableCell>
                <TableCell>{formatDate(p.date)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default Payment