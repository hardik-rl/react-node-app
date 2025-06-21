import { Box, Typography } from '@mui/material'
import { useAuth } from '../../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <Box sx={{ paddingY: 10 }}>
      <Typography variant="h3" fontWeight={600}>Welcome <br /> {user.email}</Typography>
    </Box>
  )
}

export default Home