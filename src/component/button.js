import {Stack,Box,Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function AuthButtons() {
  const navigate=useNavigate();
  const handleSignIn=()=>{
    navigate('/signin');
  };
  const handleSignUp=()=>{
    navigate('/signup');
  };
  return (
    <Box
    sx={{
      height: '100vh',
      backgroundImage: 'url("/assets/bg.jpg")', // Your image in public folder
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Stack spacing={2} direction="row">
      <Button variant="contained" onClick={handleSignIn}>Sign In</Button>
      <Button variant="contained" onClick={handleSignUp}>Sign Up</Button>
    </Stack>
    </Box>
  );
}