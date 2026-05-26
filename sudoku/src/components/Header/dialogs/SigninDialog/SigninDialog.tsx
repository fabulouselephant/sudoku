import { Dialog, DialogContent } from "@/components/ui/dialog"
import { AuthForm } from "@/components/Login/Login"
import {useState} from 'react'
import { ForgotPasswordDialog } from "@/components/Login/dialogs/ForgotPasswordDialog/ForgotPasswordDialog"

type Props = {
  isOpen: boolean
  onClose: () => void
  onLogin: () => void
}

export const SigninDialog = ({ isOpen, onClose, onLogin }: Props) => {
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false)

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <AuthForm onLogin={onLogin} onClose={onClose} onForgotPassword={() => {
                  onClose()              
                  setIsForgotPasswordOpen(true)
                }} />
        </DialogContent>
      </Dialog>
      <ForgotPasswordDialog
      isOpen={isForgotPasswordOpen}
      onClose={() => setIsForgotPasswordOpen(false)}
      />
    </>
  )
}