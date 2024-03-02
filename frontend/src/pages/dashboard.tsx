import DashboardLayout from '../components/DashboardLayout';
import { Box, Card, CardHeader, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Button, Container, Typography, Grid, CardMedia } from '@mui/material';
import Link from 'next/link';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // For the "+" icon
import { useEffect, useState } from 'react';
import axios from 'axios';
const userID = 1;


export default function Dashboard() {

    const [cards, setCards] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const getUserCards = async () => {
        const response = await axios.get(`http://localhost:3001/api/users/${userID}/cards`);
        await setCards(response.data);
    };

    const getCardTransactions = async () => {
        try {
            const allTransactions = [];
            for (const c of cards) {
                const response = await axios.get(`http://localhost:3001/api/users/card-activity/${c.CardID}`);
                allTransactions.push(...response.data);
                console.log('allTransactions', allTransactions);
            }
            setTransactions(allTransactions);
        } catch (error) {
            console.error('Error fetching card transactions', error);
        }
    };

    useEffect(() => {
        getUserCards();
    }, []);

    useEffect(() => {
        getCardTransactions();
    }, [cards]);

    return (
        <DashboardLayout>
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {/* Overview Card */}
                    <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
                        Cards Overview
                    </Typography>
                    <Grid container spacing={2}>
                        {cards.map((card) => (
                            <Grid item xs={12} md={6} lg={4} key={card.CardID}>
                                <Link href={`/manage-card/${card.CardID}`} passHref style={{ textDecoration: 'none' }}>
                                    <Card>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image="/card.png"
                                            alt="Credit Card Image"
                                        />
                                        <CardContent>
                                            <Typography variant="h6">{card.Label}</Typography>
                                            <Typography variant="body1">Credit Limit {card.CreditLimit} </Typography>
                                            <Typography variant="body1">Current Balance: {card.CurrentBalance} </Typography>
                                            <Typography variant="body1">Next Statement Date: April 18th </Typography>
                                            {/* Additional card details can be added here */}
                                        </CardContent>
                                    </Card>
                                </Link>
                            </Grid>
                        ))}
                        <Grid item xs={12} sm={6} md={4}>
                            <Link href="/apply" passHref>
                                <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', cursor: 'pointer', textDecoration: 'none' }}>
                                    <CardContent sx={{ textAlign: 'center' }}>
                                        <Button variant="contained" startIcon={<AddCircleOutlineIcon />} sx={{ backgroundColor: 'primary.main', '&:hover': { backgroundColor: 'primary.dark' } }}>
                                            Apply for New Card
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    </Grid>

                    {/* Transaction History Card */}
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
                                    {transactions.map((transaction, index) => (
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
                </Box>
            </Container>
        </DashboardLayout>
    );
}
