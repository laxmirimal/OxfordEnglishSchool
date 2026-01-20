import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Loader from './components/Loader'
import Home from './pages/Home'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Events from './pages/Events'
import Fees from './pages/Fees'
import Admission from './pages/Admission'
import Buses from './pages/Buses'
import Teachers from './pages/Teachers'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/events" element={<Events />} />
          <Route path="/fees" element={<Fees />} />
          <Route path="/admission" element={<Admission />} />
          <Route path="/buses" element={<Buses />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}

export default App
