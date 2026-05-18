import { api } from "@/lib/api"
import { Button } from "../ui/button"
import { SigninDialog } from "./dialogs/SigninDialog/SigninDialog"
import { useEffect, useState } from "react"
import { getUserIdFromToken } from "@/helpers/getUserId"

type Props = {
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void
}

type User = {
  id: string
  name: string
  email: string
}

type Stats = {
  total_games: number
  wins: number
  losses: number
}

export const Header = ({ isAuthenticated, setIsAuthenticated }: Props) => {

    const [isSigninDialogOpen, setIsSigninDialogOpen] = useState(false)
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [stats, setStats] = useState<Stats | null>(null)
    
    useEffect(() => {
      if (isAuthenticated) {                                                                                                                                                                                            
        const userId = getUserIdFromToken()
        if (userId){
          api.get(`/api/users/${userId}`).then((user) => setCurrentUser(user))
          api.get(`/api/users/${userId}/stats`).then((data) => setStats(data))
        }
      } else {                                                          
        setCurrentUser(null)                                                                                                                                                                                            
      }                     
    }, [isAuthenticated])     

  return (
    <>
    <header className="sticky top-0 z-10 bg-background justify-between items-center p-4 shadow-xs">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sudoku</h1>
        <div className="flex items-center gap-2">
          {!isAuthenticated ? (
          <Button onClick={() => setIsSigninDialogOpen(true)} variant="ghost">
              Login
          </Button>
          ) : (
            <div className="flex flex-column gap-1">
              <div>{currentUser?.name}</div>
              <div>Total games:{stats?.total_games}</div>
              <div>Wins:{stats?.wins}</div>
              <div>Looses:{stats?.losses}</div>
            </div>
          )}
        </div>
      </div>
    </header>
    <SigninDialog isOpen={isSigninDialogOpen} onClose={() => setIsSigninDialogOpen(false)} onLogin={() => setIsAuthenticated(true)}/>
    </>
  )
}