import Navbar from './components/navBar/Navbar'
import Footer from './components/Footer/Footer'

import About from './components/index/About-us/About'
import Subscribe from './components/index/subscribe/subscribe'
import Mobile from './components/index/mobile/mobile'
import HeroSection from './components/index/hero/HeroSection'
import Service from './components/index/service/Service'
import './App.css'


function App() {
  return (
    <div className="app-container">
      <Navbar />
      <HeroSection/>
      <Mobile />
      <Service />
      <About />
      <Subscribe />
      <Footer/>
    </div>
  )
}

export default App;
