import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
function ProtectedRoute({children}) {
    const authCtx = useContext(AuthContext)

    if(!authCtx.userToken && !authCtx.userInfo.role === 'Admin') {
        return <Navigate to={'/'} />
    }


    return children;
}

export default ProtectedRoute;
