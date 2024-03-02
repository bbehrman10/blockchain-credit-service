import { useRouter } from 'next/router';
import DashboardLayout from '../../components/DashboardLayout';
import { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, TextField, Card, CardHeader, CardContent, Button, Modal, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, Box } from '@mui/material';
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

  useEffect(() => {
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
        <Typography variant="h6">
          Credit Limit: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(card.CreditLimit)}
        </Typography>
        <Typography variant="h6">
          Current Balance: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(card.CurrentBalance)}
        </Typography>
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
        <Card sx={{ mt: 2 }}>
          <CardHeader title="Recent Transactions" />
          <CardContent>
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Card Used</TableCell>
                  <TableCell>Amount (ETH)</TableCell>
                  <TableCell>USD Equivalent</TableCell>
                  <TableCell>Vendor</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Blockchain Transaction Link</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cardTxData.map((transaction, index) => (
                  <TableRow key={transaction.ActivityID}>
                    <TableCell>{Date(transaction.createdAt)}</TableCell>
                    <TableCell>{transaction.card.Label}</TableCell>
                    <TableCell>{transaction.Amount} ETH</TableCell>
                    <TableCell>${transaction.USDEquivalent}</TableCell>
                    <TableCell>{transaction.vendorClient.vendor.Name}</TableCell>
                    <TableCell>{transaction.Type}</TableCell>
                    <TableCell>{transaction.Status}</TableCell>
                    <TableCell>
                      {transaction.BlockchainTransactionID ? (
                        <a href={`https://base-sepolia.blockscout.com/tx/${transaction.BlockchainTransactionID}`} target="_blank" rel="noopener noreferrer">
                          Go to Blockscout
                        </a>
                      ) : (
                        'Waiting for TxID'
                      )}
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Container>
    </DashboardLayout>
  );
};

export default ManageCard;
