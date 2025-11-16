import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import OtpVerificationPage from "./pages/OtpVerificationPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Home from "./components/Home/home";
import Navbar from "./pages/Navbar";
import MyProfilePage from "./pages/MyProfilePage";
import ProtectedRoute from "./pages/ProtectedRoute";
import InterestAssessment from "./pages/InterestAssessment";


function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        {/* <Route path="/" element={<Home/>} /> */}

         <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
         <Route path="/otp-verification" element={<OtpVerificationPage/>} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage/>} />
        <Route path="/" element={ <ProtectedRoute><Home/></ProtectedRoute> } />
        <Route path="/profile" element={ <ProtectedRoute> <MyProfilePage/> </ProtectedRoute> } />



        <Route path="/interest-assessment" element={ <ProtectedRoute> <InterestAssessment/> </ProtectedRoute> } />

  
        
        <Route path="*" element={<h1>404 Not Found</h1>} />
        
      </Routes>
    </Router>
  )
}

export default App
