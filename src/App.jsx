import { ThemeContext, ThemeProvider } from './context/ThemeContext'
import './App.css'
import Header from './components/Header'
import Report from './pages/Report'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DaywiseReport from './pages/DaywiseReport'

const App = () => {

  return (
    <ThemeProvider>
      <BrowserRouter>
          {<Header/>}
        <Routes>
          <Route path="/" element={<Report/>} />
          <Route path="/daywisereport" element={<DaywiseReport/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App