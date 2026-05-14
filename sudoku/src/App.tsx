import { Board } from '@/components/Board/Board'
import { useState } from 'react'
import { Header } from './components/Header/Header';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem("token")
  )

  return (
    <>
      <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
      <div className="min-h-screen flex items-center justify-center">
        <Board />
      </div>
    </>
  )
}

export default App
