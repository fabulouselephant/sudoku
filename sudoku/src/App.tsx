import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Board } from '@/components/Board/Board'
import { useState } from 'react'
import { Header } from './components/Header/Header'
import { ResetPassword } from "./pages/ResetPassword/ResetPassword"


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem("token")
  )

  return (
    <BrowserRouter basename="/sudoku">
      <Routes>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element= {
          <div className="h-screen flex flex-col">
            <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
            <div className="h-screen flex items-center justify-center">
              <Board />
            </div>
        </div>
        }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
