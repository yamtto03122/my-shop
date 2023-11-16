import { createContext, useContext, useEffect, useState } from "react";
import { onUserState, login, logOut } from "../api/firebase";

const AuthContext = createContext();

export function AuthContextProvider({children}){
    const[user, setUser] = useState();
    const [unSubScribe, setUnSubScribe] = useState();

    useEffect(()=>{
        const userChange = (newUser) => {
            console.log(newUser);
            setUser(newUser);
        };

        const unSubScribeFunc = onUserState(userChange);
        setUnSubScribe(()=>unSubScribeFunc);

        return () => {
            if(unSubScribeFunc){
                unSubScribeFunc();
            }
        }
    },[])

    return(
        <AuthContext.Provider value={{user, login, logOut, uid:user && user.uid}}>
            {children}
            </AuthContext.Provider>
        )
}

export function useAuthContext(){
    return useContext(AuthContext);
}