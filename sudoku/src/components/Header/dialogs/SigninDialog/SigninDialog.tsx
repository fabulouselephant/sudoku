import { Dialog, DialogContent } from "@/components/ui/dialog"
import { AuthForm } from "@/components/Login/Login"

type Props = {
  isOpen: boolean
  onClose: () => void
  onLogin: () => void
}

export const SigninDialog = ({ isOpen, onClose, onLogin }: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <AuthForm onLogin={onLogin} onClose={onClose}/>
      </DialogContent>
    </Dialog>
  )
}