
import Navbar from './components/navBar/Navbar'
import Footer from './components/Footer/Footer'

import About from './components/index/About-us/About'
import Subscribe from './components/index/subscribe/subscribe'
import Service from './components/index/service/Service'
import HeroSection from './components/index/hero/HeroSection';
import './App.css'


function App() {
  return (
    <>

    <Navbar />
    <HeroSection/>
    <Service />
    <About />
    <Subscribe />
    <Footer/>
    </>
  )
}

export default App;
