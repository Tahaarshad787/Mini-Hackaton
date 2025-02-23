import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { setUser } from '../redux/authSlice';
import { toast } from 'react-toastify';
import { Box, Button, FormControl, FormLabel, TextField, Typography, Select, MenuItem, Link, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { GoogleIcon, FacebookIcon } from '../Component/CustomIcons';
import backgroundImage from '../assets/Images/signup pic.png'; 

// Styled components with improved responsiveness
const Card = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '90%', // Makes it adapt to smaller screens
  maxWidth: '400px', // Reduced from 450px for better scaling
  padding: theme.spacing(3),
  gap: theme.spacing(2),
  borderRadius: '20px',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(12px)',
  boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2), // Less padding on small screens
    gap: theme.spacing(1.5),
  },
}));

const SignUpContainer = styled(Box)({
  height: '120vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px', // Prevents overflow on small screens
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const StyledTextField = styled(TextField)({
  marginBottom: '12px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
  },
});

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateInputs = () => {
    let tempErrors = {};
    if (!email.match(/\S+@\S+\.\S+/)) tempErrors.email = 'Invalid email';
    if (password.length < 6) tempErrors.password = 'At least 6 characters';
    if (name.trim() === '') tempErrors.name = 'Name is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateInputs()) return;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userRef = doc(db, role === 'admin' ? 'admins' : 'users', userCredential.user.uid);
      await setDoc(userRef, { name, email, role });
      dispatch(setUser({ uid: userCredential.user.uid, name, email, role }));
      toast.success('Account created successfully! Let’s get started.', {
        position: "top-center",
        autoClose: 1800,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <SignUpContainer>
      <Card>
        <Typography variant="h5" gutterBottom>Sign Up</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <FormControl fullWidth>
            <FormLabel>Full Name</FormLabel>
            <StyledTextField value={name} onChange={(e) => setName(e.target.value)} error={!!errors.name} helperText={errors.name} />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel>Email</FormLabel>
            <StyledTextField value={email} onChange={(e) => setEmail(e.target.value)} error={!!errors.email} helperText={errors.email} />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel>Password</FormLabel>
            <StyledTextField type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={!!errors.password} helperText={errors.password} />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel>Role</FormLabel>
            <Select value={role} onChange={(e) => setRole(e.target.value)}>
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Administrator</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>Sign Up</Button>
        </Box>
        <Divider sx={{ my: 2 }}>or</Divider>
        <Button fullWidth variant="outlined" startIcon={<GoogleIcon />} sx={{
          mb: 1, borderRadius: '10px', fontWeight: 'bold',
          backgroundColor: '#fff', '&:hover': { backgroundColor: '#f0f0f0' }
        }}>
          Sign up with Google
        </Button>
        <Button fullWidth variant="outlined" startIcon={<FacebookIcon />} sx={{
          mb: 1, borderRadius: '10px', fontWeight: 'bold',
          color: '#1877f2', borderColor: '#1877f2',
          '&:hover': { backgroundColor: '#e8f4ff' }
        }}>
          Sign up with Facebook
        </Button>
        <Typography variant="body2">
          Already have an account? <Link component="button" onClick={() => navigate('/login')}>Sign in</Link>
        </Typography>
      </Card>
    </SignUpContainer>
  );
}
