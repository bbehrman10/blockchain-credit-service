import { useRouter } from 'next/router';
import DashboardLayout from '../../components/DashboardLayout';
import { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, TextField, Paper, Button, Modal, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, Box } from '@mui/material';
import axios from 'axios';
const userID = "1"; // Adjust as needed

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
  const { cardId }: { cardId: string } = router.query as { cardId: string };

  const [card, setCard] = useState(null);
  const [cardTxData, setCardTxData] = useState([]);

  const [open, setOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('ETH');
  const [paymentAmount, setPaymentAmount] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => setPaymentMethod(event.target.value);
  const handlePaymentAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => setPaymentAmount(event.target.value);

  //in case of refresh or direct access to the page we need to fetch the card data
  const getPageData = async (cardid: string) => {
    console.log(userID, cardid);
    const cardData = await axios.get(`http://localhost:3001/api/users/${userID}/cards/${cardid}`);
    const activityData = await axios.get(`http://localhost:3001/api/users/card-activity/${cardid}`);
    setCard(cardData.data);
    setCardTxData(activityData.data);
  }
  // Get the last 5 transactions for this card
  const lastFiveTransactions = async () => {
    return [];
  }

  useEffect(() => {
    // console.log('RUNNING THE USE EFFECT FUNCTION');
    getPageData(cardId);
  }, []);

  if (!card) {
    return <p>Card not found</p>; // Or handle as needed
  }


  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Manage Card - {card.Label}
        </Typography>

        {/* Card Details */}
        <Typography variant="h6">Current Balance: ${card.CurrentBalance}</Typography>
        <Typography variant="h6">Next Statement Date: April 18th: </Typography>

        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleOpen}>
          Pay Off Balance
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
        {/* RecentTransactions */}
        <Typography variant="h5" sx={{ mt: 4 }}>Recent Transactions</Typography>
        <Paper sx={{ width: '100%', overflow: 'hidden', mt: 2 }}>
          <Table aria-label="recent transactions">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Card Used</TableCell>
                <TableCell>Amount (ETH)</TableCell>
                <TableCell>USD Equivalent</TableCell>
                <TableCell>Vendor</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Blockchain Transaction ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cardTxData.map((transaction, index) => (
                <TableRow key={transaction.ActivityID}>
                  <TableCell>{transaction.createdAt}</TableCell>
                  <TableCell>{transaction.CardID}</TableCell> {/* Displaying last 4 digits */}
                  <TableCell>{transaction.Amount} ETH</TableCell>
                  <TableCell>${transaction.USDEquivalent}</TableCell>
                  <TableCell>{transaction.VendorClientID}</TableCell>
                  <TableCell>{transaction.Type}</TableCell>
                  <TableCell>{transaction.Status}</TableCell>
                  <TableCell>{transaction.BlockchainTransactionID}</TableCell>
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
