import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Portfolio from './pages/Portfolio'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import Experience from './pages/Experience'
import Creations from './pages/Creations'
import Education from './pages/Education'
import Hobbies from './pages/Hobbies'
import Contact from './pages/Contact'
import About from './pages/About'
import NotFound from './pages/NotFound'


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/creations" element={<Creations />} />
        <Route path="/education" element={<Education />} />
        <Route path="/hobbies" element={<Hobbies />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        {/* Route par défaut qui redirige vers la page 404 */}
        <Route path="*" element={<NotFound />} />
        {/* <Route path="*" element={<Portfolio />} /> */}
      </Routes>
    </Router>
  )
}
