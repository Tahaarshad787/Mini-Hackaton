import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../redux/authSlice';
import { doc, getDoc } from 'firebase/firestore';
import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormLabel, TextField, Typography, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { GoogleIcon, FacebookIcon } from '../Component/CustomIcons';
import backgroundPic from '../assets/Images/Login pic.jpg'; 


const Card = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '90%',
  maxWidth: '400px',
  padding: theme.spacing(3),
  gap: theme.spacing(2),
  borderRadius: '20px',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(12px)',
  boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    gap: theme.spacing(1.5),
  },
}));

const SignInContainer = styled(Box)({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px',
 backgroundImage: `url(${backgroundPic})`,
backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const StyledTextField = styled(TextField)({
  marginBottom: '12px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
  },
});

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateInputs = () => {
    let tempErrors = {};
    if (!email.match(/\S+@\S+\.\S+/)) tempErrors.email = 'Invalid email';
    if (password.length < 6) tempErrors.password = 'At least 6 characters';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateInputs()) return;
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
  
      let userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      let userData = userDoc.exists() ? userDoc.data() : null;
  
      if (!userData) {
        userDoc = await getDoc(doc(db, "admins", userCredential.user.uid));
        userData = userDoc.exists() ? userDoc.data() : null;
      }
  
      if (!userData) {
        throw new Error("User not found in database.");
      }
  
      localStorage.setItem("uid", userCredential.user.uid);
      localStorage.setItem("userData", JSON.stringify(userData));
  
      dispatch(setUser({ uid: userCredential.user.uid, email, ...userData }));
  
      toast.success('🎉 Great to see you again! You’re now logged in.', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
  
      navigate('/dashboard');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    }
  };
  

  return (
    <SignInContainer>
      <Card>
        <Typography variant="h5" gutterBottom>Sign In</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <FormControl fullWidth>
            <FormLabel>Email</FormLabel>
            <StyledTextField value={email} onChange={(e) => setEmail(e.target.value)} error={!!errors.email} helperText={errors.email} />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel>Password</FormLabel>
            <StyledTextField type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={!!errors.password} helperText={errors.password} />
          </FormControl>
          <FormControlLabel control={<Checkbox />} label="Remember me" />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>Sign In</Button>
        </Box>
        <Divider sx={{ my: 2 }}>or</Divider>
        <Button fullWidth variant="outlined" startIcon={<GoogleIcon />} sx={{ mb: 1 }}>Sign in with Google</Button>
        <Button fullWidth variant="outlined" startIcon={<FacebookIcon />} sx={{ mb: 1 }}>Sign in with Facebook</Button>
        <Typography variant="body2">Don't have an account? <Link component="button" onClick={() => navigate('/signup')}>Sign Up</Link></Typography>
      </Card>
    </SignInContainer>
  );
}

