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
          <div className="flex flex-row gap-3 items-center">
            <div className="rounded-2xl bg-sky-300 w-8 h-8 text-center leading-loose">{isAuthenticated ? currentUser?.name.toUpperCase().charAt(0) : 'P'}</div>
            <div>{isAuthenticated ? currentUser?.name : 'Player'}</div>
          </div>
        <div className="flex items-center gap-2">
          {!isAuthenticated ? (
          <Button onClick={() => setIsSigninDialogOpen(true)} variant="ghost">
              Login
          </Button>
          ) : (
            <div className="flex flex-column gap-1">  
              <div className="border-r px-4">{stats?.total_games} played</div>
              <div className="border-r px-4">{stats?.wins} won</div>
              <div className="px-4">{stats?.losses} lost</div>
            </div>
          )}
        </div>
      </div>
    </header>
    <SigninDialog isOpen={isSigninDialogOpen} onClose={() => setIsSigninDialogOpen(false)} onLogin={() => setIsAuthenticated(true)}/>
    </>
  )
}