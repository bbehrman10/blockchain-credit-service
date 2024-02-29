import { Container, Typography, Button, Box } from '@mui/material';
import DashboardLayout from '@/components/DashboardLayout';
import { useRouter } from 'next/router';
import axios from 'axios';
const userId = 1;

const Approval = () => {
  const router = useRouter();

  async function handleReturnToDashboard () {
    //call the create new card route
        try {
            const response = await axios.post('http://localhost:3001/api/users/new-card', { userID: userId });
            console.log(response);
        } catch (error) {
            console.error('Error creating card', error);
        }
    router.push('/dashboard');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <DashboardLayout>
        <Typography variant="h4" gutterBottom>
          Congratulations! You've been approved.
        </Typography>
        <Box mt={2}>
          <Button onClick={handleReturnToDashboard} variant="contained" color="primary">
            Return to Dashboard
          </Button>
        </Box>
      </DashboardLayout>
    </Container>
  );
};

export default Approval;
