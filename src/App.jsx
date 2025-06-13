import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Shared/navBar/Navbar'
import Footer from './components/Shared/Footer/Footer'
import Services from './components/Services/Services'
import ServiceDetails from './components/Services/services/ServiceDetails';
import WorkersByCategory from './components/Services/smallservices/WorkersByCategory';
import WorkerItemDetails from './components/Services/smallservices/WorkerItemDetails';
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
import Shop from './components/shop/Shop';
import ProjectDetails from './components/Services/projects/ProjectDetails';
import ContactUs from './components/ContactUs/ContactUs';
import Cart from './components/shop/Cart';
import Booking from './Booking/Bookservice';
import Payment from './components/shop/Payment';
import BookingCheckout from './Booking/BookingCheckout';
import Review from './components/shop/Review';


function Layout() {
  const location = useLocation();
  const hideNavAndFooter = location.pathname === '/login' || location.pathname === '/forgetpass' || location.pathname === "/RegisterationPage" || location.pathname === '/newpass';
  const hideFooter = location.pathname === '/User' || location.pathname.startsWith('/service-details/') ||
    location.pathname.startsWith('/workers-by-category/') || location.pathname.startsWith('/worker-item-details/') ||
    location.pathname.startsWith('/project-item-details/') || location.pathname.startsWith('/contact-us') ||
    location.pathname.startsWith('/Booking') || location.pathname.startsWith('/Cart') || location.pathname.startsWith('/Payment') ||  location.pathname.startsWith('/Review');

  return (
    <div className="app-container">
      {!hideNavAndFooter && <Navbar />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/RegisterationPage" element={<RegisterationPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/service-details/:serviceId" element={<ServiceDetails />} />
          <Route path="/project-item-details/:projectId" element={<ProjectDetails />} />
          <Route path="/workers-by-category/:category" element={<WorkersByCategory />} />
          <Route path="/worker-item-details/:workerId" element={<WorkerItemDetails />} />
          <Route path="/forgetpass" element={<ForgetPass />} />
          <Route path="/newpass" element={<NewPass />} />
          <Route path="/User" element={<User />} />
          <Route path="/Shop" element={<Shop />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path='/Booking/:type/:id' element={<Booking />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/booking-checkout/:type/:id" element={<BookingCheckout />} />
          <Route path="/Review" element={<Review />} />
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
