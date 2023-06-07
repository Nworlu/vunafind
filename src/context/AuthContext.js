import { createContext, useState } from "react";


export const AuthContext = createContext(null)


function AuthProvider({children}){
    const [userInfo,setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')))
    const [userToken,setUserToken] = useState(localStorage.getItem('userToken') || '')

    function setUserData(user){
        setUserInfo(user)
        localStorage.setItem('userInfo',JSON.stringify(user))
    }
    function setUserTokenData(token){
        setUserToken(token)
        localStorage.setItem('userToken',token)
    }
    function clearUserData(){
        setUserInfo(null)
        setUserToken(null)
        localStorage.removeItem('userInfo')
        localStorage.removeItem('userToken')
    }

    const value ={
        userInfo,
        userToken,
        setUserData,
        setUserTokenData,
        clearUserData
    }
    return (
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
    )
}

export default AuthProvider
