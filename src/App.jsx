import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUp from './SignLogin/Signup';
import Login from './SignLogin/Login';
import LandingPage from './Component/LandingPage/Landingpage';
import  Dashboard from './Component/Dashboard';
import AuthRoute from '../src/Component/AuthRoute'
import ProtectedRoute from '../src/Component/ProtectedRoute'

function App() {
  return (
    <>
       <Routes>


<Route element={<AuthRoute/>}>
<Route path="/" element={<LandingPage/>}/>
<Route path="/login" element={<Login />} />
<Route path="/signup" element={<SignUp />} />
</Route>

<Route element={<ProtectedRoute/>}>
<Route path="/dashboard/*" element={<Dashboard />} />
</Route>

</Routes>
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
          />
          </>
  );
}

export default App;
