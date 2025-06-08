import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Shared/navBar/Navbar'
import Footer from './components/Shared/Footer/Footer'
import Services from './components/Services/Services'
import Login from './components/regestration/login/loginPage'
import './App.css'
import ScrollToTop from './components/Shared/ScrollToTop'
import IndexPage from './components/index/index'
import ForgetPass from './components/regestration/forgotPassword/ForgetPass'
import NewPass from './components/regestration/forgotPassword/NewPass'
import RegisterationPage from './components/regestration/register/RegisterationPage';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import User from './components/icons/User';

function Layout() {
  const location = useLocation();
  const hideNavAndFooter = location.pathname === '/login' || location.pathname === '/forgetpass'|| location.pathname === "/RegisterationPage" || location.pathname === '/newpass';
  const hideFooter = location.pathname === '/User';
  return (
    <div className="app-container">
      {!hideNavAndFooter && <Navbar />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/RegisterationPage" element={<RegisterationPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/forgetpass" element={<ForgetPass />} />
          <Route path="/newpass" element={<NewPass />} />
          <Route path="/User" element={<User />} />
        </Routes>
      </main>
      {!hideNavAndFooter && !hideFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Layout />
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </AuthProvider>
  );
}

export default App;
