import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {useState} from 'react'
import { auth } from "@/lib/api"

export type Props = {
    isOpen: boolean,
    onClose: () => void,
}

export const ForgotPasswordDialog = ({ isOpen, onClose }: Props) => {
    const [email, setEmail] = useState<string>('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const result = await auth.requestPasswordReset(email)
        if(result.message) {
            onClose()
        } else {return null}
    }

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
            <Card className="w-80 mx-auto my-20 p-4">
                <CardHeader>We will send you an email</CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <input 
                            className="border rounded px-3 py-2 text-sm"
                            placeholder="Email"                                                                                                                                                                                  
                            type="email"
                            value={email}
                            required={true}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button type="submit" className="bg-green-800/80 text-white hover:bg-green-800/80">Require new password</Button>
                    </form>
                </CardContent>
            </Card>
        </DialogContent>
      </Dialog>
    )
  }