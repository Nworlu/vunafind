import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
function ProtectedRoute({children}) {
    const authCtx = useContext(AuthContext)

    if(!authCtx.token){
        return <Navigate to={'/login'} />
    }


    return children;
}

export default ProtectedRoute;
