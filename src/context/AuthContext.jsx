import axios from "../api/axios";
import { useContext ,createContext, useState, useEffect } from "react"

const userContext =createContext();
const AuthContext = ({children}) => {
    const [user ,setUser] =useState(null);
    const [loading, setLoading] = useState(true);
    const login = (user) =>{
        setUser(user);
    };

    const logout = () =>{
        setUser(null)
        localStorage.removeItem("token");
    }

    useEffect(()=>{
        const verifyUser = async ()=>{
        try {
                const token = localStorage.getItem('token');
                console.log('token',token);
                if(token){
                    const response = await axios.get('/auth/verify',{
                        
                            headers: {
                                "Authorization" : `Bearer ${token}`,
                                
                            }
                        
                    });

                    setUser(response.data.user);
                }else{
                   setUser(null)
                }
               
               
        } catch (error) {
            console.log(error)
           setUser(null)
        }finally{
            setLoading(false)
        }
        }
        verifyUser();
    },[])



  return (
    <userContext.Provider value={{login ,logout ,user , loading}} >
        {children}
    </userContext.Provider >
  )
}
export const useAuth = () =>useContext(userContext);
export default AuthContext
