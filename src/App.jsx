// import { useState, useEffect } from 'react';
import Navbar from './components/Shared/navBar/Navbar'
import Footer from './components/Shared/Footer/Footer'

import About from './components/index/values/values'
import Subscribe from './components/index/subscribe/subscribe'
import Service from './components/index/service/Service'
import './App.css'
import CombinedSection from './components/index/CombinedSection'

function App() {
  // const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  //   document.body.style.overflow = 'hidden'; // Disable scroll during loading
  // }, []);
  
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <CombinedSection />
        <Service />
        <About />
        <Subscribe />
      </main>
      <Footer/>
    </div>
  )
}

export default App;
