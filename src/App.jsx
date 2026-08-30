import Header from './components/Header'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

const App = () => (
  <div
    id='top'
    className='min-h-screen flex flex-col bg-bg text-fg font-sans antialiased'
  >
    <Header />

    <main className='shell flex-1'>
      <About />
      <Projects />
      <Skills />
      <Contact />
    </main>

    <Footer />
    <ScrollToTop />
  </div>
)

export default App
