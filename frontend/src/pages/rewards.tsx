// src/pages/dashboard.tsx or src/app/pages/dashboard.tsx
import DashboardLayout from '../components/DashboardLayout'; // Adjust the import path as needed
import { Box, Card, CardHeader, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Button, TextField, Container, Typography } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard'; // Example for CreditCardIcon
import HistoryIcon from '@mui/icons-material/History'; // Ensure this icon exists or choose a similar one
import SearchIcon from '@mui/icons-material/Search'; // Example for SearchIcon
import Link from 'next/link';

export default function Rewards() {
    return (
        <DashboardLayout>
            Coming To You Soon at a Testnet Near You
        </DashboardLayout>
    )
}