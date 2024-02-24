import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

interface Wallet {
  id: string;
  address: string;
  label: string;
}

interface PaymentPopupProps {
  open: boolean;
  onClose: () => void;
  predefinedWallets: Wallet[];
  transactionCost: number;
  transactionFees: number;
}

const PaymentPopup: React.FC<PaymentPopupProps> = ({
  open,
  onClose,
  predefinedWallets,
  transactionCost,
  transactionFees,
}) => {
  const [step, setStep] = useState<number>(0); // Start from the initial loading step
  const [selectedWallet, setSelectedWallet] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);

  // Handle selection of wallet from dropdown
  const handleSelectWallet = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedWallet(event.target.value as string);
  };

  // Handle confirmation of payment, simulate payment processing
  const handleConfirmPayment = () => {
    setStep(5); // Move to processing payment step
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => setStep(6), 2000); // Move to confirmed step after progress reaches 100%
        }
        return Math.min(newProgress, 100);
      });
    }, 200);
  };

  // Function to navigate back to the previous step
  const handleBack = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  // Calculate the total cost including transaction fees
  const totalCost: number = transactionCost + transactionFees;
  useEffect(() => {
    // Only run this effect if the modal is open and we're on the initial step
    if (open && step === 0) {
      const timer = setTimeout(() => {
        setStep(1); // Move to the login step after a delay
      }, 2000); // 2 seconds delay for the initial loading

      return () => clearTimeout(timer); // Cleanup the timer if the component unmounts or if the dependencies change
    }
  }, [open, step]);
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2 }}>
        {step === 0 && (
          <>
            <Typography variant="h6" sx={{ mb: 2 }}>Preparing...</Typography>
            <CircularProgress />
          </>
        )}

        {step === 1 && (
          <>
            <Typography variant="h6" sx={{ mb: 2 }}>Login</Typography>
            <Button variant="contained" onClick={() => setStep(2)} fullWidth>Login with Auth0</Button>
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
                <ListItemText primary="Fees Added" secondary={`${transactionFees} ETH`} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Total Cost" secondary={`${totalCost} ETH`} />
              </ListItem>
            </List>
            <Button variant="contained" onClick={handleConfirmPayment} fullWidth>Confirm Payment</Button>
            <Button variant="text" onClick={handleBack} sx={{ mt: 2 }}>Back</Button>
          </>
        )}

        {step === 5 && (
          <>
            <Typography variant="h6" sx={{ mb: 2 }}>Processing Payment...</Typography>
            <LinearProgress variant="determinate" value={progress} />
          </>
        )}

        {step === 6 && (
          <>
            <Typography variant="h6" sx={{ mb: 2 }}>Payment Confirmed!</Typography>
            <List>
              <ListItem>
                <ListItemText primary="Your account will be updated shortly" secondary="login to view" />
              </ListItem>
              <ListItem>
                <ListItemText primary="On-Chain Transaction Details" secondary="transaction link" />
              </ListItem>
            </List>
            <Button variant="contained" onClick={onClose}>Close</Button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default PaymentPopup;
