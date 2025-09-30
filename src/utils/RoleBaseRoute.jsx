import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

const RoleBaseRoute = ({children , requiredRoles}) => {
    const {user, loading} =useAuth();

    if(loading) return <div>Loading ....</div>

    if(!requiredRoles.includes(user.role)) {
        <Navigate to="/unauthorized" />
    }
    return user ? children : <Navigate to="/login" /> 
  
}

export default RoleBaseRoute
