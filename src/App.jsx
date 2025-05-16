
import Navbar from './components/navBar/Navbar'
import Footer from './components/Footer/Footer'

import About from './components/index/About-us/About'
import Subscribe from './components/index/subscribe/subscribe'
import Mobile from './components/index/mobile/mobile'
import HeroSection from './components/hero/HeroSection';
import './App.css'


function App() {
  return (
    <>

    <Navbar />
    <HeroSection/>
    <Mobile />
    <About />
    <Subscribe />
      <Footer/>
    </>
  )
}

export default App;
