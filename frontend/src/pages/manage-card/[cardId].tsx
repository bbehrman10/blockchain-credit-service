import { useRouter } from 'next/router';
import DashboardLayout from '../../components/DashboardLayout';
import { useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, TextField, Paper, Button, Modal, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, Box } from '@mui/material';
import userData from '../../data/sampleData'; // Adjust import path as needed

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.default',
  color: 'text.primary',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const ManageCard = () => {
  const router = useRouter();
  const { cardId } = router.query;
  const [open, setOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('ETH');
  const [paymentAmount, setPaymentAmount] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => setPaymentMethod(event.target.value);
  const handlePaymentAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => setPaymentAmount(event.target.value);

  // Find the card by cardId
  const card = userData.cards.find(card => card.cardId === cardId);

  if (!card) {
    return <p>Card not found</p>; // Or handle as needed
  }

  // Get the last 5 transactions for this card
  const lastFiveTransactions = card.transactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Manage Card - Ending in {card.cardNumber.slice(-4)}
        </Typography>

        {/* Card Details */}
        <Typography variant="h6">Current Balance: ${card.balance}</Typography>
        <Typography variant="h6">Statement Balance: ${card.statementBalance}</Typography>
        <Typography variant="h6">Statement Due Date: {card.dueDate}</Typography>
        <Typography variant="h6">Rewards: {card.rewards} Points</Typography>

        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleOpen}>
          Pay Statement
        </Button>
        <Modal open={open} onClose={handleClose}>
          <Box sx={modalStyle}>
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              Pay Statement
            </Typography>
            <FormControl component="fieldset" sx={{ mb: 2 }}>
              <FormLabel component="legend">Payment Method</FormLabel>
              <RadioGroup row value={paymentMethod} onChange={handlePaymentMethodChange}>
                <FormControlLabel value="USD" control={<Radio />} label="USD (Inactive)" disabled />
                <FormControlLabel value="ETH" control={<Radio />} label="ETH" />
              </RadioGroup>
            </FormControl>
            <TextField
              label="Amount"
              type="number"
              variant="outlined"
              fullWidth
              value={paymentAmount}
              onChange={handlePaymentAmountChange}
              InputProps={{
                endAdornment: <Typography variant="body1">{paymentMethod}</Typography>,
              }}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" color="primary" fullWidth sx={{ mb: 2 }}>
              Connect Wallet
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose} fullWidth>
              Close
            </Button>
          </Box>
        </Modal>
        {/* Last 5 Transactions */}
        <Typography variant="h5" sx={{ mt: 4 }}>Last 5 Transactions</Typography>
        <Paper sx={{ width: '100%', overflow: 'hidden', mt: 2 }}>
          <Table aria-label="recent transactions">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Amount (ETH)</TableCell>
                <TableCell>USD Equivalent</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Vendor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lastFiveTransactions.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>{transaction.date}</TableCell>
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
};

export default ManageCard;
