import { useState } from "react";                                                                                                                                                                                   
import { auth } from "@/lib/api";                                                                                                                                                                                   
import { Card, CardContent, CardHeader } from "@/components/ui/card";                                                                                                                                               
import { Button } from "@/components/ui/button";                                                                                                                                                                    
 
type Props = {                                                                                                                                                                                                      
  onLogin: () => void;
};                                                                                                                                                                                                                  
                
export const AuthForm = ({ onLogin }: Props) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");                                                                                                                                                                             
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");                                                                                                                                                                     
  const [error, setError] = useState<string | null>(null);
                                                                                                                                                                                                                    
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();                                                                                                                                                                                             
    setError(null);

    const result = isLogin                                                                                                                                                                                          
      ? await auth.login(email, password)
      : await auth.signup(name, email, password);                                                                                                                                                                   
                
    if (result.token) {
      localStorage.setItem("token", result.token);
      onLogin();                                                                                                                                                                                                    
    } else {
      setError(result.error ?? result.errors?.join(", ") ?? "Something went wrong");                                                                                                                                
    }                                                                                                                                                                                                               
  };
                                                                                                                                                                                                                    
  return (      
    <Card className="w-80 mx-auto mt-20 p-4">
      <CardHeader>                                                                                                                                                                                                  
        <h1 className="text-2xl font-bold text-center">
          {isLogin ? "Login" : "Sign Up"}                                                                                                                                                                           
        </h1>   
      </CardHeader>                                                                                                                                                                                                 
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {!isLogin && (                                                                                                                                                                                            
            <input
              className="border rounded px-3 py-2 text-sm"                                                                                                                                                          
              placeholder="Name"                                                                                                                                                                                    
              value={name}
              onChange={(e) => setName(e.target.value)}                                                                                                                                                             
            />  
          )}
          <input
            className="border rounded px-3 py-2 text-sm"                                                                                                                                                            
            placeholder="Email"
            type="email"                                                                                                                                                                                            
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input                                                                                                                                                                                                    
            className="border rounded px-3 py-2 text-sm"
            placeholder="Password"                                                                                                                                                                                  
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />                                                                                                                                                                                                        
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit">{isLogin ? "Login" : "Sign Up"}</Button>                                                                                                                                            
          <p                                                                                                                                                                                                        
            className="text-sm text-center cursor-pointer underline"
            onClick={() => setIsLogin(!isLogin)}                                                                                                                                                                    
          >     
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
          </p>
        </form>
      </CardContent>
    </Card>                                                                                                                                                                                                         
  );
};                                          