import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Shared/navBar/Navbar'
import Footer from './components/Shared/Footer/Footer'
import About from './components/index/values/values'
import Subscribe from './components/index/subscribe/subscribe'
import Service from './components/index/service/Service'
import Services from './components/Services/Services'
import CombinedSection from './components/index/CombinedSection'
import './App.css'
import ScrollToTop from './components/Shared/ScrollToTop'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <Navbar />
        <main className="main-content pt-[50px]">
          <Routes>
            <Route path="/" element={
              <>
                <CombinedSection />
                <Service />
                <About />
                <Subscribe />
              </>
            } />
            <Route path="/services" element={<Services />} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  )
}

export default App;
