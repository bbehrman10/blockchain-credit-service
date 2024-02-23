import { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import userData from '../data/sampleData'; // Adjust the import path as needed

export default function TransactionHistory() {
  // State to hold aggregated transactions
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Aggregate and sort transactions when component mounts
    const aggregatedTransactions = userData.cards.flatMap(card =>
      card.transactions.map(transaction => ({
        ...transaction,
        cardNumber: card.cardNumber, // Include card number for identification
      }))
    ).sort((a, b) => +new Date(b.date) - +new Date(a.date)); // Sort by date descending

    setTransactions(aggregatedTransactions);
  }, []);

  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Transaction History
        </Typography>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <Table aria-label="transaction history">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Card Used</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Amount (ETH)</TableCell>
                <TableCell>USD Equivalent</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Vendor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.cardNumber.slice(-4)}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>${transaction.usdEquivalent}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>{transaction.vendor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </DashboardLayout>
  );
}
