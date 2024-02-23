import { useState } from 'react';
import { Container, Typography, Button, Grid, Card, CardMedia, CardContent, TextField, Box } from '@mui/material';
import DashboardLayout from '@/components/DashboardLayout';
import PaymentPopup from '@/components/PaymentPopup'; // Ensure this path is correct
import userData from '../data/sampleData'; // Adjust the import path as needed

const NFTMint = () => {
    const [quantity, setQuantity] = useState(1);
    const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control popup visibility
    const basePrice = 0.05; // Base price for one NFT in ETH
    const [totalPrice, setTotalPrice] = useState(quantity * basePrice);

    const handleQuantityChange = (event) => {
        const newQuantity = Number(event.target.value);
        setQuantity(newQuantity);
        setTotalPrice(newQuantity * basePrice);
    };

    const handleMintNFT = () => {
        alert(`Minting ${quantity} NFT(s) for ${totalPrice} ETH`);
        // Add minting logic here
    };

    // Toggle the payment popup
    const togglePopup = () => setIsPopupOpen(!isPopupOpen);

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="340"
                            image="/path-to-your-nft-image.jpg" // Placeholder image
                            alt="NFT Preview"
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" gutterBottom>
                        Mint Your NFT
                    </Typography>
                    <CardContent>
                        <TextField
                            fullWidth
                            label="Quantity"
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            InputProps={{ inputProps: { min: 1 } }}
                            sx={{ mb: 2 }}
                        />
                        <Typography variant="h6" gutterBottom>
                            Total Price: {totalPrice} ETH
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                            <Button variant="contained" color="primary" onClick={handleMintNFT}>
                                Pay with Crypto
                            </Button>
                            <Button variant="contained" onClick={togglePopup} sx={{ display: 'flex', alignItems: 'center' }}>
                                <img
                                    src="/logo.png" // Path to your BCS logo
                                    alt="BCS"
                                    style={{ width: 24, height: 24, marginRight: 8 }}
                                />
                                Pay with BCS
                            </Button>
                        </Box>
                    </CardContent>
                </Grid>
            </Grid>
            {isPopupOpen && <PaymentPopup open={isPopupOpen} onClose={togglePopup} predefinedWallets={userData.wallets} />}
        </Container>
    );
};

export default NFTMint;
