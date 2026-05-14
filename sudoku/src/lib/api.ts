
const BASE_URL = import.meta.env.VITE_API_BASE_URL                                                                                                                                                                  
                                                                                                                                                                                                                      
  const getToken = () => localStorage.getItem('token')                                                                                                                                                                
                                                                                                                                                                                                                      
  export const api = {
    post: (path: string, body: unknown) =>
      fetch(`${BASE_URL}${path}`, {                                                                                                                                                                                   
        method: 'POST',
        headers: {                                                                                                                                                                                                    
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,                                                                                                                                                                      
        },
        body: JSON.stringify(body),                                                                                                                                                                                   
      }).then((res) => res.json()),
                                                                                                                                                                                                                      
    get: (path: string) =>
      fetch(`${BASE_URL}${path}`, {                                                                                                                                                                                   
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }).then((res) => res.json()),
  }                                                                                                                                                                                                                   
  
  export const auth = {                                                                                                                                                                                               
    signup: (name: string, email: string, password: string) =>
      fetch(`${BASE_URL}/api/signup`, {
        method: 'POST',                                                                                                                                                                                               
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),                                                                                                                                                              
      }).then((res) => res.json()),                                                                                                                                                                                   
  
    login: (email: string, password: string) =>                                                                                                                                                                       
      fetch(`${BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },                                                                                                                                                              
        body: JSON.stringify({ email, password }),
      }).then((res) => res.json()),                                                                                                                                                                                   
  }             