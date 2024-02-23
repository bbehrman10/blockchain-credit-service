import DashboardLayout from '../components/DashboardLayout';
import { Box, Card, CardHeader, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Button, Container, Typography, Grid, CardMedia } from '@mui/material';
import Link from 'next/link';
import userData from '../data/sampleData.js'; // Import the user data
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // For the "+" icon



export default function Dashboard() {
    // Aggregate transactions from all cards for the user
    const allTransactionsWithCardId = userData.cards.flatMap(card =>
        card.transactions.map(transaction => ({
            ...transaction,
            cardNumber: card.cardNumber, // or cardNumber if you prefer to use that as the identifier
        }))
    );

    // Sort transactions by date in descending order and take the last 5
    const lastFiveTransactions = allTransactionsWithCardId
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);

    // Calculate total balance and rewards (assuming these are now user-level properties)
    const totalBalanceUSD = userData.cards.reduce((acc, card) => acc + card.balance, 0);
    const totalRewards = userData.cards.reduce((acc, card) => acc + card.rewards, 0);

    return (
        <DashboardLayout>
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {/* Simplified for brevity */}

                    {/* Overview Card */}
                    <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
                        Cards Overview
                    </Typography>
                    <Grid container spacing={2}>
                        {userData.cards.map((card) => (
                            <Grid item xs={12} md={6} lg={4} key={card.cardId}>
                                <Link href={`/manage-card/${card.cardId}`} passHref style={{ textDecoration: 'none' }}>
                                    <Card>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image="/card.png" // Placeholder - replace with actual path or URL
                                            alt="Credit Card Image"
                                        />
                                        <CardContent>
                                            <Typography variant="h6">Card Ending in {card.cardNumber.slice(-4)}</Typography>
                                            <Typography variant="body1">Current Balance: ${card.balance.toLocaleString()}</Typography>
                                            <Typography variant="body1">Statement Due Date: {card.dueDate}</Typography>
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
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Card Used</TableCell>
                                        <TableCell>Amount (ETH)</TableCell>
                                        <TableCell>USD Equivalent</TableCell>
                                        <TableCell>Vendor</TableCell>
                                        <TableCell>Type</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {lastFiveTransactions.map((transaction, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{transaction.date}</TableCell>
                                            <TableCell>{transaction.cardNumber.slice(-4)}</TableCell> {/* Displaying last 4 digits */}
                                            <TableCell>{transaction.amount} ETH</TableCell>
                                            <TableCell>${transaction.usdEquivalent}</TableCell>
                                            <TableCell>{transaction.vendor}</TableCell>
                                            <TableCell>{transaction.type}</TableCell>
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
