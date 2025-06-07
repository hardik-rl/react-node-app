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

const Payment = () => {
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
                <TableCell>{p.id}</TableCell>
                <TableCell>{p.amount}</TableCell>
                <TableCell>{p.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default Payment