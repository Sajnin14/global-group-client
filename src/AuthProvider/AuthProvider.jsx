import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
   
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    
    console.log(user);
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    

   
    const authValue = {
        user,
        setUser,
        loading,
        createUser,
        loginUser,
    }

    useEffect(() => {
        const userNow = onAuthStateChanged(auth,( currentUser) => {
            setUser(currentUser);
        //    if(currentUser){
        //     setUser(currentUser);
        //    }
        })

        return (() => {
            return userNow();
        })
    },[])
    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;