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

export const Header = ({ isAuthenticated, setIsAuthenticated }: Props) => {

    const [isSigninDialogOpen, setIsSigninDialogOpen] = useState(false)
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    
    useEffect(() => {
      if (isAuthenticated) {                                                                                                                                                                                            
        const userId = getUserIdFromToken()
        if (userId){
          api.get(`/api/users/${userId}`).then((user) => setCurrentUser(user))
        }
      } else {                                                          
        setCurrentUser(null)                                                                                                                                                                                            
      }                     
    }, [isAuthenticated])     

  return (
    <>
    <header className="flex justify-between items-center p-4 shadow-xs">
      <h1 className="text-2xl font-bold">Sudoku</h1>
      <div className="flex items-center gap-2">
        {!isAuthenticated ? (
        <Button onClick={() => setIsSigninDialogOpen(true)} variant="ghost">
            Login
        </Button>
        ) : (
          <div className="flex items-center gap-2">{currentUser?.name}</div>
        )}
      </div>
    </header>
    <SigninDialog isOpen={isSigninDialogOpen} onClose={() => setIsSigninDialogOpen(false)} onLogin={() => setIsAuthenticated(true)}/>
    </>
  )
}