import { Board } from '@/components/Board/Board'
import { useState } from 'react'
import { Header } from './components/Header/Header';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem("token")
  )

  return (
    <div className="h-screen flex flex-col">
      <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
      <div className="h-screen flex items-center justify-center">
        <Board />
      </div>
    </div>
  )
}

export default App
