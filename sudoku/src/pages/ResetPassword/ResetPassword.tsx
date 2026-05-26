import { useSearchParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { auth } from "@/lib/api"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const ResetPassword = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const token = searchParams.get("token")

    const [password, setPassword] = useState("")
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    if (!token) { 
        return (
          <div className="h-screen flex items-center justify-center">
            <p className="text-red-500">Invalid reset link.</p>                                                                                                                                                         
          </div>                                                                                                                                                                                                        
        )                                                                                                                                                                                                               
    }  

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault() 
        if (!token) return

        const result = await auth.resetPassword(token, password)

        if(result.message){
            setSuccess(true)
        } else {setError(result.error ?? "Something went wrong")}

    }
    

    return (
        <div className="h-screen flex items-center justify-center">
            <Card className="w-80 p-4">
                <CardHeader><h1 className="text-2xl font-bold text-center">Reset Password</h1></CardHeader>
                <CardContent>
                    {success ? (
                        <p className="text-center text-green-600">
                            Password updated! You can now{" "}
                            <span className="underline cursor-pointer" onClick={() => navigate('/')}>log in</span>.
                        </p>
                    ) : (
                        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                            <input
                                className="border rounded px-3 py-2 text-sm"
                                placeholder='new password'
                                type="password"
                                value={password}
                                required
                                onChange={(e)=> setPassword(e.target.value)}
                            />
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <Button className="bg-green-800/80 text-white hover:bg-green-800/80" type="submit">Set new password</Button>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}