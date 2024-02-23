import React, { useState } from 'react';
import { Modal, Box, Button, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Divider, List, ListItem, ListItemText } from '@mui/material';

interface Wallet {
  id: string;
  address: string;
  label: string;
}

interface PaymentPopupProps {
  open: boolean;
  onClose: () => void;
  predefinedWallets: Wallet[];
  transactionCost: number; // Cost of the NFT or service being purchased
  transactionFees: number; // Additional fees, if any
}

const PaymentPopup: React.FC<PaymentPopupProps> = ({ open, onClose, predefinedWallets, transactionCost, transactionFees }) => {
  const [step, setStep] = useState(1); // 1: Login, 2: Select Wallet, 3: Confirm Payment
  const [selectedWallet, setSelectedWallet] = useState('');

  const totalCost = transactionCost + transactionFees;

  const handleLogin = () => {
    setStep(2); // Proceed to wallet selection after "login"
  };

  const handleSelectWallet = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedWallet(event.target.value as string);
  };

  const handleConfirmPayment = () => {
    console.log(`Payment confirmed to wallet: ${selectedWallet} with total cost: ${totalCost}`);
    onClose(); // Close the popup after confirming payment
  };

  // Function to navigate to the previous step
  const handleBack = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2 }}>
        {step === 1 && (
          <>
            <Typography variant="h6" sx={{ mb: 2 }}>Login</Typography>
            <Button variant="contained" onClick={handleLogin} fullWidth>Login with Auth0</Button>
          </>
        )}

        {step === 2 && (
          <>
            <Typography variant="h6" sx={{ mb: 2 }}>Select Wallet</Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="select-wallet-label">Wallet Address</InputLabel>
              <Select labelId="select-wallet-label" id="select-wallet" value={selectedWallet} label="Wallet Address" onChange={handleSelectWallet}>
                {predefinedWallets.map(wallet => (
                  <MenuItem key={wallet.id} value={wallet.address}>{`${wallet.label} (${wallet.address})`}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" onClick={() => setStep(3)} fullWidth>Continue to Payment</Button>
            <Button variant="text" onClick={handleBack} sx={{ mt: 2 }}>Back</Button>
          </>
        )}

        {step === 3 && (
          <>
            <Typography variant="h6" sx={{ mb: 2 }}>Confirm Payment</Typography>
            <List>
              <ListItem>
                <ListItemText primary="Recipient Wallet" secondary={selectedWallet} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Transaction Cost" secondary={`${transactionCost} ETH`} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Transaction Fees" secondary={`${transactionFees} ETH`} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Total Cost" secondary={`${totalCost} ETH`} />
              </ListItem>
            </List>
            <Button variant="contained" onClick={handleConfirmPayment} fullWidth>Confirm Payment</Button>
            <Button variant="text" onClick={handleBack} sx={{
                mt: 2, 
                color: 'secondary.main', // Use the theme's secondary color for the text
                borderColor: 'secondary.main', // Use the theme's secondary color for the border
                '&:hover': {
                  backgroundColor: 'rgba(3, 218, 198, 0.1)', // Lighten the hover background for visibility
                  borderColor: 'secondary.main', // Ensure the border color remains visible on hover
                }
            }}>Back</Button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default PaymentPopup;
